import Vue from 'vue';

import AppComponent from './App/index.vue';

new Vue({
  el: '#app',
  components: {
    app: AppComponent,
  },
  render: (h) => h('app'),
});
