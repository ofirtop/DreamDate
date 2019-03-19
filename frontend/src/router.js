import Vue from 'vue';
import Router from 'vue-router';

import home from './views/Home.vue';
import userProfile from './views/UserProfile.vue';
import memberDetails from './views/MemberDetails.vue';
import login from './views/Login.vue';
import userProfileEdit from './views/UserProfileEdit.vue';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: home },
    { path: '/user/edit/:userId?', component: userProfileEdit },
    { path: '/user/:userId', component: userProfile },
    { path: '/member/:userId', component: memberDetails },
    { path: '/login', component: login },
    //,
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
