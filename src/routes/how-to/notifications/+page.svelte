<script lang="ts">
	import { addNotification, NotificationType } from '$lib/client/Notifications';
	import { capitalizeFirstLetter } from '$lib/client/Utils';

	let type: NotificationType;
	let title: string;
	let caption: string;
	let timeout: number;
	let hideCloseButton: boolean = false;

	function handleCreateNotification(): void {
		addNotification({
			type,
			title,
			caption,
			timeout,
			hideCloseButton
		});
	}
</script>

<article class="prose max-w-3xl m-auto">
	<h1>How notifications work</h1>
	<p>
		On this page you can plan around with notifications.<br />
		Use the form below to change values or the type of the notification.
	</p>
	<p>Notifications are stored in local storage to survive a page reload.</p>

	<from>
		<div class="max-w-md mt-8">
			<label class="form-control">
				<div class="label">
					<span class="label-text">Type</span>
				</div>
				<select bind:value={type} class="select select-bordered">
					<option disabled selected value="undefined">Select a notification type</option>
					{#each Object.values(NotificationType) as type}
						<option value={type}>{capitalizeFirstLetter(type)}</option>
					{/each}
				</select>
			</label>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Title</span>
				</div>
				<input
					bind:value={title}
					type="text"
					placeholder="Title ..."
					class="input input-bordered"
				/>
			</label>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Caption</span>
				</div>
				<input
					bind:value={caption}
					type="text"
					placeholder="Caption ..."
					class="input input-bordered"
				/>
			</label>
			<label class="form-control">
				<div class="label">
					<span class="label-text">Timeout</span>
				</div>
				<input
					bind:value={timeout}
					type="number"
					placeholder="Timeout in ms ..."
					class="input input-bordered"
				/>
			</label>
			<label class="label cursor-pointer">
				<span class="label-text"
					>Hide Close Button<br /><span class="text-xs"
						>If close button is hidden, a timeout must be set. Otherwise the function throws an
						error!</span
					></span
				>
				<input type="checkbox" class="toggle toggle-success" bind:checked={hideCloseButton} />
			</label>
			<div class="flex gap-4 mt-4">
				<button class="btn btn-primary" type="submit" on:click={handleCreateNotification}
					>Create Notification</button
				>
				<button class="btn btn-secondary" type="reset">Clear From</button>
			</div>
		</div>
	</from>
</article>
