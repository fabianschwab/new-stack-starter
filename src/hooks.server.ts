import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { availableThemes } from '$lib';
import { lucia } from '$lib/server/auth';

/**
 * Sets the theme from the cookie directly into the `html` tag, before returning it to the browser.
 * This prevents flashing or flickering after a refresh or  re-visit of the page.
 */
const setThemeFromCookie: Handle = async ({ event, resolve }) => {
	const themeFromCookie = event.cookies.get('theme');

	if (!themeFromCookie || !availableThemes.includes(themeFromCookie)) {
		return await resolve(event);
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme=""', `data-theme="${themeFromCookie}"`);
		}
	});
};

const luciaAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = sequence(setThemeFromCookie, luciaAuth);
