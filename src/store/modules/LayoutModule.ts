export const layoutModule = {
    state: {
        layout: "application-layout"
    },
    mutations: {
        SET_LAYOUT (state: { layout: string; }, payload: any) {
            state.layout = payload;
        }
    },
    getters: {
        layout (state: { layout: string; }) {
            return state.layout;
        }
    },
    actions: {},
};
