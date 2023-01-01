<template>
<div id="app">
  <v-app id="inspire">
    <v-card
      elevation="9"
    >
      <!-- <v-system-bar color="#90CAF9"></v-system-bar> -->
  
      <v-app-bar
        color="#1E88E5"
        dark
        prominent
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn> -->
  
        <v-toolbar-title>{{title.title}}</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        

      </v-app-bar>
  


      <v-card-text>
          <v-main>
            <router-view/>
          </v-main>
      </v-card-text>

    </v-card>
  </v-app>
</div>



</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  created() {
    this.setTitle({
      title: 'Idea App'
    })
  },
  methods: {
    ...mapMutations(['setTitle']),
  },
  computed: {
    ...mapState(['title']),
  },
  data: () => ({

  })
}
</script>

<style scoped>


</style>
