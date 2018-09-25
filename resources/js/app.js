/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 1. Define route components.
// These can be imported from other files
const Test = {
    template: '<div>Test Component</div>'
}

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
// const vs let (can change)
let routes = [{
        path: '/dashboard',
        component: require('./components/Dashboard.vue')
    },
    {
        path: '/profile',
        component: require('./components/Profile.vue')
    }
]



// 3. Create the router instance and pass the `routes` option

const router = new VueRouter({
    routes // short for `routes: routes`
})



// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.


const app = new Vue({
    el: '#app',
    router
});
