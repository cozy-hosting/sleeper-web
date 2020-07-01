import {UserInterface} from "@/interfaces/UserInterface";

export const userModule = {
    state: {
    },
    mutations: {
        SET_USER (state: { user: UserInterface; }, token: Record<string, any>) {
            state.user = {
                id: token.id,
                name: token.name,
                email: token.email
            };
        }
    },
    getters: {
        user (state: { user: UserInterface; }) {
            return state.user;
        }
    },
    actions: {},
};
