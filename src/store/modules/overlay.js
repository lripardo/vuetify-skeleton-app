const state = {
    overlay: false
};

const getters = {};

const actions = {
    setOverlay({commit}, overlay) {
        commit('SET_OVERLAY', overlay);
    }
};

const mutations = {
    SET_OVERLAY(state, overlay) {
        state.overlay = overlay;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
