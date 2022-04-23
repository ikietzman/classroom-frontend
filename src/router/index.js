import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/AccountView.vue')
  },
  {
    path: '/accountsetup',
    name: 'accountsetup',
    component: () => import(/* webpackChunkName: "account-setup" */ '../views/AccountSetupView.vue')
  },
  {
    path: '/find-courses',
    name: 'find courses',
    component: () => import(/* webpackChunkName: "find-courses" */ '../views/FindCoursesView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/my-course/:id/course/:usercourseid/courseid/:courseid',
    name: 'my course single',
    component: () => import(/* webpackChunkName: "my-course" */ '../views/MySingleCourseView.vue'),
    children: [
      {
        path: 'lesson/:lessonid',
        component: () => import(/* webpackChunkName: "my-course" */ '../views/LessonView.vue')
      },
      {
        path: 'test/:testid/',
        component: () => import(/* webpackChunkName: "my-course" */ '../views/TestView.vue'),
        children: [
          {
            path: 'results/:usertestid',
            component: () => import(/* webpackChunkName: "my-course" */ '../views/TestResultsView.vue'),
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/my-courses',
    name: 'my courses',
    component: () => import(/* webpackChunkName: "my-courses" */ '../views/MyCoursesView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: () => import(/* webpackChunkName: "resetpassword" */ '../views/ResetPasswordView.vue')
  },
  {
    path: '/course/:id',
    name: 'single course',
    component: () => import(/* webpackChunkName: "course" */ '../views/SingleCourseView.vue')
  },
  {
    path: '/test/:testid/course/:usercourseid/courseid/:courseid',
    name: 'test attempt',
    component: () => import(/* webpackChunkName: "test-attempt" */ '../views/TestAttemptView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
