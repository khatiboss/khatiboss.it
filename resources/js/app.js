/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./assets/bootstrap');
window.Vue = require('vue');
require('./assets/filters');
require('./assets/vForm');
require('./assets/vueProgressBar');
require('./assets/sweetalert2');

import {
    routes
} from './routes';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 1. Define route components.
// These can be imported from other files
const Test = {
    template: '<div>Test Component</div>'
}

// 3. Create the router instance and pass the `routes` option

const router = new VueRouter({
    mode: 'history',
    routes, // short for `routes: routes`
    linkActiveClass: 'active' // It will active this class "router-link-exact-active" when click on menu.
})

//Public Access to Fire
window.Fire = new Vue();

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.


const app = new Vue({
    el: '#app',
    router
});
