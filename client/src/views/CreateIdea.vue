<template>
    <div class="submit-idea">
        <h1 font-size="16px">Submit an Idea</h1>
        <v-container>
        <v-form @submit="_submitIdea">
            <v-textarea
            @change="_setForm"
            required
            clearable
            clear-icon="mdi-close-circle"
            ></v-textarea>
            <v-btn type="submit">Submit</v-btn>
        </v-form>
        </v-container>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    methods: {
        ...mapMutations(['setForm']),
        ...mapActions(['createIdea']),
        _setForm(event) { 
            this.setForm({ //refers to the mapMutation above
                key: 'idea',
                value: event.target.value
            }) 
        },
        _submitIdea(event) {
            event.preventDefault()
            this.createIdea()
        }
    }
}
</script>

<style scoped>
textarea {
    width: 400px;
    height: 200px;
    font-size: 24px;
}
</style>