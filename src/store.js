import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
	state : {
		count : 9,
		isLoading : false,
		genericError : null,
		user : null,
		games : null,
		news : null
	},
	getters : {
		isLoggedIn : ({ user }) => {
			return user !== null;
		},
		userName : ({ user }) => {
			return user ? user.email : '';
		},
		news : ({news}) => {
			return news;
		}
	},
	mutations : {
		setUserState : state => {
			state.user = firebase.auth().currentUser;
		},
		setData : (state, { type, data }) => {
			state[type] = data;
		},
		setGenericError : (state, error) => {
			state.genericError = error;

			// TODO: improve error handling
			window.setTimeout(() => {
				state.genericError = null;
			}, 2000);
		},
		setSpinner : (state, status) => {
			state.isLoading = status;
		}
	},
	actions : {
		setUserState : context => {
			context.commit('setUserState');
		},
		async fetchData(context, calls) {
			context.commit('setSpinner', true);

			try {
				const data = calls.map(call => firebase.database().ref(call).once('value'));
				const response = await Promise.all(data);

				// TODO: meh :-/
				calls.forEach((call, index) => {
					context.commit('setData', {
						type : call,
						data : response[index].val()
					});
				});
			}
			catch (error) {
				context.commit('setGenericError', error.toString());
			}

			context.commit('setSpinner', false);
		}
	}
});
