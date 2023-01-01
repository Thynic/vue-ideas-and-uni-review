<template>
<v-container class="text-center">

  <Multiselect
      v-model="value"
      placeholder="Üniversite seçiniz.."
      :filter-results="true"
      :min-chars="1"
      :resolve-on-load="false"
      :searchable="true"
      :options="uniList"
  />

  <div id="uni-stats"
    :style="{display: display ? '' : 'none' }"
  >
    <div id="uni-card"
      class="d-flex align-center flex-column"
    >
      <v-card
        elevation="8"
        width="700"
      >
        
        <v-card-title>
          <v-img
            class="align-center"
            large
            left
            :src="uniLogo"
            max-height="200px"
          >
          </v-img>
          <span class="text-h6 font-weight-light">{{selected.name}}</span>
        </v-card-title>
        <v-card-subtitle>
          <strong>{{selected.city}}</strong>, {{selected.type}}
        </v-card-subtitle>

        <v-divider></v-divider>

    <v-card
    class="d-flex align-center flex-column"
    >
    <v-tabs
      v-model="tab"
      fixed-tabs
      
    >
      <v-tab
        v-for="review in reviews"
        :key="review"
        :value="review.name"
        color="primary"
      >
        {{review.name}}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <div
          v-for="review in reviews"
          :key="review"
          
        >
          <v-window-item
          :value="review.name"
          >

          <v-expansion-panels focused multiple>

            <v-expansion-panel
              v-for="subCtg in review.subCtgs"
              :key="subCtg.name"
            >
              <v-expansion-panel-title>
                <span>
                  {{subCtg.name}}
                </span>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-rating
                  v-model="subCtg.rating"
                  background-color="red lighten-3"
                  color="red"
                  half-icon="mdi-star-half-full"
                  x-large
                >
                </v-rating>

                <div>
                  <v-btn
                    @click="setVoted(review, subCtg)"
                  >
                    Gönder
                  </v-btn>
                </div>

              </v-expansion-panel-text>

            </v-expansion-panel>
            </v-expansion-panels>
          </v-window-item>
        </div> 
        

      </v-window>
    </v-card-text>
  </v-card>
    </v-card>
  </div>
  </div>
  
 </v-container>
</template>

<script>
  import Multiselect from '@vueform/multiselect'
  import { mapActions, mapState, mapMutations } from 'vuex'


  export default {
    created() {
        this.getUnis().then((response) => {
          this.uniList = response
        }),
        this.getReviews().then((response) => {
          this.reviews = response
        })
    },
    components: {
      Multiselect,
    },
    methods: {
      ...mapMutations(['setMultiValue', 'setVoteData']),
      ...mapActions(['getUniData', 'getUnis', 'getReviews', 'vote']),
      setVoted(review, subCtg) {
          this.votedRating.name = review.name,
          this.votedRating.subCtg = subCtg
          this.votedRating.subCtg.percentage = subCtg.rating * 20
          this.votedRating.uniName = this.selected.name

        this.setVoteData({
          value: this.votedRating
        })

        this.vote()

        console.log(this.votedRating)
      }
    },
    computed: {
      ...mapState(['multiselectValue', 'voteData'])
    }, 
    data() {
      return {
        value: null,
        uniList: [],
        selected: [],
        display: false,
        show: false,
        reviews: [],
        reviewCtgs: [],
        uniLogo: '',
        tab: null,
        subTab: null,
        votedRating: {

        },

        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    watch: {

      // first we will select a university
      // and we will send it as a parameter to the backend
      // and the backend will search the database for that university
      // to send the stats of that uni

      async value() {
          this.display = true
          if (this.value == null)
            this.display = false

          if (this.value != null)
            this.setMultiValue({
              value: this.value
            })

          this.getUniData().then((response) => {
            this.selected = response
            if (response.logo)
              this.uniLogo = response.logo
            else
              this.uniLogo = ''
          })
      }
    }
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
  .multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;;
  }

  .text-center {
    height: 1000px
  }

  #uni-stats {
    margin-top: 3%;
  }

  #uni-card {
    height: 1000px;
  }

</style>