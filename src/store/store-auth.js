import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
	loggedIn: false,
};

const mutations = {
	setLoggedIn(state, value) {
		state.loggedIn = value;
	},
};

const actions = {
	registerUser({}, payload) {
		firebaseAuth
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(res => {
				console.log("registerUser -> res", res);
			})
			.catch(err => {
				showErrorMessage(err.message);
			});
	},
	loginUser({}, payload) {
		Loading.show();
		firebaseAuth
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then(res => {
				console.log("loginUser -> res", res);
			})
			.catch(err => {
				showErrorMessage(err.message);
			});
	},
	logoutUser() {
		firebaseAuth
			.signOut()
			.then(res => {
				console.log("loginUser -> res", res);
			})
			.catch(err => {
				console.log("loginUser -> err", err);
			});
	},
	handleAuthStateChange({ commit, dispatch }) {
		firebaseAuth.onAuthStateChanged(user => {
			Loading.hide();
			if (user) {
				commit("setLoggedIn", true);
				LocalStorage.set("loggedIn", true);
				this.$router.push({ name: "index" }).catch(err => {});
				dispatch("tasks/fbReadData", null, { root: true });
			} else {
				commit("tasks/clearTasks", null, { root: true });
				commit("tasks/setTasksDownloaded", false, { root: true });
				commit("setLoggedIn", false);
				LocalStorage.set("loggedIn", false);
				this.$router.replace("/auth").catch(err => {});
			}
		});
	},
};

const getters = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
