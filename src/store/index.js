import Vue from 'vue';
import Vuex from 'vuex';
import alert from '@/store/modules/alert';
import confirmation from '@/store/modules/confirmation';
import config from '@/store/modules/config';
import handlers from '@/store/modules/handlers';
import overlay from '@/store/modules/overlay';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        alert,
        confirmation,
        config,
        handlers,
        overlay
    },
    strict: debug
});
