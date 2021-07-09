const DEFAULT_SHOW = false;
const DEFAULT_MESSAGE = '';
const DEFAULT_TIMEOUT = 6000;
const DEFAULT_COLOR = 'error';

const state = {
    show: DEFAULT_SHOW,
    message: DEFAULT_MESSAGE,
    timeout: DEFAULT_TIMEOUT,
    color: DEFAULT_COLOR
};

const getters = {};

const actions = {
    showAlert({commit}, {message, timeout, color}) {
        message = message === undefined ? DEFAULT_MESSAGE : message;
        timeout = timeout === undefined ? DEFAULT_TIMEOUT : timeout;
        color = color === undefined ? DEFAULT_COLOR : color;
        commit('SET_ALERT', {show: true, message, timeout, color});
    },
    closeAlert({commit}) {
        commit('SET_ALERT', {show: false, message: DEFAULT_MESSAGE, timeout: DEFAULT_TIMEOUT, color: DEFAULT_COLOR});
    },
    setShowAlert({commit}, show) {
        commit('SET_SHOW_ALERT', show);
    }
};

const mutations = {
    SET_SHOW_ALERT(state, show) {
        state.show = show;
    },
    SET_ALERT(state, {show, message, timeout, color}) {
        state.show = show;
        state.message = message;
        state.timeout = timeout;
        state.color = color;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
