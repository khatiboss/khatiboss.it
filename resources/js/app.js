/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');
require('./filters');
require('./vForm');
require('./vueProgressBar');
require('./sweetalert2');

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
    routes // short for `routes: routes`
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
