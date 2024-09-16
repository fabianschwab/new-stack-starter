<script>
	import 'tailwindcss/tailwind.css';
	import { ApplicationBranding, LightDarkSystemButtons, Notifications } from '$lib';
	import MaterialSymbolsLightMenuRounded from '~icons/material-symbols-light/menu-rounded';
	import MaterialSymbolsLightNotificationsUnreadOutlineRounded from '~icons/material-symbols-light/notifications-unread-outline-rounded';
	import MaterialSymbolsLightDataTableOutlineRounded from '~icons/material-symbols-light/data-table-outline-rounded';
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
		<div class="mx-3 mb-3">
			<slot />
		</div>
	</div>
	<!-- Sidebar content here -->
	<div class="drawer-side">
		<label for="main-nav-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
			<div class="max-lg:hidden mb-4">
				<ApplicationBranding class="text-primary" />
			</div>
			<li>
				<a href="/how-to/notifications"
					><MaterialSymbolsLightNotificationsUnreadOutlineRounded />Notification System</a
				>
			</li>
			<li>
				<a href="/how-to/handle-data"><MaterialSymbolsLightDataTableOutlineRounded />Handle Data</a>
			</li>
			<!-- TODO sidebar component -->
			<div class="flex justify-center grow items-end">
				<LightDarkSystemButtons />
			</div>
		</ul>
	</div>
</div>
<Notifications />
