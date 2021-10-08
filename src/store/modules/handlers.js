const HANDLER_ERROR = 1;
const HANDLER_UPDATE = 2;
const HANDLER_FORBIDDEN = 3;

const state = {
    handler: 0
};

const getters = {
    handlerError: (state) => {
        return state.handler === HANDLER_ERROR;
    },
    handlerUpdate: (state) => {
        return state.handler === HANDLER_UPDATE;
    },
    handlerForbidden: (state) => {
        return state.handler === HANDLER_FORBIDDEN;
    }
};

const actions = {
    setHandlerError({commit}) {
        commit('SET_HANDLER_ERROR');
    },
    setHandlerUpdate({commit}) {
        commit('SET_HANDLER_UPDATE');
    },
    setHandlerForbidden({commit}) {
        commit('SET_HANDLER_FORBIDDEN');
    }
};

const mutations = {
    SET_HANDLER_ERROR(state) {
        state.handler = HANDLER_ERROR;
    },
    SET_HANDLER_UPDATE(state) {
        state.handler = HANDLER_UPDATE;
    },
    SET_HANDLER_FORBIDDEN(state) {
        state.handler = HANDLER_FORBIDDEN;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
