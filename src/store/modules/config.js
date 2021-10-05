const state = {
    user: null,
    expires: null,
    config: null
};

const getters = {};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_EXPIRES(state, expires) {
        state.expires = expires;
    },
    SET_CONFIG(state, config) {
        state.config = config;
    },
    SET_HAS_TO_CHANGE_PASSWORD(state, hasToChangePassword) {
        state.user.has_to_change_password = hasToChangePassword;
    }
};

const actions = {
    setConfig({commit}, config) {
        commit('SET_USER', config.user);
        commit('SET_EXPIRES', config.expires);
        commit('SET_CONFIG', config.config);
    },
    setHasToChangePassword({commit}, hasToChangePassword) {
        commit('SET_HAS_TO_CHANGE_PASSWORD', hasToChangePassword);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
