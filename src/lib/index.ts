// place files you want to import through the `$lib` alias in this folder.
import { persisted } from 'svelte-persisted-store';

import LightDarkSystemButtons from './components/theme-controller/LightDarkSystemButtons.svelte';
import ApplicationBranding from './components/branding/ApplicationBranding.svelte';
import Notifications from './components/notifications/Notifications.svelte';

/**
 * Available themes for the page.
 */
const availableThemes = ['light', 'dark'];
/**
 * Store for the current set theme.
 */
const preferences = persisted('preferences', {
	theme: ''
});

export { availableThemes, preferences, LightDarkSystemButtons, ApplicationBranding, Notifications };
