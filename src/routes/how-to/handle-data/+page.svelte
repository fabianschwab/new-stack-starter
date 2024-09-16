<script lang="ts">
	import type { PageData } from './$types';
	import MaterialSymbolsLightEditOutlineRounded from '~icons/material-symbols-light/edit-outline-rounded';
	import MaterialSymbolsLightDeleteOutlineRounded from '~icons/material-symbols-light/delete-outline-rounded';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;
	const { form, errors, message, enhance } = superForm(data.createKudoForm);
</script>

<article class="prose max-w-3xl m-auto">
	<h1>Handle Data</h1>
	<p>
		CRUD example for handling data in SvelteKit with <code>load</code> function and
		<code>actions</code>.
	</p>
	<p>
		This should not be a tutorial, rather a - I know what to do, copy and paste page for faster
		development.<br />
		To learn about the core concepts of SvelteKit see the
		<a href="https://kit.svelte.dev/docs/load">official documentation for loading data</a>.
	</p>
	<p>For best practices the following is done:</p>
	<ul>
		<li>SQLite</li>
		<li>Drizzle ORM</li>
		<li>Validation schemas from SQL schema</li>
		<li>Zod form validation</li>
		<li>
			Drizzle-zod is a plugin for Drizzle ORM that allows you to generate Zod schemas from Drizzle
			ORM schemas.
		</li>
	</ul>
	<p>As an example for</p>
	<ol>
		<li>List all entries</li>
		<li>Create</li>
		<li>Read</li>
		<li>Update</li>
		<li>Delete</li>
	</ol>
	<p>a simple <strong>Kudo</strong> entity is used.</p>
	<p>A <strong>Kudo</strong> consists of:</p>
	<ul>
		<li>From - From whom is the Kudo</li>
		<li>To - The name of person the Kudo is addressed to</li>
		<li>Message - A nice message for the person</li>
		<li>ID - unique id</li>
		<li>Date - Date and Time when the entry was created</li>
	</ul>
	<h2>Data from <code>load</code> function</h2>
	<p>
		{data.kudos.length}
		{data.kudos.length === 1 ? 'Kudo' : 'Kudos'} stored in the database.
	</p>
	<form method="POST" action="?/createKudo" class="max-w-md" use:enhance>
		<label class="form-control">
			<div class="label">
				<span class="label-text">From</span>
			</div>
			<input
				bind:value={$form.from}
				type="text"
				name="from"
				placeholder="Your name"
				class="input input-bordered"
			/>
			{#if $errors.from}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.from}</span>
				</div>
			{/if}
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">To</span>
			</div>
			<input
				bind:value={$form.to}
				type="text"
				name="to"
				placeholder="For whom"
				class="input input-bordered"
			/>
			{#if $errors.to}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.to}</span>
				</div>
			{/if}
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Message</span>
			</div>
			<textarea
				bind:value={$form.message}
				name="message"
				placeholder="Your message ..."
				class="textarea textarea-bordered"
			/>
			{#if $errors.message}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.message}</span>
				</div>
			{/if}
		</label>
		<div class="mt-4 flex gap-4">
			<button class="btn btn-primary" type="submit">Add new Kudo</button>
			<button class="btn btn-secondary" type="reset">Reset form</button>
		</div>
	</form>
</article>
<div class="wrapper">
	{#each data.kudos as kudo}
		<div class="card bg-base-200 shadow-md">
			<div class="card-body">
				<div class="flex justify-between">
					<div class="card-title text-primary">{kudo.to}</div>
					<div class="gap-1">
						<button class="btn btn-square btn-ghost btn-sm"
							><MaterialSymbolsLightEditOutlineRounded /></button
						>
						<button class="btn btn-square btn-ghost btn-sm"
							><MaterialSymbolsLightDeleteOutlineRounded /></button
						>
					</div>
				</div>
				<div class="text-bold">{kudo.message}</div>
				<div class="card-actions justify-between items-baseline">
					<div class="text-sm">
						{kudo.from}
					</div>
					<div class="text-xs">
						{new Date(kudo.date).toLocaleString('de-DE', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.wrapper {
		@apply mt-8 gap-4;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	}
</style>
