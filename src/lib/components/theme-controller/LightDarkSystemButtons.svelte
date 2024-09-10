<script lang="ts">
	import { availableThemes, preferences } from '$lib';
	import MaterialSymbolsLightSunnyOutlineRounded from '~icons/material-symbols-light/sunny-outline-rounded';
	import MaterialSymbolsLightLaptopMacOutline from '~icons/material-symbols-light/laptop-mac-outline';
	import MaterialSymbolsLightNightlightOutlineRounded from '~icons/material-symbols-light/nightlight-outline-rounded';

	// when the theme changes, update the cookie and the html data tag DaisyUI uses to determine the theme
	function changeTheme(selection: string) {
		if (selection && availableThemes.includes(selection)) {
			preferences.set({ theme: selection });
			const one_year = 60 * 60 * 24 * 365;
			document.cookie = `theme=${$preferences.theme}; max-age=${one_year}; path=/; SameSite=Lax`;
			document.documentElement.setAttribute('data-theme', $preferences.theme);
		} else {
			preferences.reset();
			document.cookie = `theme=''; max-age=0; path=/; SameSite=Lax`;
			document.documentElement.setAttribute('data-theme', '');
		}
	}
</script>

<div class="join">
	<button
		on:click={() => {
			changeTheme('light');
		}}
		class="join-item btn-sm btn btn-ghost {$preferences.theme === 'light' ? 'text-primary' : ''}"
		><MaterialSymbolsLightSunnyOutlineRounded /></button
	>
	<button
		on:click={() => {
			changeTheme('');
		}}
		class="join-item btn-sm btn btn-ghost {$preferences.theme === '' ? 'text-primary' : ''}"
		><MaterialSymbolsLightLaptopMacOutline /></button
	>
	<button
		on:click={() => {
			changeTheme('dark');
		}}
		class="join-item btn-sm btn btn-ghost {$preferences.theme === 'dark' ? 'text-primary' : ''}"
		><MaterialSymbolsLightNightlightOutlineRounded /></button
	>
</div>
