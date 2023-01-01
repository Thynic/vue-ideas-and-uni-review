import axios from 'axios'
import router from '../../../router'

export default {
    state: {
        loginCreds: {
            username: '',
            password: ''
        },
        token: {
            token: ''
        },
        user: {
            username: '',
            password: ''
        },
    },
    mutations: {
        setLoginCreds(state, { username, password }) {
            state.loginCreds.username = username
            state.loginCreds.password = password
        },
        setAuthToken (state, token) {
            state.token.token = token
        },
        setUser(state, { username, password }) {
            state.user.username = username
            state.user.password = password
        },
    },
    actions: {
        async createUser(context) {
            await axios.post(
                'users',
                context.state.user
            )
        },
        async login(context) {
            let status
            await axios.post(
                'login',
                context.state.loginCreds
            ).then((response) => {
                console.log(response.data.status)
                if (response.data.status == 'login successful') {
                    context.commit('setAuthToken', response.data.token)
                    localStorage.setItem(
                        'token',
                        response.data.token
                    )
                    router.push('/ideas')
                } else  {
                    // context.commit('setLoginStatus', response.data.status)
                    status = response.data.status
                    
                }
            })
    
            return status
        },
        async logout(context) {
            //todo, delete the token from the database
            localStorage.removeItem('token')
        }
    }

}