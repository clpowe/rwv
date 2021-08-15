import { createStore } from 'vuex';

export const store = createStore({
    state: {
        user: 'Adam Jahr',
        events: []
    },
    mutations: {
        ADD_EVENT(state,event){
            state.events.push(event)
        }
    },
    actions: {},
    modules: {}
})