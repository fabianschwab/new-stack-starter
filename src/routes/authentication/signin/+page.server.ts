import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/database';
import { Users } from '$lib/server/schema';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const registerFormSchema = z.object({
	username: z.string().min(5).max(25),
	password: z.string().min(10).max(100)
});
export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate(zod(registerFormSchema));

	if (locals.user) {
		redirect(302, '/authentication/signout');
	}

	return { form };
};

export const actions: Actions = {
	signin: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const existingUser = await db
			.select()
			.from(Users)
			.where(eq(Users.username, form.data.username))
			.limit(1);

		let password_hash: string = '';
		if (existingUser.length === 1) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			password_hash = existingUser[0].password_hash ?? '';
		}

		const validPassword = await Bun.password.verify(form.data.password, password_hash);

		if (!validPassword) {
			return message(form, 'Username or Password incorrect');
		}

		const session = await lucia.createSession(existingUser[0].id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
