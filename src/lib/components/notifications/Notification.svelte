<script lang="ts">
	import MaterialSymbolsLightCloseSmallOutlineRounded from '~icons/material-symbols-light/close-small-outline-rounded';
	import Info from '~icons/material-symbols-light/info-outline-rounded';
	import Warning from '~icons/material-symbols-light/error-outline-rounded';
	import Error from '~icons/material-symbols-light/cancel-outline-rounded';
	import Success from '~icons/material-symbols-light/check-circle-outline-rounded';
	import {
		dismissNotification,
		type Notification,
		NotificationType
	} from '$lib/client/Notifications';

	export let data: Notification;
	export let id: string;
</script>

<div role="alert" class="alert shadow-md items-start rounded-xl">
	{#if data.type === NotificationType.Info}
		<Info class="h-7 w-7 text-info" />
	{:else if data.type === NotificationType.Warning}
		<Warning class="h-7 w-7 text-warning" />
	{:else if data.type === NotificationType.Error}
		<Error class="h-7 w-7 text-error" />
	{:else if data.type === NotificationType.Success}
		<Success class="h-7 w-7 text-success" />
	{/if}
	<div>
		<h3 class="text-sm">{data.title}</h3>
		{#if data.caption}
			<div class="text-xs">{data.caption}</div>
		{/if}
	</div>
	{#if data.hideCloseButton !== true}
		<button
			class="btn btn-sm btn-square btn-ghost"
			on:click={() => {
				dismissNotification(id);
			}}
		>
			<MaterialSymbolsLightCloseSmallOutlineRounded class="h-6 w-6" />
		</button>
	{/if}
</div>
