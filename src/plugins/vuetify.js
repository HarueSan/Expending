import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css' 

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
    
    theme : {
      themes : {
        light : {
          fire_enginered : '#C5001A',
          light_gray : '#E4E3DB',
          denim : '#113743',
          concreat : '#C5BEBA'
        }
      }
    }

});
