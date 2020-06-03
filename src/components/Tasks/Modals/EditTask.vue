<template>
	<q-card>
		<modal-header>Edit Task</modal-header>

		<q-card-section class="q-pt-none">
			<modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />
			<modal-due-date :due-date.sync="taskToSubmit.dueDate" />
			<modal-due-time v-if="taskToSubmit.dueDate" :due-time.sync="taskToSubmit.dueTime" />
		</q-card-section>

		<modal-buttons @submit-form="submitForm" />
	</q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit-task"

export default {
	mixins: [mixinAddEditTask],
	props: ["task", "id"],

	data() {
		return {
			taskToSubmit: {
				name: "",
				dueDate: "",
				dueTime: "",
				completed: false
			}
		};
	},

	mounted() {
		this.taskToSubmit = Object.assign({}, this.task);
	},

	methods: {
		...mapActions("tasks", ["updateTask"]),
		submitForm() {
			this.$refs.modalTaskName.$refs.taskName.validate();

			if (this.$refs.modalTaskName.$refs.taskName.hasError) {
				return;
			}

			this.updateTask({
				id: this.id,
				updates: this.taskToSubmit,
			});
			this.$emit("close");
		}
	},
};
</script>

<style lang="scss" scoped>
</style>