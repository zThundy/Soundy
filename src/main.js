import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ProfileAPI from "./apis/ProfileGetterAPI.js";
import emitter from "tiny-emitter/instance";
import VueCookies from 'vue3-cookies'

import "./assets/main.css";
import "./assets/buttons.css";

// import fontawesome core library
import { library } from "@fortawesome/fontawesome-svg-core";
// import the vue component of fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import all the icons we want to use globally
import {
  faTriangleExclamation,
  faCheck,
  faCookieBite,
  faCookie,
  faArrowAltCircleDown,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faCog,
  faHome,
  faClose,
  faRightFromBracket,
  faBullhorn,
  faPencil,
  faPaperclip,
  faFloppyDisk,
  faSpinner,
  faTrash,
  faSadCry,
  faFaceFrown,
  faFaceSmile,
  faPlus,
  faXmark,
  faArrowUpFromBracket,
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
  faRotate,
  faWindowMaximize,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faTriangleExclamation,
  faCheck,
  faCookieBite,
  faCookie,
  faArrowAltCircleDown,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faCog,
  faHome,
  faClose,
  faRightFromBracket,
  faGithub,
  faTwitter,
  faTwitch,
  faBullhorn,
  faPencil,
  faPaperclip,
  faFloppyDisk,
  faSpinner,
  faTrash,
  faSadCry,
  faFaceFrown,
  faFaceSmile,
  faPlus,
  faXmark,
  faArrowUpFromBracket,
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
  faRotate,
  faWindowMaximize,
  faCamera
);

// This is cool, but too heavy for the user.
// import * as Icons from '@fortawesome/free-solid-svg-icons';
// for (var icon in Icons) {
//     if (icon === "fas" || icon === "prefix") continue;
//     library.add(Icons[icon]);
// }

// create the application adding all the components
const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

// add vue router component
app.use(router);
// add vue cookies
app.use(VueCookies, {
  expireTimes: '1d',
  path: '/',
  secure: true
});
// add profile API
app.provide("$profileAPI", ProfileAPI);
// add event emitter
app.provide("$emitter", emitter);
// mount the app
app.mount("#app");
