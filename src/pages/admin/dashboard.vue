<template>
  <q-page padding>
    <q-toolbar>
      <q-btn
        rounded
        class="text-primary text-weight-bolder text-h6"
        no-caps
        :label="$route.meta.title"
        flat
      />
    </q-toolbar>
    <div class="row flex flex-center ">
      <q-card flat  class="card-form col-md-4 q-pa-lg">
        <q-form @submit.prevent="submit" class="col-md-4 q-pa-xl q-gutter-y-lg">
          <!--first name-->
          <div class="col-md-5 card-input">
            <q-input label="First name"   type="text"   color="grey" v-model="form.firstName"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--lastName          -->
          <div class="col-md-5 card-input">
            <q-input label="Last name"   type="text"   color="grey" v-model="form.lastName"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--          Gender-->
          <div class="col-md-5 card-input">
            <q-select      label="Gender"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="form.gender" :options="gender" >
              <template v-slot:prepend>
                <q-icon name="wc" />
              </template>
            </q-select>
          </div>
          <!--        Nationality-->
          <div class="col-md-5  card-input ">
            <q-select
              borderless
              use-input
              input-debounce="0"
              @filter="filterFn"
              label="Nationality"
              behavior="menu" transition-show="jump-up" transition-hide="jump-up"
              options-selected-class="text-positive"
              v-model="form.nationality"
              :options="countries"
              popup-content-style="border-radius: 12px; margin-top: 10px;"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section avatar>
                    <q-avatar  >
                      <img :src="scope.opt.flag">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label.common" />
                  </q-item-section>

                </q-item>
              </template>
              <template v-slot:selected-item="scope">
                <q-chip

                  color="white"
                  text-color="grey-white"
                  class="q-ma-none "
                >

                  <q-avatar   >
                    <img :src="scope.opt.flag">
                  </q-avatar>
                  {{ scope.opt.label.common }}
                </q-chip>
                <q-item>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon  name="language"  />
              </template>
            </q-select>
          </div>
          <!--state/Region-->
          <div class="col-md-5 card-input">
            <q-input label="State/Region"   type="text"   color="grey" v-model="form.state"   >
              <template  v-slot:prepend>
                <q-icon name="home_work" />
              </template>
            </q-input>
          </div>
          <!--        Local Goverment area-->
          <div class="col-md-5 card-input">
            <q-input label="Local Goverment Area"   type="text"   color="grey" v-model="form.lga"   >
              <template  v-slot:prepend>
                <q-icon name="home" />
              </template>
            </q-input>
          </div>
          <div class="col-md-5 row justify-center text-primary">
            <q-btn @click="deviceInput = ! deviceInput" unelevated icon="laptop_windows" label="Device" stack   />
            <q-btn unelevated icon="link" label="Link" stack   />
            <q-btn unelevated icon="camera" label="Camera" stack   />
          </div>
          <div v-if="deviceInput == true" class="q-pl-md q-pr-md card-input">
            <q-file
              @input="onFilePicked(model)"
              @clear="loadDefaultImage"
              v-model="model"
              label="Upload Image"
            >
              <template  v-slot:before>
                <q-btn @click="dialog.previewImage =! dialog.previewImage" flat fab-mini>
                  <q-avatar >
                    <img
                      :src="imgUploaded ? imgUploaded : 'https://cdn.quasar.dev/img/avatar.png'"
                    >
                  </q-avatar>
                </q-btn>

              </template>
              <template v-slot:append>
                <q-btn round dense flat icon="cancel" @click="loadDefaultImage" />
              </template>
            </q-file>
          </div>

          <q-card-actions align="center" class="q-gutter-y-sm">
            <q-btn
              @click="submit"
              style="
background: rgb(42,54,86);
backdrop-filter: blur(20px);border-radius: 12px;
 border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;"
              unelevated
              padding="xs lg"
              text-color="accent"
              :loading="loading"
              type="submit"
              no-caps
              size="md"
              class=" q-pt-xs q-pb-xs q-pt-sm q-pb-sm text-info btn-primary q-pl-xl q-pr-xl"
            >Submit
              <template v-slot:loading>
                <q-spinner-facebook class="on-left" />
                Sending ...
              </template>
            </q-btn>
          </q-card-actions>

        </q-form>

      </q-card>

    </div>

    <!--  Preview image-->
    <q-dialog v-model="dialog.previewImage" position="bottom">
      <q-card class="bg-white menu q-ma-xs" style="width: 350px">
        <q-img
          :src="imgUploaded ? imgUploaded : 'https://cdn.quasar.dev/img/avatar.png'"
        >

        </q-img>

      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
let stringOptions = [ ]
import axios from "axios";

export default {
  data: () => ({
    dialog: {
      previewImage: false
    },
    imgUploaded: '',
    model: null,
    deviceInput: null,
    linkInput: null,
    options :stringOptions,
    form:{
      imgUploaded: '',
    },
    countries: [],
    gender: ["Male", "Female"],
    loading: false,
  }),
  mounted() {
    this.getCountries();
  },
  methods: {
    loadDefaultImage () {
      this.imgUploaded = ''
      this.model = null
      // remove all content docs from vuex store
      this.$store.commit("resetStore");
      localStorage.removeItem('file')
    },
    getImage () {
      this.imgUploaded = localStorage.getItem('file')
      // return localStorage.getItem('file')
    },

    // get uploaded file from the file picker and save it as base64 on local storage
    onFilePicked (file) {
      this.$store.commit("addToDocs", file);
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        localStorage.setItem('file', reader.result)
        this.getImage()
      }

    },

    // filter the countries array on the basis of the input value
    filterFn(val, update) {
      console.log(val);
      if (val === '') {
        update(() => {
          this.countries = stringOptions

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase();
        this.countries = stringOptions.filter((v) => v.label.common.toLowerCase().indexOf(needle) > -1)
        // this.countries.filter((v) => v.label.common.toLowerCase().indexOf(needle) > -1)
      })
    },
    // get list of countries object with flag from the api and save it to the countries array
    getCountries() {
      this.loading = true;
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          this.countries = response.data.map((country) => {
            return {
              label: country.name,
              value: country.name,
              alt: country.flags.alt,
              flag: country.flags.svg,
            };
          });
          stringOptions = this.countries
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    // get the object of form open and array and save it to localStorage
    submit(){
      this.form.imgUploaded = this.imgUploaded
      localStorage.setItem('form', JSON.stringify(this.form))

      //   if form has been stored in localStorage
      if(localStorage.getItem('form')){
        //   notify the user that the form has been saved
        setTimeout(() => {
          this.$q.notify({
            progress: true,
            position: 'bottom-right',
            message: 'Form have been submitted Successfully.',
            icon: 'task_alt',
            color: 'dark',
            textColor: 'white'
          })
        }, 500)
      }
      else {
        //   notify the user that the form has not been saved
        setTimeout(() => {
          this.$q.notify({
            progress: true,
            position: 'bottom-right',
            message: 'Form have not been submitted.',
            icon: 'task_alt',
            color: 'negative',
            textColor: 'white'
          })
        }, 500)
      }
    }

  },
};
</script>

<style>
.card-form{
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);

}
.card-input{
  padding-left: 16px;
  padding-right: 16px;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  /*backdrop-filter: blur(10px);*/
  border-radius: 8px;
}
.login-btn{
  background: #4461F2;
  box-shadow: 0px 12px 21px 4px rgba(68, 97, 242, 0.15);
  border-radius: 10px;

}
</style>

<style scoped>

</style>
