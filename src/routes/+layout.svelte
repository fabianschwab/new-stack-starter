<script>
	import 'tailwindcss/tailwind.css';
	import { ApplicationBranding, LightDarkSystemButtons } from '$lib';
	import MaterialSymbolsLightMenuRounded from '~icons/material-symbols-light/menu-rounded';
</script>

<!-- Main Layout -->
<div class="drawer lg:drawer-open">
	<input id="main-nav-drawer" type="checkbox" class="drawer-toggle" />
	<!-- Page content here -->
	<div class="drawer-content">
		<!-- Application Bar -->
		<div class="navbar bg-base-100">
			<div class="navbar-start lg:hidden">
				<label for="main-nav-drawer" class="btn btn-square btn-ghost">
					<MaterialSymbolsLightMenuRounded class="text-lg" />
				</label>
			</div>
			<div class="navbar-center">
				<ApplicationBranding class="lg:hidden" />
				<!-- TODO Search or so? -->
			</div>
			<div class="navbar-end">
				<!-- TODO login / logout component -->
			</div>
		</div>
		<div class="mx-3">
			<slot />
		</div>
	</div>
	<!-- Sidebar content here -->
	<div class="drawer-side">
		<label for="main-nav-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
			<div class="max-lg:hidden">
				<ApplicationBranding />
			</div>
			<li><a href="/">Sidebar Item 1</a></li>
			<li><a href="/">Sidebar Item 2</a></li>
			<!-- TODO sidebar component -->
			<div class="flex justify-center grow items-end">
				<LightDarkSystemButtons />
			</div>
		</ul>
	</div>
</div>
