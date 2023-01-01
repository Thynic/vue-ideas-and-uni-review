import { createStore } from 'vuex'
import axios from 'axios'
import userModule from './modules/user/index'
import ideasModule from './modules/ideas/index'
import statsModule from './modules/stats/index'

// Create a new store instance.
const store = createStore({
    modules: {
        user: userModule,
        ideas: ideasModule,
        stats: statsModule
    },
    state: {
        title: '',
        username: '',
        auth: false
    },
    mutations: {
        setTitle(state, title) {
            state.title = title
        },
        setCurrentUser (state, username) {
            state.username = username
        },
        setAuth (state, auth) {
            state.auth = auth
        }
    },
    actions: {
        async verifyToken(context) {
            let status
            let username
            await axios.get(
                'verify', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then((response) => {
                status = response.data.message
                if(status != 'unauthorized')
                    context.commit('setAuth', true)
                else
                    context.commit('setAuth', false)

                if (response.data.username) {
                    username = response.data.username
                    context.commit('setCurrentUser', response.data.username)
                } 

            })
            return {status, username}
        },

    },
})

export default store
