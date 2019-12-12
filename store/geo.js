export const state = () => ({
  position: {}
});

export const mutations = {
	setPosition (state, val) {
		state.position = val;
	}
}

export const actions = {
	setPosition ({ commit }, position) {
    console.log('here', position)
		commit('setPosition', position);
	}
}
