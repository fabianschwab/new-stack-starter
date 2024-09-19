import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/database';
import { Users } from '$lib/server/schema';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const registerFormSchema = z
	.object({
		username: z.string().min(5).max(25),
		password: z.string().min(10).max(100),
		passwordConfirmation: z.string().min(10).max(100)
	})
	.refine((values) => values.password === values.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation']
	});

export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate(zod(registerFormSchema));

	if (locals.user) {
		redirect(302, '/authentication/signout');
	}

	return { form };
};

export const actions: Actions = {
	signup: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const users = await db.select().from(Users).where(eq(Users.username, form.data.username));

		if (users && users.length != 0) {
			return setError(form, 'username', 'Username already exists.');
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await Bun.password.hash(form.data.password);

		try {
			await db.insert(Users).values({
				id: userId,
				username: form.data.username,
				password_hash: passwordHash.toString()
			});
		} catch (e) {
			console.error('Error Creating User:', e);
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
