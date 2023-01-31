import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

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
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

console.log(faGithub)

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
  faPaperclip
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
// mount the app
app.mount("#app");
