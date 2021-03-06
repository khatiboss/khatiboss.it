// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
// const vs let (can change)
export const routes = [{
        path: '/dashboard',
        component: require('./components/Dashboard.vue')
    },
    {
        path: '/profile',
        component: require('./components/profile/profile.vue')
    },
    {
        path: '/users',
        component: require('./components/users/Users.vue')
    },
    {
        path: '/softUsers',
        component: require('./components/users/usersSoftDeleted.vue')
    },
]
