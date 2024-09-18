<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form);
</script>

<article class="prose m-auto max-w-3xl">
	<h1>Sign In</h1>
	<p>Please provide your username and password!</p>
	<form class="" method="post" action="?/signin" use:enhance>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Username</span>
			</div>
			<input
				autocomplete="off"
				type="text"
				name="username"
				bind:value={$form.username}
				placeholder="Username"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.username}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.username}</span>
				</div>
			{/if}
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				autocomplete="off"
				type="password"
				name="password"
				bind:value={$form.password}
				placeholder="Password"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.password}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.password}</span>
				</div>
			{/if}
		</label>
		{#if $message}
			<div class="text-error mt-2 text-center max-w-xs">{$message}</div>
		{/if}
		<div class="flex max-w-xs flex-col">
			<button class="mt-4 btn btn-primary w-full" type="submit">Sign In</button>
			<div class="divider">you don't have an account?</div>
			<a href="/authentication/signup" class=" btn btn-outline w-full" type="submit">Sign Up</a>
		</div>
	</form>
</article>
