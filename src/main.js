import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlay);
library.add(faPause);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

