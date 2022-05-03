# A Vue.js virtual classroom application with the Vue Router, Vuex for state management, and Firebase Auth

This application as built is intended to be used together with the complementary backend application at [https://github.com/ikietzman/classroom-backend](https://github.com/ikietzman/classroom-backend), though of course you are welcome to wrangle it however you see fit.

This is very much a work in project. See below for a roadmap of next steps.

## Application install and setup
```
git clone https://github.com/ikietzman/classroom-frontend.git
npm install
```
You must have a Firebase project with Email/Password auth provider enabled in order to get this working. You must also change the name of credentials_sample.js to credentials.js and swap in your Firebase application credentials. For more information, go to [firebase.google.com](firebase.google.com).

## npm scripts
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Roadmap for next steps
*Move request URLs into a .env file  
*Thoroughly comment  
*Add client side validation checks and user feedback to run prior sending off requests  
*Improve API call response handling -- currently only deals with expected responses  
*Add 404 route  
*Needs a healthy dose of design work  
*Jest for unit testing, Vue Testing Library for component testing  
*Dockerize and deploy to EC2 instance  
