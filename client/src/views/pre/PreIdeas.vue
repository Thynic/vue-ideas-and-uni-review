<template>

<div>

    <div v-if="auth">
        <Ideas/>
    </div>

    <div v-else>
        <IdeasForbidden/>
    </div>

</div>



</template>

<script>
import { mapActions, mapState } from 'vuex'
import Ideas from '../Ideas.vue'
import IdeasForbidden from '../IdeasForbidden.vue'


export default {
    name: 'PreIdeas',
    components: {
        Ideas,
        IdeasForbidden
    },  
    created() {
        this.verifyToken()
    },
    methods: {
        ...mapActions(['verifyToken'])
    },
    computed: {
        ...mapState(['auth'])
    },
    data: () => ({
    })
}

</script>