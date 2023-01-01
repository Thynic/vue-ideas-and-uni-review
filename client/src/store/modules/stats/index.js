import axios from 'axios'

export default {
    state: {
        multiselectValue: '',
        voteData: {}
    },
    mutations: {
        setMultiValue(state, value) {
            state.multiselectValue = value
        },
        setVoteData(state, value) {
            state.voteData = value
        }
    },
    actions: {
        async getUnis(context) {
            let options
            await axios.get('trUniData').then((response) => { //todo universities api
                options = response.data
            })
            return options
        },
        async getUniData(context) {
            let res
            const value = context.state.multiselectValue.value
            if (value) {
                await axios.get(
                    `trUniData/${value}`
                ).then((response) => {
                    res = response.data
                })
            }

            return res
             
        },
        async getReviews(context) {
            let reviews
            await axios.get('reviews').then((response) => {
                reviews = response.data
            })

            return reviews
        },

        //vote

        async vote(context) {
            const value = context.state.voteData.value.uniName
            console.log(value)
            await axios.post(
                `vote/${value}`,
                context.state.voteData
            )
        }
    }
}