<script lang="ts">
	import { addNotification, NotificationType } from '$lib/client/Notifications';
	import { capitalizeFirstLetter } from '$lib/client/Utils';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	let showMessage = false;

	// Client API:
	const { form, errors, message, enhance } = superForm(data.notificationForm);

	$: if ($message) {
		addNotification($message.notification);
		showMessage = true;
		setTimeout(() => {
			showMessage = false;
		}, 2000);
	}
</script>

<article class="prose max-w-3xl m-auto">
	<h1>How notifications work</h1>
	<p>
		On this page you can plan around with notifications.<br />
		Use the form below to change values or the type of the notification.
	</p>
	<p>Notifications are stored in local storage to survive a page reload.</p>

	<form class="max-w-md mt-8" method="POST" action="?/createNotification" use:enhance>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Type</span>
			</div>
			<select name="type" bind:value={$form.type} class="select select-bordered">
				{#each Object.values(NotificationType) as type}
					<option value={type}>{capitalizeFirstLetter(type)}</option>
				{/each}
			</select>
			{#if $errors.type}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.type}</span>
				</div>
			{/if}
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Title</span>
			</div>
			<input
				bind:value={$form.title}
				type="text"
				name="title"
				placeholder="Title ..."
				class="input input-bordered"
			/>
			{#if $errors.title}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.title}</span>
				</div>
			{/if}
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Caption</span>
			</div>
			<input
				bind:value={$form.caption}
				type="text"
				name="caption"
				placeholder="Caption ..."
				class="input input-bordered"
			/>
			{#if $errors.caption}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.caption}</span>
				</div>
			{/if}
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Timeout</span>
			</div>
			<input
				bind:value={$form.timeout}
				type="number"
				name="timeout"
				placeholder="Timeout in ms ..."
				class="input input-bordered"
			/>
			{#if $errors.timeout}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.timeout}</span>
				</div>
			{/if}
		</label>
		<label class="label cursor-pointer">
			<span class="label-text"
				>Hide Close Button<br /><span class="text-xs"
					>If close button is hidden, a timeout must be set. Otherwise the function throws an error!</span
				></span
			>
			{#if $errors.hideCloseButton}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.hideCloseButton}</span>
				</div>
			{/if}
			<input
				type="checkbox"
				name="hideCloseButton"
				class="toggle toggle-success"
				bind:checked={$form.hideCloseButton}
			/>
		</label>
		<div class="flex gap-4 mt-4">
			<button class="btn btn-primary" type="submit">Create Notification</button>
			<button class="btn btn-secondary" type="reset">Clear From</button>
		</div>
	</form>
</article>
