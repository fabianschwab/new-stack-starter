import { NotificationType } from '$lib/client/Notifications';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached.
const notificationSchema = z.object({
	type: z.nativeEnum(NotificationType),
	title: z.string().min(1).max(15),
	caption: z.string().min(5).max(50).optional(),
	timeout: z.number().min(500).optional(),
	hideCloseButton: z.boolean().optional()
});

export const load = async () => {
	const notificationForm = await superValidate(zod(notificationSchema));

	// Always return { form } in load functions.
	return { notificationForm };
};

export const actions = {
	createNotification: async ({ request }) => {
		const form = await superValidate(request, zod(notificationSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		if (form.data.hideCloseButton && !form.data.timeout) {
			// Display a error status message when conditions are not met.
			setError(form, 'hideCloseButton', 'Cannot hide close button without setting a timeout.');
			return setError(form, 'timeout', 'Cannot hide close button without setting a timeout.');
		}

		// Display a success status message.
		/**
		 * Don't return data here when saving data to an db or so.
		 * The load function is triggered again and will return all data like id for a created object
		 */
		return message(form, {
			msg: 'Notification created',
			notification: {
				type: form.data.type,
				title: form.data.title,
				caption: form.data.caption,
				timeout: form.data.timeout,
				hideCloseButton: form.data.hideCloseButton
			}
		});
	}
};
