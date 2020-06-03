import Vue from "vue";
import { uid, Notify } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
	tasks: {
		// ID1: {
		// 	name: "Go to shop",
		// 	completed: false,
		// 	dueDate: "2020/05/20",
		// 	dueTime: "18:30",
		// },
		// ID2: {
		// 	name: "Get bananas",
		// 	completed: false,
		// 	dueDate: "2020/05/28",
		// 	dueTime: "14:00",
		// },
		// ID3: {
		// 	name: "Get apples",
		// 	completed: false,
		// 	dueDate: "2020/05/29",
		// 	dueTime: "16:00",
		// },
	},
	search: "",
	sort: "name",
	tasksDownloaded: false,
};

const mutations = {
	updateTask(state, payload) {
		Object.assign(state.tasks[payload.id], payload.updates);
	},
	deleteTask(state, id) {
		Vue.delete(state.tasks, id);
	},
	addTask(state, payload) {
		Vue.set(state.tasks, payload.id, payload.task);
	},
	clearTasks(state, payload) {
		state.tasks = {};
	},
	setSearch(state, value) {
		state.search = value;
	},
	setSort(state, value) {
		state.sort = value;
	},
	setTasksDownloaded(state, value) {
		state.tasksDownloaded = value;
	},
};

const actions = {
	updateTask({ dispatch }, payload) {
		dispatch("fbUpdateTask", payload);
	},
	deleteTask({ dispatch }, id) {
		dispatch("fbDeleteTask", id);
	},
	addTask({ dispatch }, task) {
		let payload = {
			id: uid(),
			task: task,
		};
		dispatch("fbAddTask", payload);
	},
	setSearch({ commit }, value) {
		commit("setSearch", value);
	},
	setSort({ commit }, value) {
		commit("setSort", value);
	},
	fbReadData({ commit }) {
		const userId = firebaseAuth.currentUser.uid;
		let userTasks = firebaseDb.ref("tasks/" + userId);

		//initial check for data
		userTasks.once(
			"value",
			snapshot => {
				commit("setTasksDownloaded", true);
			},
			error => {
				showErrorMessage(error.message);
				this.$router.replace("/auth");
			},
		);

		//child added
		userTasks.on("child_added", snapshot => {
			const task = snapshot.val();
			const payload = {
				id: snapshot.key,
				task: task,
			};

			commit("addTask", payload);
		});

		//child changed
		userTasks.on("child_changed", snapshot => {
			const task = snapshot.val();
			const payload = {
				id: snapshot.key,
				updates: task,
			};
			commit("updateTask", payload);
		});

		//child removed
		userTasks.on("child_removed", snapshot => {
			const task = snapshot.val();
			commit("deleteTask", snapshot.key);
		});
	},
	fbAddTask({}, payload) {
		const userId = firebaseAuth.currentUser.uid;
		const taskRef = firebaseDb.ref(`tasks/${userId}/${payload.id}`);
		taskRef.set(payload.task, error => {
			if (error) {
				showErrorMessage(error.message);
			} else {
				Notify.create("Task added!");
			}
		});
	},
	fbUpdateTask({}, payload) {
		const userId = firebaseAuth.currentUser.uid;
		const taskRef = firebaseDb.ref(`tasks/${userId}/${payload.id}`);
		taskRef.update(payload.updates, error => {
			if (error) {
				showErrorMessage(error.message);
			} else {
				const keys = Object.keys(payload.updates)
				if(!(keys.includes("completed") && keys.length == 1)) {
					Notify.create("Task updated!");
				}
			}
		});
	},
	fbDeleteTask({}, taskId) {
		const userId = firebaseAuth.currentUser.uid;
		const taskRef = firebaseDb.ref(`tasks/${userId}/${taskId}`);
		taskRef.remove(error => {
			if (error) {
				showErrorMessage(error.message);
			} else {
				Notify.create("Task deleted!");
			}
		});
	},
};

const getters = {
	tasksSorted: ({ tasks, sort }) => {
		let tasksSorted = {};
		let keysOrdered = Object.keys(tasks);

		keysOrdered.sort((a, b) => {
			const taskAName = tasks[a][sort].toLowerCase();
			const taskBName = tasks[b][sort].toLowerCase();

			if (taskAName > taskBName) return 1;
			else if (taskAName < taskBName) return -1;
			else return 0;
		});

		keysOrdered.forEach(key => {
			tasksSorted[key] = tasks[key];
		});

		return tasksSorted;
	},
	tasksFiltered: ({ search }, getters) => {
		const tasksSorted = getters.tasksSorted;

		if (search) {
			let tasksFiltered = {};

			Object.keys(tasksSorted).forEach(key => {
				const task = tasksSorted[key];
				const taskNameLowerCase = task.name.toLowerCase();
				const searchLowerCase = search.toLowerCase();
				if (taskNameLowerCase.includes(searchLowerCase)) {
					tasksFiltered[key] = task;
				}
			});

			return tasksFiltered;
		}

		return tasksSorted;
	},
	tasksTodo: (state, getters) => {
		const tasks = getters.tasksFiltered;
		let tasksTodo = {};

		Object.keys(tasks).forEach(key => {
			const task = tasks[key];
			if (!task.completed) {
				tasksTodo[key] = task;
			}
		});

		return tasksTodo;
	},
	tasksCompleted: (state, getters) => {
		const tasks = getters.tasksFiltered;
		let tasksTodo = {};

		Object.keys(tasks).forEach(key => {
			const task = tasks[key];
			if (task.completed) {
				tasksTodo[key] = task;
			}
		});

		return tasksTodo;
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
