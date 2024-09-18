<script lang="ts">
	import { enhance } from '$app/forms';
	export let data;
</script>

<article class="prose m-auto max-w-3xl">
	<h1>Sign Out</h1>
	<p>You are signed in as:</p>
	<pre>{JSON.stringify(data, null, 2)}</pre>
	<p>Feel free to sign out</p>
	<form method="post" action="?/signout" use:enhance>
		<button class="btn btn-neutral" type="submit">Sign Out</button>
	</form>
</article>
