const state = {
    user: null,
    expires: null,
    config: null
};

const getters = {};

const mutations = {
    SET_USER(state, {id, name, role, email}) {
        if (!state.user) {
            state.user = {
                id: id,
                name: name,
                role: role,
                email: email
            }
        } else {
            if (id !== undefined) {
                state.user.id = id;
            }
            if (name !== undefined) {
                state.user.name = name;
            }
            if (role !== undefined) {
                state.user.role = role;
            }
            if (email !== undefined) {
                state.user.email = email;
            }
        }
    },
    SET_EXPIRES(state, expires) {
        state.expires = expires;
    },
    SET_CONFIG(state, config) {
        state.config = config;
    }
};

const actions = {
    setConfig({commit}, config) {
        commit('SET_USER', config.user);
        commit('SET_EXPIRES', config.expires);
        commit('SET_CONFIG', config.config);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
