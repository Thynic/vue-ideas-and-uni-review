import axios from 'axios'
import router from '../../../router'

export default {
    state: {
        form: {
            
        },
        ideas: [],
    },
    mutations: {
        setForm(state, { key, value }) {
            state.form[key] = value 
        },
        setIdeas(state, ideas) {
            state.ideas = ideas
        },
        setIdea(state, updatedIdea) {
            Object.assign( //find it and change it to below defined value
                state.ideas.find(idea => idea.id == updatedIdea.id),
                updatedIdea
            )
        },
        deleteIdea(state, deletedIdea) {
            state.ideas = state.ideas.filter(idea => idea.id !== deletedIdea.id)
        },
    },
    actions: {
        async createIdea(context) {

            await axios.post(
                'ideas',
                context.state.form,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            router.push('/ideas')
            
        },
        async getIdeas(context) {
            await axios.get(
                'ideas', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then((response) => {
                if (!response.error) {
                    context.commit('setIdeas', response.data)
                } 
            })
        },
        async upVoteIdea(context, idea) {
            const { data: updatedIdea } = await axios.patch(
                `ideas/${idea.id}/vote`
            )
            context.commit('setIdea', updatedIdea)
        },
        async downVoteIdea(context, idea) {
            const { data: updatedIdea } = await axios.delete(
                `ideas/${idea.id}/vote`
            )
            context.commit('setIdea', updatedIdea)
        },
        async delIdea (context, idea) {
            const { data: deletedIdea} = await axios.delete(`ideas/${idea.id}`)
            context.commit('deleteIdea', deletedIdea)
        },
    }
}