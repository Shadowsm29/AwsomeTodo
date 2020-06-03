import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
	apiKey: "AIzaSyDaLNwkBZM0idSCijAro_BV28Zfj9FXoq8",
	authDomain: "awsome-todo-27702.firebaseapp.com",
	databaseURL: "https://awsome-todo-27702.firebaseio.com",
	projectId: "awsome-todo-27702",
	storageBucket: "awsome-todo-27702.appspot.com",
	messagingSenderId: "772947505318",
	appId: "1:772947505318:web:198305a9fcff094b570467",
	measurementId: "G-ES6G1G8FEX",
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
