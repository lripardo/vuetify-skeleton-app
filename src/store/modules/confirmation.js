const DEFAULT_SHOW = false;
const DEFAULT_TITLE = '';
const DEFAULT_TEXT = '';
const DEFAULT_ACTION = () => {
};

const state = {
    show: DEFAULT_SHOW,
    title: DEFAULT_TITLE,
    text: DEFAULT_TEXT,
    action: DEFAULT_ACTION
};

const getters = {};

const actions = {
    executeYesConfirmation({state, dispatch}) {
        try {
            if (state.action) {
                state.action();
            }
        } catch (e) {
            //
        }
        dispatch('closeConfirmation');
    },
    showConfirmation({commit}, {title, text, action}) {
        title = title === undefined ? DEFAULT_TITLE : title;
        text = text === undefined ? DEFAULT_TEXT : text;
        action = action === undefined ? DEFAULT_ACTION : action;
        commit('SET_CONFIRMATION', {show: true, title, text, action});
    },
    closeConfirmation({commit}) {
        commit('SET_CONFIRMATION', {show: false, title: DEFAULT_TITLE, text: DEFAULT_TEXT, action: DEFAULT_ACTION});
    },
    setShowConfirmation({commit}, show) {
        commit('SET_SHOW', show);
    }
};

const mutations = {
    SET_SHOW(state, show) {
        state.show = show;
    },
    SET_CONFIRMATION(state, {show, title, text, action}) {
        state.show = show;
        state.title = title;
        state.text = text;
        state.action = action;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
