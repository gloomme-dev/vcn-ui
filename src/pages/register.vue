<template>
  <q-page padding>
    <div class="row flex flex-center ">
        <q-stepper
          class="bg-transparent card-form col-md-6 q-pa-lg "
          flat
          :vertical=" $q.screen.lt.sm ? true : false"
          header-nav
          v-model="step"
          ref="stepper"
          color="white"
          animated
        >
          <!--        Basic details-->
          <q-step
            color="accent"
            :name="1"
            title="Biodata"
            icon="settings"
            :done="step > 1"
            class=" q-pa-md justify-center text-h5 text-grey-7 text-center "
          >
            <q-form  @submit.prevent="register"  class=" col-md-10 row q-pa-md q-gutter-y-md q-gutter-x-lg justify-center  justify-around" enctype="multipart/form-data">


<!--              select from acitivities-->
              <div class="col-md-10 ">
                <label class="text-grey text-capitalize">Register as</label>
              </div>

              <div class="col-md-11 card-input">
                <q-select
                  class="col-md-3"
                  use-chips
                  @input="getActivityRoles(activitySelect)"
                  behavior="menu"
                  v-model="activitySelect"
                  :options="activities"
                  color="accent"
                  options-selected-class="text-accent"
                >
                  <template v-slot:option="scope">
                    <q-item
                      v-bind="scope.itemProps"
                      v-on="scope.itemEvents"
                    >
                      <q-item-section>
                        <q-item-label > {{ scope.opt.activityName }}</q-item-label>
<!--                        <q-item-label caption> {{ formatNumber( scope.opt.amount) }}</q-item-label>-->
                      </q-item-section>
                    </q-item>
                    <q-separator inset />
                  </template>
                  <template v-slot:selected-item="scope">
                    <q-chip

                      square
                      color="secondary"
                      text-color="white"
                      class="q-my-none q-ml-xs q-mr-none"
                    >
                      {{ scope.opt.activityName }}
                    </q-chip>
<!--                    <q-chip-->
<!--                      v-else-->
<!--                      square-->
<!--                      color="secondary"-->
<!--                      text-color="white"-->
<!--                      class="q-my-none q-ml-xs q-mr-none"-->
<!--                    >-->
<!--                    Select Registration type-->
<!--                    </q-chip>-->

                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-italic text-grey">
                        No options slot
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>


              <!--first name-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-input label="First name"   type="text"   color="grey" v-model="form.firstName"   >
                  <template  v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <!--lastName          -->
              <div class="col-md-5 col-xs-11 card-input">
                <q-input label="Last name"   type="text"   color="grey" v-model="form.lastName"   >
                  <template  v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <!--otherName-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-input label="Other name"   type="text"   color="grey" v-model="form.otherName"   >
                  <template  v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
<!--              vcnNumber-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-input label="VCN Number"   type="text"   color="grey" v-model="form.vcnNumber"   >
                  <template  v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <!--              email-->
              <div class="col-md-11 card-input">
                <q-input label="Email"   type="email"   color="grey" v-model="form.email"   >
                  <template  v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>
<!--              Password-->
              <div class="col-md-5 col-xs-11 q-pa-md">
                <q-input
                        :rules="isPwd ? [] : [val => val.length > 5 || 'Minimum 8 characters']"
                         :type="isPwd ? 'password' : 'text'"
                         label="Password"
                         color="grey" v-model="form.password"   >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <!--                cpassword-->
              <div class="col-md-5 col-xs-11 q-pa-md">
                <q-input label="Confirm Password"
                         :type="isCpwd ? 'password' : 'text'"
                         :rules="isCpwd ? [] : [val => val === form.password || 'Password does not match']"
                         color="grey" v-model="cpassword"   >
                  <template  v-slot:prepend>
                    <q-icon name="lock_open" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isCpwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isCpwd = !isCpwd"
                    />
                  </template>
                </q-input>
              </div>
              <!--                Phone-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-input label="Phone"   type="tel"   color="grey" v-model="form.phone"   >
                  <template  v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <!--          Gender-->
              <div class="col-md-5 col-xs-11  card-input">
                <q-select      label="Gender"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="form.gender" :options="gender" >
                  <template v-slot:prepend>
                    <q-icon name="wc" />
                  </template>
                </q-select>
              </div>
              <!--        Nationality-->
                <div class="col-md-5 col-xs-11 card-input">
                  <q-input  label="Nationality"   type="text"   color="grey" v-model="form.nationality"   >
                    <template  v-slot:prepend>
                      <q-icon name="language" />
                    </template>
                  </q-input>
                </div>
              <!--              dob-->
              <div class="col-md-5 col-xs-11 card-input">
              <q-input  borderless   v-model="form.dob" label="Date of Birth">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.dob" mask="DD-MM-YYYY">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Ok"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              </div>
<!--              &lt;!&ndash;              dob&ndash;&gt;-->
<!--              <div class="col-md-5 col-xs-11 card-input">-->
<!--                <q-input standout label="Date of Birth" label-position="above"   type="date"   color="grey" v-model="form.dob"   focused>-->
<!--                  <template  v-slot:prepend>-->
<!--                    <q-icon name="date_range" />-->
<!--                  </template>-->
<!--                </q-input>-->
<!--              </div>-->
              <!--state/Region-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-select      label="State"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="form.stateOrigin" :options="states" >
                  <template v-slot:prepend>
                    <q-icon name="home_work" />
                  </template>
                </q-select>
              </div>
              <!--        Local Goverment area-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-select     label="Local Government Area"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="form.lgaOrigin" :options="lga_of_origin" >
                  <template v-slot:prepend>
                    <q-icon name="home" />
                  </template>
                </q-select>
              </div>
<!--              Address-->
              <div class="col-md-11 card-input">
                <q-input label="Address"   type="text"   color="grey" v-model="form.address"   >
                  <template  v-slot:prepend>
                    <q-icon name="home" />
                  </template>
                </q-input>
              </div>
<!--              Picture-->
              <div  class="col-md-11 q-pl-md q-pr-md card-input">
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

            </q-form>
            <q-stepper-navigation class="q-gutter-x-md">
<!--              <q-btn-->
<!--                icon="chevron_left"-->
<!--                no-caps-->
<!--                flat-->
<!--                @click="step = 1"-->
<!--                color="accent"-->
<!--                label="Back"-->
<!--                class="q-ml-sm q-pr-sm"-->
<!--              />-->
              <q-btn
                @click="step = 2"
                class="q-pl-sm q-pr-sm"
                type="submit"
                no-caps
                color="accent"
                label="Next"
              >
                 </q-btn>
            </q-stepper-navigation>
          </q-step>
          <q-step
            color="accent"
            :name="2"
            title="Qualification"
            icon="school"
            :done="step > 3"
            class=" q-pa-md justify-center text-h5 text-grey-7 text-center "
          >
            <q-form @submit.prevent="register" class="col-md-12 row q-pa-md q-gutter-y-lg q-gutter-x-lg justify-center  justify-around" enctype="multipart/form-data">
              <!--              institution-->
              <div class="col-md-11 card-input">
                <q-input label="Institution"   type="text"   color="grey" v-model="form.institution"   >
                  <template  v-slot:prepend>
                    <q-icon name="school" />
                  </template>
                </q-input>
              </div>
<!--              qualifications-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-select      label="Qualification"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="form.qualification" :options="qualifications" >
                  <template v-slot:prepend>
                    <q-icon name="school" />
                  </template>
                </q-select>
              </div>

              <!--              dateAwarded-->
              <div class="col-md-5 col-xs-11 card-input">
                <q-input  borderless   v-model="form.dateAwarded" label="Date Awarded">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.dateAwarded" mask="DD-MM-YYYY">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Ok"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

<!--&lt;!&ndash;              dateAwarded&ndash;&gt;-->
<!--              <div class="col-md-5 col-xs-11 card-input">-->
<!--                <q-input label="Date Awarded"   type="date"   color="grey" v-model="form.dateAwarded"   >-->
<!--                  <template  v-slot:prepend>-->
<!--                    <q-icon name="date_range" />-->
<!--                  </template>-->
<!--                </q-input>-->
<!--              </div>-->
<!--              <div class=" q-ml-xl text-left col-md-12 q-gutter-y-sm q-gutter-x-lg ">-->
<!--                <div class="text-subtitle2">Inclusion of additional Qualification attracts additional fee</div>-->

<!--                <q-btn @click="anotherInstitution = ! anotherInstitution" outline icon="add" no-caps unelevated label="Add another institution" >-->
<!--                  <q-tooltip>Click to add another institution</q-tooltip>-->
<!--                </q-btn>-->
<!--              </div>-->
              <div v-if="anotherInstitution ==true" class=" col-md-12 row q-gutter-y-lg q-gutter-x-lg justify-center ">
                <!--              institution-->
                <div class="col-md-10 card-input">
                  <q-input label="Institution"   type="text"   color="grey" v-model="form.institution"   >
                    <template  v-slot:prepend>
                      <q-icon name="school" />
                    </template>
                  </q-input>
                </div>
                <!--              qualifications-->
                <div class="col-md-5 col-xs-11 card-input">
                  <q-select      label="Qualification"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="form.qualification" :options="qualifications" >
                    <template v-slot:prepend>
                      <q-icon name="school" />
                    </template>
                  </q-select>
                </div>

                <!--              dateAwarded-->
                <div class="col-md-5 col-xs-11 card-input">
                  <q-input label="Date Awarded"   type="date"   color="grey" v-model="form.dateAwarded"  label-position="above"  >
                    <template  v-slot:prepend>
                      <q-icon name="date_range" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-form>
            <q-stepper-navigation class="q-gutter-x-md">
              <q-btn
                icon="chevron_left"
                no-caps
                flat
                @click="step = 1"
                color="accent"
                label="Back"
                class="q-ml-sm q-pr-sm"
              />
              <q-btn
                @click="register"
                class="q-pl-sm q-pr-sm"
                type="submit"
                no-caps
                color="accent"
                label="Submit"
              >
              </q-btn>
            </q-stepper-navigation>
          </q-step>
        </q-stepper>


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
import states from "../states.js";
let stringOptions = [ ]
import axios from "axios";
import {register} from "register-service-worker";

export default {
  data: () => ({
    cpassword: "",
    isPwd: true,
    isCpwd: true,
    activitySelect: [],
    activities: [],
    anotherInstitution: false,
    qualifications: ["Bsc","OND","HND", "NCE", "Msc", "PhD", "Prof"],
    states: Object.keys(states),
    step: 1,
    dialog: {
      previewImage: false
    },
    imgUploaded: '',
    model: null,
    deviceInput: null,
    linkInput: null,
    options :stringOptions,
    userRole: [],
    form:{
      roles: [],
      firstName: "",
      lastName: "",
      otherName: "",
      email: "",
      phone:"",
      gender: "",
      dob: "",
      address:"",
      password: "",
      anotherInstitution: "",
      stateOrigin: "",
      lgaOrigin: "",
      qualification: "",
      membershipStatus: false,
      institution: "",
      dateAwarded: "",
      nationality:"",
      vcnNumber:"",
      activities: [],
      anotherDateAwarded: "",
      imgUploaded: '',
    },
    countries: [],
    gender: ["Male", "Female"],
    loading: false,
  }),
  mounted() {
    this.getActivity()
  },
  computed: {
    lga_of_origin() {
      return states[this.form.stateOrigin];
    }
  },
  methods: {
    totalAmountList(arr){
      let total = 0
      for (let i = 0; i < arr.length; i++) {
        total += arr[i].amount
      }
      return total
    },
    getActivityRoles(model){
      this.form.activities = model.id

      this.form.roles = model.roles[0].authority
    },
    getActivity () {
      let url = 'activity'
      this.get(url).then(response => {
        if (response.data.length === 0) {

          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'No more records found'
          })
        } else {

          // filter to activityType = 'Once'
          this.activities = response.data.filter(activity => activity.activityType === 'Registration')

        }
      })
    },
    register(){
      const  url = "auth/create-account";

      const formData =  new  FormData()

      formData.append('roles',  this.form.roles)
      formData.append('activities', this.form.activities)
      formData.append('firstName', this.form.firstName)
      formData.append('lastName', this.form.lastName)
      formData.append('otherName', this.form.otherName)
      formData.append('vcnNumber', this.form.vcnNumber)
      formData.append('email', this.form.email)
      formData.append('password', this.form.password)
      formData.append('phone', this.form.phone)
      formData.append('gender', this.form.gender)
      formData.append('dob',this.form.dob)
      formData.append('address',this.form.address)
      formData.append('nationality',this.form.nationality)
      formData.append('stateOrigin',this.form.stateOrigin)
      formData.append('lgaOrigin',this.form.lgaOrigin)
      formData.append('anotherInstitution',this.form.anotherInstitution)
      formData.append('qualification',this.form.qualification)
      formData.append('membershipStatus',this.form.membershipStatus)
      formData.append('institution',this.form.institution)
      formData.append('dateAwarded',this.form.dateAwarded)
      formData.append('anotherDateAwarded',this.form.anotherDateAwarded)
      formData.append('files',this.$store.state.docs[0])


      this.postWithHeaders(url, formData)
        .then((response) => {

          this.$q.notify({
            type: 'positive',
            message: 'Registration Successful',
            actions: [
              { icon: 'refresh', color: 'white', handler: () => {  } }
            ]
          })
          // reset form

        //   goto login page
          this.$router.push({ name: "Home" });

        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            type: 'negative',
            message: 'Cannot  register',
            actions: [
              { icon: 'refresh', color: 'white', handler: () => {  } }
            ]
          })
        });

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
