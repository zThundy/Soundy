import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router/index.js";
import ProfileAPI from "./apis/ProfileGetterAPI.js";
import emitter from "tiny-emitter/instance";

// Vuetify
import 'vuetify/styles'
import 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  icons: { defaultSet: 'mdi' },
  theme: { defaultTheme: 'dark' }
})

import "./assets/main.css";
import "./assets/buttons.css";

// // import fontawesome core library
// import { library } from "@fortawesome/fontawesome-svg-core";
// // import the vue component of fontawesome
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// // import all the icons we want to use globally
// import {
//   faTriangleExclamation,
//   faCheck,
//   faCookieBite,
//   faCookie,
//   faArrowAltCircleDown,
//   faArrowDown,
//   faArrowLeft,
//   faArrowRight,
//   faCog,
//   faHome,
//   faClose,
//   faRightFromBracket,
//   faBullhorn,
//   faPencil,
//   faPaperclip,
//   faFloppyDisk,
//   faSpinner,
//   faTrash,
//   faSadCry,
//   faFaceFrown,
//   faFaceSmile,
//   faPlus,
//   faXmark,
//   faArrowUpFromBracket,
//   faCircleCheck,
//   faCircleMinus,
//   faCircleXmark,
//   faRotate,
//   faWindowMaximize,
//   faCamera,
// } from "@fortawesome/free-solid-svg-icons";

// import {
//   faGithub,
//   faTwitch,
//   faTwitter,
// } from "@fortawesome/free-brands-svg-icons";

// library.add(
//   faTriangleExclamation,
//   faCheck,
//   faCookieBite,
//   faCookie,
//   faArrowAltCircleDown,
//   faArrowDown,
//   faArrowLeft,
//   faArrowRight,
//   faCog,
//   faHome,
//   faClose,
//   faRightFromBracket,
//   faGithub,
//   faTwitter,
//   faTwitch,
//   faBullhorn,
//   faPencil,
//   faPaperclip,
//   faFloppyDisk,
//   faSpinner,
//   faTrash,
//   faSadCry,
//   faFaceFrown,
//   faFaceSmile,
//   faPlus,
//   faXmark,
//   faArrowUpFromBracket,
//   faCircleCheck,
//   faCircleMinus,
//   faCircleXmark,
//   faRotate,
//   faWindowMaximize,
//   faCamera
// );

// // This is cool, but too heavy for the user.
// // import * as Icons from '@fortawesome/free-solid-svg-icons';
// // for (var icon in Icons) {
// //     if (icon === "fas" || icon === "prefix") continue;
// //     library.add(Icons[icon]);
// // }

// const app = createSSRApp(App).component("font-awesome-icon", FontAwesomeIcon);
const app = createApp(App);
// add vue router component
app.use(router);
// ad vuetify
app.use(vuetify);
// add pinia for store
const pinia = createPinia()
app.use(pinia)
// add profile API
app.provide("$profileAPI", ProfileAPI);
// add event emitter
app.provide("$emitter", emitter);
app.mount("#app");
