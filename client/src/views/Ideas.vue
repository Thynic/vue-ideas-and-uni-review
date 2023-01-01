<template>
<div>

    <v-card>
        <v-card-actions>
            <v-chip
                text
            >
                {{username}}
        </v-chip>

        <v-spacer></v-spacer>

        <router-link to="/">
            <v-btn
                class="white--text"
                color="red"
                depressed
                @click="logout()"
            >
                Logout
            </v-btn>
        </router-link>
        </v-card-actions>
    </v-card>

        <v-divider></v-divider>

        <div v-for="idea in ideas.ideas" :key="idea.id">
            <v-container>
            <v-card
                :loading="loading"
                class="mx-auto"
                max-width="374"
                elevation="5"
            >

                <v-card-title>{{ idea.idea }}</v-card-title>
                <v-divider class="mx-4"></v-divider>
                
                <!-- <button @click="delIdea(idea)" :style="{background: 'red'}">X</button> -->

                <v-card-text>
                    <v-chip-group
                    v-model="selection"
                    active-class="deep-purple accent-4 white--text"
                    column
                    >
                    <v-chip @click="upVoteIdea(idea)">Upvote</v-chip>
                    <div class="ml-4 mr-4">{{idea.votes}}</div>
                    <v-chip @click="downVoteIdea(idea)">Downvote</v-chip>
            
                    </v-chip-group>
                </v-card-text>

            
                <v-card-actions>
                    <v-btn
                    color="red"
                    text
                    @click="delIdea(idea)"
                    >
                    Delete
                    </v-btn>
                </v-card-actions>

                

            </v-card>
            </v-container>
        </div>

        <div class="text-center">
            <router-link to="/create-idea">
                <v-btn
                class="mx-2"
                fab
                color="indigo"
                rounded
                >
                    <v-icon>
                    mdi-plus
                    </v-icon>
                    
                </v-btn>
            </router-link>
        </div>



        

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Home',
    created() {
        this.getIdeas()
    },
    components: {
        
    },
    methods: {
        ...mapActions(['getIdeas', 'upVoteIdea', 'delIdea', 'downVoteIdea', 'verifyToken', 'logout'])
    },
    computed: {
        ...mapState(['ideas']),
        ...mapState(['username'])
    }
}
</script>

<style scoped>

#add {
    max-width: 500px;
}

</style>
