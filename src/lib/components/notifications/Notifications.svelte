<script>
	import { notifications } from '$lib/client/Notifications';
	import Notification from './Notification.svelte';
</script>

{#if $notifications}
	<div class="toast">
		{#each $notifications as n (n.id)}
			<Notification id={n.id} data={n.data} />
		{/each}
	</div>
{/if}
