import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { availableThemes } from '$lib';

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

export const handle: Handle = sequence(setThemeFromCookie);
