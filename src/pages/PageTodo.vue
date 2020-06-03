<template>
	<q-page>
		<div class="q-pa-md absolute full-width full-height column">
			<template v-if="tasksDownloaded">
				<div class="row">
					<search />
					<sort />
				</div>

				<p v-if="!Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length && search">
					No Search Results
				</p>

				<q-scroll-area class="q-scroll-area-tasks">
					<no-tasks
						v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"
					></no-tasks>

					<tasks-todo v-if="Object.keys(tasksTodo).length" :tasks-todo="tasksTodo" />

					<tasks-completed
						v-if="Object.keys(tasksCompleted).length"
						:tasks-completed="tasksCompleted"
						class="q-mb-xl"
					/>
				</q-scroll-area>

				<div class="absolute-bottom text-center q-mb-lg no-pointer-events">
					<q-btn
						round
						color="primary"
						size="24px"
						icon="add"
						@click="showAddTask = true"
						class="all-pointer-events"
					/>
				</div>
			</template>
			<template v-else>
				<span class="absolute-center">
					<q-spinner color="primary" size="3em" />
				</span>
			</template>
		</div>

		<q-dialog v-model="showAddTask">
			<add-task @close="showAddTask = false" />
		</q-dialog>
	</q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
	data() {
		return {
			showAddTask: false,
		};
	},
	computed: {
		...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
		...mapGetters("settings", ["settings"]),
		...mapState("tasks", ["search", "tasksDownloaded"]),
	},
	mounted() {
		this.$root.$on("show-add-task", () => {
			this.showAddTask = true;
		});
	},
	components: {
		"add-task": require("components/Tasks/Modals/AddTask.vue").default,
		"tasks-todo": require("components/Tasks/TasksTodo.vue").default,
		"tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
		"no-tasks": require("components/Tasks/NoTasks.vue").default,
		search: require("components/Tools/Search.vue").default,
		sort: require("components/Tools/Sort.vue").default,
	},
};
</script>

<style lang="scss" scoped>
.q-scroll-area-tasks {
	display: flex;
	flex-grow: 1;
}
</style>
