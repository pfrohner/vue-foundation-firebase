import firebase from 'firebase';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Foundation from './helpers/foundation';

Vue.use(Foundation);

Vue.config.productionTip = false;

// enter values from firebase project
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(function(user) {
	if (!app) {
		// set user status after page refresh
		if (user) {
			store.dispatch('setUserState');
		}

		/* eslint-disable no-new */
		app = new Vue({
			router,
			store,
			render : h => h(App)
		}).$mount('#app');
	}
});
