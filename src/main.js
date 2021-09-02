import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

Array.prototype.save = function (item) {
    const index = this.findIndex(i => i.id === item.id);
    if (index !== -1) {
        this.splice(index, 1, item);
    } else {
        this.push(item);
    }
};

Array.prototype.remove = function (item) {
    const index = this.findIndex(i => i.id === item.id);
    if (index !== -1) {
        this.splice(index, 1);
    }
};

Array.prototype.newId = function () {
    return this.reduce(function (a, b) {
        return Math.max(a, b.id);
    }, 0) + 1;
};

Array.prototype.last = function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
    return null;
};

Array.prototype.findId = function (id) {
    if (this.length > 0 && id) {
        const itemFounded = this.find(item => item.id === id);
        if (itemFounded) {
            return itemFounded;
        }
    }
    return null;
};

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
