<template>

<div>

    <div v-if="auth">
        <CreateIdea/>
    </div>

    <div v-else>
        <IdeasForbidden/>
    </div>

</div>



</template>

<script>
import { mapState, mapActions } from 'vuex'
import CreateIdea from '../CreateIdea.vue'
import IdeasForbidden from '../IdeasForbidden.vue'


export default {
    name: 'PreIdeas',
    components: {
        CreateIdea,
        IdeasForbidden
    },  
    created() {
        this.verifyToken().then((response) => {
            if (response.status != 'unauthorized')
                this.auth = true
        })
    },
    methods: {
        ...mapActions(['verifyToken']),
    },
    computed: {
    },
    data: () => ({
        auth: false,
    })
}

</script>