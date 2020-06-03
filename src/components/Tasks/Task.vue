<template>
	<q-item
		v-ripple
		clickable
		@click="updateTask({ id: id, updates: { completed: !task.completed } })"
		v-touch-hold:2000.mouse="showEditTaskModal"
		:class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
	>
		<q-item-section side top>
			<q-checkbox :value="task.completed" class="no-pointer-events" />
		</q-item-section>

		<q-item-section>
			<q-item-label :class="{ 'text-strike-through' : task.completed }" v-html="$options.filters.searchHighlight(task.name, search)"></q-item-label>
		</q-item-section>

		<q-item-section v-if="task.dueDate" side>
			<div class="row">
				<div class="column justify-center">
					<q-icon name="event" size="18px" class="q-mr-xs" />
				</div>
				<div class="column">
					<q-item-label caption class="row justify-end">{{ task.dueDate | niceDate }}</q-item-label>
					<q-item-label caption class="row justify-end">
						<small>{{ taskDueTime }}</small>
					</q-item-label>
				</div>
			</div>
		</q-item-section>

		<q-item-section side>
			<div class="row">
				<q-btn flat round dense color="primary" icon="edit" @click.stop="showEditTaskModal" />
				<q-btn flat round dense color="red" icon="delete" @click.stop="promptToDelete(id)" />
			</div>
		</q-item-section>

		<q-dialog v-model="showEditTask">
			<edit-task @close="showEditTask = false" :task="task" :id="id" />
		</q-dialog>
	</q-item>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { date } from "quasar";

export default {
	props: ["task", "id"],

	data() {
		return {
			showEditTask: false
		};
	},

	computed: {
		...mapState("tasks", ["search"]),
		...mapGetters("settings", ["settings"]),
		taskDueTime() {
			if(this.settings.show12HourTimeFormat) {
				return date.formatDate(this.task.dueDate + " " + this.task.dueTime, "h:mmA");
			}
			return this.task.dueTime
		}
	},

	methods: {
		...mapActions("tasks", ["updateTask", "deleteTask"]),
		promptToDelete(id) {
			this.$q
				.dialog({
					title: "Confirm",
					message: "Would you like to really delete the task?",
					cancel: true,
					persistent: true
				})
				.onOk(() => {
					this.deleteTask(id);
				});
		},
		showEditTaskModal() {
			this.showEditTask = true;
		}
	},

	components: {
		"edit-task": require("components/Tasks/Modals/EditTask").default
	},

	filters: {
		niceDate(value) {
			return date.formatDate(value, "MMM D");
		},
		searchHighlight(value, search) {
			if(search) {
				let searchRegExp = new RegExp(search, "ig");
				return value.replace(searchRegExp, match => {
					return `<span class="bg-yellow-6">${match}</span>`;
				}) 
			}

			return value;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>