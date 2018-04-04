import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

// dynamic import + vue router = code splitting
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue');
const News = () => import(/* webpackChunkName: "news" */ '@/views/News.vue');
const Signup = () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue');

Vue.use(Router);

// routes
const router = new Router({
	mode : 'history',
	linkActiveClass : 'active',
	routes : [
		{ path : '*', redirect : '/login' },
		{ path : '/', redirect : '/home' },
		{ name : 'home', path : '/home', component : Home, meta : { requiresAuth : true }},
		{ name : 'signup', path : '/signup', component : Signup },
		{ name : 'login', path : '/login', component : Login },
		{ name : 'newsList', path : '/news', component : News,
			children : [
				{ name : 'newsItem', path : ':id', component : News }
			]
		}
	]
});

// navigation guards
router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) {
		next('/login');
	} else {
		next();
	}
});

export default router;
