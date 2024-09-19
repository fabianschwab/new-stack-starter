<article class="prose max-w-3xl m-auto">
	<h1>Authentication</h1>
	<p>
		Authentication is done with <a href="https://lucia-auth.com">Lucia Auth</a>. It uses the
		SvelteKit <code>+hooks.server.ts</code> to intercept all incoming requests to validate them.
	</p>
	<p>
		Lucia Auth also supports Drizzle as ORM. As for all examples and easy of use, the same SQLite
		database is used.
	</p>
	<ul>
		<li>
			<a href="/authentication/signup">Register Page</a> with username and password, redirected to
			<code>/authentication/signout</code> page when user already signed in.
		</li>
		<li>
			<a href="/authentication/signin">Log In Page</a> if an account already exits, redirected to
			<code>/authentication/signout</code> page when user already signed in.
		</li>
		<li>
			<a href="/authentication/signout">Sign Out Page</a>, redirected to
			<code>/authentication/signin</code> when no user is signed in.
		</li>
		<li>
			OAuth via GitHub example and <a href="https://arctic.js.org/">Artic</a> as OAuth library.
		</li>
	</ul>
</article>
