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
        max-width="400"
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

        <v-expansion-panels focused class="align-center">
          <v-expansion-panel
            v-for="categorie in reviews"
            :key="categorie.name"
          >
            <v-expansion-panel-title>
              <span>
                {{categorie.name}}
              </span>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-rating
                v-model="categorie.rating"
                background-color="red lighten-3"
                color="primary"
                half-icon="mdi-star-half-full"
                half-increments
                readonly
                x-large
              ></v-rating>
                <div>
                  <span class="font-weight-bold">
                    % {{ categorie.percentage }}
                    <br>
                    <span class="caption text-uppercase">{{categorie.total}} oylama</span>
                    <br>
                  </span>
                </div>
                
              

              <v-expansion-panels focused multiple>

                <v-expansion-panel
                  v-for="subCtg in categorie.subCtgs"
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
                      half-increments
                      readonly
                      x-large
                    >
                    </v-rating>

                    <div>
                      <span class="font-weight-bold">
                        % {{ subCtg.percentage }}
                        <br>
                      <span class="caption text-uppercase">{{subCtg.total}} oylama</span>
                      <br>
                      </span>
                    </div>

                  </v-expansion-panel-text>

                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-text>

          </v-expansion-panel>
        </v-expansion-panels>


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
      ...mapMutations(['setMultiValue']),
      ...mapActions(['getUniData', 'getUnis', 'getReviews']),
    },
    computed: {
      ...mapState(['multiselectValue'])
    }, 
    data() {
      return {
        value: null,
        uniList: [],
        selected: [],
        display: false,
        show: false,
        reviews: [],
        uniLogo: ''
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

            console.log(this.value)

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
            
            response.reviews.forEach((review) => {
              if(review != null) {
                this.reviews.forEach((categorie, ctgIndex) => {
                  if (review.name == categorie.name) {
                    this.reviews[ctgIndex] = review

                    this.reviews[ctgIndex].subCtgs.forEach((subCtg) => {
                      subCtg.percentage = Number.parseFloat(subCtg.percentage).toFixed(2)
                      subCtg.rating = Number.parseFloat(subCtg.rating).toFixed(2)
                    })

                    this.reviews[ctgIndex].percentage = Number.parseFloat(this.reviews[ctgIndex].percentage).toFixed(2)
                    this.reviews[ctgIndex].rating = Number.parseFloat(this.reviews[ctgIndex].rating).toFixed(2)

                }
                    
                })
              }
            })

            console.log('new reviews: ', this.reviews)
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

</style>