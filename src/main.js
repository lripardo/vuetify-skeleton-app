import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

function getItemIndex(array, item) {
    if (item && item.id) {
        const itemsWithSameId = array.filter(i => i.id === item.id);
        if (itemsWithSameId.length > 0) {
            const index = array.indexOf(itemsWithSameId[0]);
            if (index !== -1) {
                return index;
            }
        }
    }
    return null;
}

Array.prototype.replace = function (item) {
    const index = getItemIndex(this, item);
    if (index !== null) {
        this.splice(index, 1, item);
    }
};

Array.prototype.remove = function (item) {
    const index = getItemIndex(this, item);
    if (index !== null) {
        this.splice(index, 1);
    }
};

Array.prototype.getId = function () {
    if (this.length > 0) {
        return this[this.length - 1].id + 1;
    } else {
        return 1;
    }
};

Array.prototype.last = function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
    return null;
};

Array.prototype.getById = function (id) {
    if (this.length > 0 && id) {
        const itemsWithSameId = this.filter(item => item.id === id);
        if (itemsWithSameId.length > 0) {
            return itemsWithSameId[0];
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
