<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance } = superForm(data.form);
</script>

<article class="prose m-auto max-w-3xl">
	<h1>Sign up</h1>
	<p>Please choose a username and password!</p>
	<form method="post" action="?/signup" use:enhance>
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
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Confirm Password</span>
			</div>
			<input
				autocomplete="off"
				type="password"
				name="passwordConfirmation"
				bind:value={$form.passwordConfirmation}
				placeholder="Confirm Password"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.passwordConfirmation}
				<div class="label">
					<span class="label-text-alt text-error">{$errors.passwordConfirmation}</span>
				</div>
			{/if}
		</label>
		<div class="flex max-w-xs flex-col">
			<button class="mt-4 btn btn-primary w-full" type="submit">Sign Up</button>
			<div class="divider">already have an account?</div>
			<a href="/authentication/signin" class=" btn btn-outline w-full" type="submit">Sign In</a>
		</div>
	</form>
</article>
