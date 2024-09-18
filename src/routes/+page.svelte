<script>
	import { addNotification, clearNotifications, NotificationType } from '$lib/client/Notifications';
</script>

<article class="prose max-w-3xl m-auto">
	<h1>Welcome to SvelteKit Starter 2.0</h1>
	<p>I built a web app starter based on my favorite tech stack, which includes:</p>
	<ul>
		<li>Bun</li>
		<li>SvelteKit</li>
		<li>TailwindCSS</li>
		<li>DaisyUI</li>
		<li>Superforms</li>
		<li>Zod Form Validation</li>
		<li>Drizzle ORM</li>
		<li>Lucia Auth</li>
	</ul>
	<p>
		I chose this stack because I find each technology intuitive and easy to use, allowing for a
		seamless development experience.
	</p>
	<p>
		Additionally, I was actively learning these technologies, which made them ideal choices for me
		to experiment with and apply in real-world projects. This combination of tools helps streamline
		the development process, offering flexibility, robust type safety, and smooth integration, while
		keeping the overall architecture lightweight and efficient.
	</p>
	<h2>Features</h2>
	<p>
		This starter also provides a set of common features so they don't have to be implemented each
		time.
	</p>
	<h3>Notifications</h3>
	<p>The notification system with can be triggered over a function.</p>
	<div class="flex gap-4">
		<button
			class="btn btn-neutral"
			on:click={() =>
				addNotification({
					type: NotificationType.Info,
					title: 'New Notification!',
					caption: new Date().toLocaleTimeString('DE-de')
				})}>Create Notification</button
		>
		<button class="btn btn-outline" on:click={() => clearNotifications()}
			>Clear Notifications</button
		>
	</div>
	<p>For detailed information see <a href="/how-to/notifications">notifications</a> page.</p>
	<h3>Handling Data</h3>
	<p>
		In SvelteKit you should avoid using fetch to load data. Use the <code>load</code> function in
		the <code>+page.server.ts</code> file.<br />
		Also for creating data use form <code>actions</code>. For more details and a simple example see
		the <a href="/how-to/handle-data">handle data</a> page.
	</p>
</article>
