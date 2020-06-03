<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title class="absolute-center">Awsome Todo</q-toolbar-title>

				<q-btn
					v-if="!loggedIn"
					to="/auth"
					icon-right="account_circle"
					label="Login"
					class="absolute-right"
					flat
				/>

				<q-btn
					v-else
					@click="logoutUser"
					icon-right="account_circle"
					label="Logout"
					class="absolute-right"
					flat
				/>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			bordered
			content-class="bg-primary"
			:breakpoint="767"
			:width="250"
		>
			<q-list dark>
				<q-item-label header class="text-grey-4">Navigation</q-item-label>

				<q-item
					v-for="nav in navs"
					:key="nav.label"
					clickable
					:to="nav.to"
					exact
					class="text-grey-4"
				>
					<q-item-section avatar>
						<q-icon :name="nav.icon" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ nav.label }}</q-item-label>
					</q-item-section>
				</q-item>

				<q-item
					v-if="$q.platform.is.electron"
					@click="quitApp"
					clickable
					class="text-grey-4 absolute-bottom"
				>
					<q-item-section avatar>
						<q-icon name="power_settings_new" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Quit</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer>
			<q-tabs>
				<q-route-tab
					v-for="nav in navs"
					:key="nav.label"
					:to="nav.to"
					:icon="nav.icon"
					:label="nav.label"
				/>
			</q-tabs>
		</q-footer>
	</q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "MainLayout",

	data() {
		return {
			leftDrawerOpen: false,
			navs: [
				{
					label: "Todo",
					icon: "list",
					to: "/",
				},
				{
					label: "Settings",
					icon: "settings",
					to: "/settings",
				},
			],
		};
	},

	computed: {
		...mapState("auth", ["loggedIn"]),
	},

	methods: {
		...mapActions("auth", ["logoutUser"]),
		quitApp() {
			this.$q
				.dialog({
					title: "Confirm",
					message: "Really quit Qwsome Todo?",
					cancel: true,
					persistent: true,
				})
				.onOk(() => {
					if (this.$q.platform.is.electron) {
						require("electron").ipcRenderer.send("quit-app");
					}
				});
		},
	},
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
	.q-footer {
		display: none;
	}
	.q-drawer {
		.q-router-link--exact-active {
			color: white !important;
		}
	}
}
</style>
