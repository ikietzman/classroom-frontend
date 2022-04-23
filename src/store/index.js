import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    userData: null,
    userDataStatus: 0,
    selectedCourse: null,
    selectedCourseLessons: null,
    selectedCourseLessonsStatus: 0,
    selectedCourseTest: null,
    selectedCourseTestStatus: 0,

  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserID (state, payload) {
      state.userData = payload
    },
    setUserDataStatus (state, payload) {
      state.userDataStatus = payload
    },
    setSelectedCourse (state, payload) {
      state.selectedCourse = payload
    },
    setSelectedCourseLessons (state, payload) {
      state.selectedCourseLessons = payload
    },
    setSelectedCourseLessonsStatus (state, payload) {
      state.selectedCourseLessonsStatus = payload
    },
    setSelectedCourseTest (state, payload) {
      state.selectedCourseTest = payload
    },
    setSelectedCourseTestStatus (state, payload) {
      state.selectedCourseTestStatus = payload
    },
  },
  actions: {
    setUser (context, user) {
      return new Promise((resolve, reject) => {
        context.commit('setUser', user);
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/users/id/${user.uid}`);
          if (res) {
            const data = await res.json();
            context.commit('setUserID', data)
            context.commit('setUserDataStatus', 1)
            resolve()
          }
          else {
            reject()
          }
        })();
      })
    },
    setSelectedCourse (context, course) {
      return new Promise((resolve) => {
        context.commit('setSelectedCourse', course);
        resolve();
      })
    },
    setSelectedCourseLessons (context, course) {
      return new Promise((resolve, reject) => {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/courses/${course.ID}/lessons`);
          if (res) {
            const data = await res.json();
            context.commit('setSelectedCourseLessons', data)
            context.commit('setSelectedCourseLessonsStatus', 1)
            resolve()
          }
          else {
            reject()
          }
        })();
      })
    },
    setSelectedCourseTest (context, course) {
      return new Promise((resolve, reject) => {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/courses/tests/${course.ID}`);
          if (res) {
            const data = await res.json();
            context.commit('setSelectedCourseTest', data)
            context.commit('setSelectedCourseTestStatus', 1)
            resolve()
          }
          else {
            reject()
          }
        })();
      })
    },
  },
  modules: {
  }
})
