import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from '@/store';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { IonicVue } from '@ionic/vue';

import VueSvgInlinePlugin from "vue-svg-inline-plugin";

library.add(fas);

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
// module.exports = {
//   chainWebpack: (config) => {
//     const svgRule = config.module.rule('svg');

//     svgRule.uses.clear();

//     svgRule
//       .use('vue-loader')
//       .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
//       .end()
//       .use('vue-svg-loader')
//       .loader('vue-svg-loader');
//   },
// };

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .component('FontAwesome', FontAwesomeIcon)
  .use(store)
  .use(VueSvgInlinePlugin, {
    attributes: {
      data: [ "src" ],
      remove: [ "alt" ]
    }
  })
  
router.isReady().then(() => {
  app.mount('#app');
});