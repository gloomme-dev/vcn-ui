<template>
  <q-page padding>
    <q-toolbar>
      <q-btn
        rounded
        class="text-primary text-weight-bolder text-h6"
        no-caps
        label="Training Program"
        flat
      />
      <q-btn rounded flat icon="chevron_right" no-caps />
      <q-btn
        class="text-secondary"
        rounded
        no-caps
        :label="$route.meta.title"
        flat
      />
    </q-toolbar>
    <div class="row flex flex-center column ">
      <div class="col-md-11 column row justify-center text-primary">
        <div>
          <q-btn @click="deviceInput = ! deviceInput" unelevated icon="laptop_windows" label="Device" stack   >
            <q-menu persistent class="bg-transparent" anchor="top end" self="top start">
              <q-card style="width: 540px; border-radius: 13px" >
                <q-toolbar class="bg-transparent text-grey  ">
                  <q-btn
                    rounded
                    no-caps
                    label="Device"
                    flat
                    icon="laptop_windows"
                  />
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-toolbar>
                  <div  class="q-pl-md q-pr-md card-input">
                  <q-file
                    @input="onFilePicked(model)"
                    @clear="loadDefaultImage"
                    v-model="model"
                    label="Pick a file from device"
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
                <q-card-actions align="center">
                  <q-btn   v-close-popup class="q-mt-sm q-mb-sm q-pl-sm q-pr-sm" unelevated no-caps  color="primary"  label="Load">
                    <q-tooltip>Load</q-tooltip>
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>

          </q-btn>
          <q-btn unelevated icon="link" label="Link" stack   >
            <q-menu persistent class="bg-transparent" anchor="top end" self="top start">
              <q-card style="width: 540px; border-radius: 13px" >
                <q-toolbar class="bg-transparent text-grey  ">
                  <q-btn
                    rounded
                    no-caps
                    label="Link"
                    flat
                    icon="link"
                  />
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-toolbar>
                <q-card-section  class="row items-center q-pb-none q-pa-md q-mt-xs " >
                  <q-input
                    input-class="q-pa-sm"
                    outlined
                    label="Paste the link here"
                    stack-label
                    class="col"
                  />
                </q-card-section>

                <q-card-actions align="center">
                  <q-btn   v-close-popup class="q-mt-sm q-mb-sm q-pl-sm q-pr-sm" unelevated no-caps  color="primary"  label="Save">
                    <q-tooltip>Load</q-tooltip>
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
          <q-btn unelevated icon="camera" label="Camera" stack   />
        </div>
        <div>
        </div>

      </div>
      <q-card flat  class=" row col-md-12 q-pa-lg justify-center q-gutter-x-lg  ">
        <q-card  bordered style="min-height: 300px; height: 300px; border: 4px solid #ff9800;"  class="wrap self-center card-form  col-md-4 text-center">
          <img
            :src="imgUploaded ? imgUploaded : 'https://cdn.quasar.dev/img/mountains.jpg'"
          >

          <q-card-section>
            <div class="text-h6"><q-btn no-caps unelevated rounded class="text-white" icon="attach_file" color="orange">Picked image</q-btn></div>
          </q-card-section>
        </q-card>
        <q-card bordered style="min-height: 300px; height: 300px; border: 4px solid #07964A;" class="self-center card-form col-md-4 text-center">
          <q-img

            :src="localImg ? localImg : 'https://cdn.quasar.dev/img/mountains.jpg'"
          >
            <div v-if="verification.status ===true && verification.value === true " class="absolute-full text-subtitle2 flex flex-center">
              <q-btn  unelevated icon="task_alt" class=" bg-transparent"  label="100%" /> <br />
              <span>High Confidence</span>
            </div>
            <div v-else-if="verification.status ===true && verification.value === false" class="absolute-full text-subtitle2 flex flex-center">
              <q-btn  unelevated icon="cancel" class=" bg-transparent"  label="not found" /> <br />
              <span>Pictures do not match </span>
            </div>
            <div v-else-if="verification.status ===false && verification.value === false" class="absolute-full text-subtitle2 flex flex-center">
<!--              <q-btn  unelevated icon="cancel" class=" bg-transparent"  label="not found" /> <br />-->
              <span>Result will appear here </span>
            </div>
          </q-img>

          <q-card-section>
            <div class="text-h6"><q-btn no-caps unelevated rounded class="text-white" icon="policy" color="positive">Picked image</q-btn></div>
          </q-card-section>

        </q-card>

         <q-card-actions  align="center" class="relative-position col-md-11 q-mt-xl q-gutter-y-xl">
            <q-btn
              @click="verify"
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
            >Verfiy
              <template v-slot:loading>
                <q-spinner-facebook class="on-left" />
                Analysing ...
              </template>
            </q-btn>
          </q-card-actions>



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
    localImg: '',
    verification: {
      value: false,
      status: false
    },
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

    // get the image from localStorage item form
       verify(){
    //     get the image data from local storage form
      const localdb = localStorage.getItem('form')

         if(localdb != null){
           const data = JSON.parse(localdb)
           const localImg = data.imgUploaded
           console.log("this.imgUploaded", this.imgUploaded)
           console.log("localImg", localImg)

           //      check if the localImg is the same as the image uploaded  if the same then set verification status to true else set verification status to false
           if (localImg == this.imgUploaded) {
             this.verification.status = true
             this.verification.value = true
             this.localImg = localImg
           }else{
             this.verification.status = false
             this.verification.value = false
           }
         }
         else {
         //   notify no image uploaded
           this.$q.notify({
             message: 'No images  in the database',
             color: 'negative',
             position: 'top',
             timeout: 2000
           })

         }





    },

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
      //   clear form
      this.form = {}
      this.imgUploaded = ''
      this.model = null
      // remove all content docs from vuex store
      this.$store.commit("resetStore");
      localStorage.removeItem('file')

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
