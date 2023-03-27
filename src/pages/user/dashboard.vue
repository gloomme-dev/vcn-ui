<template>
  <q-page padding>
    <!--    navigated breadcrumb-->
    <q-toolbar
      class="bg-transparent justify-center text-grey rounded-borders q-mb-sm q-mt-sm"
      no-padding
    >
      <q-btn
        rounded
        no-caps
        :label="$route.meta.title+ ''"
        color="secondary"
        flat
        :icon="$route.meta.icon"
      >
        <q-badge color="secondary" floating>{{ activities.length }}</q-badge>
      </q-btn>

      <q-space />

      <q-input
        borderless
        input-class="q-pl-lg"
        input-style="
     height: 53px;
     background: #FFFF;
     box-sizing: border-box;
     border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0px 12px 12px rgba(41, 121, 255, 0.08);
                        border-radius: 12px;"
        v-model="filter"
        placeholder="Search here ...."
        autogrow
        type="text"
        name="question"
      >
        <template v-slot:append>
          <q-icon v-if="filter === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="filter = ''"
          />
        </template>

      </q-input>


    </q-toolbar>

    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="jump-up"
      transition-next="jump-down"
      class="bg-transparent text-white "
    >
      <q-tab-panel flat  name="inactive" class="bg-transparent row justify-center">
        <q-table
          flat
          class="bg-transparent rounded-borders row col-md-12 col-xs-12"
          :pagination="pagination"
          :data="activities"
          :filter="filter"
          hide-header
          grid-header
          sortOrder="da"
          dense
          row-key="id"
        >
          <template v-slot:body="props">
            <tr class="bg-transparent rounded-borders " style="max-width: 600px">
              <div class="row  justify-lg-center bg-white q-mt-xs row-record">
                <q-item @click="dialog.view =! dialog.view, activityDetails =  props.row" clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="red"
                      icon="event_available"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="">{{ props.row.activityName }}</q-item-label>
                    <q-item-label caption>Activity</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <q-item clickable class="col"  >
                  <q-item-section top avatar>
                    <q-avatar text-color="orange" icon="event_note" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{    props.row.activityType }}</q-item-label>
                    <q-item-label caption>Activity type</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="description" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label v-for="(role,index) in props.row.roles"  :key="index">
                      <q-badge>
                        {{ role.title }}

                      </q-badge>
                    </q-item-label>
                    <!--                    <q-item-label>{{  props.row.description }}</q-item-label>-->
                    <q-item-label caption>Member</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />


                <q-item @click="dialog.view =! dialog.view, activityDetails =  props.row" clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="account_balance" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.paymentType[0].paymentName }}</q-item-label>
                    <q-item-label caption>Payments ( {{  props.row.paymentType.length }} )</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="description" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label><span>&#8358;</span>{{  formatNumber(totalAmountList(props.row.paymentType)) }}</q-item-label>
                    <q-item-label caption>Amount</q-item-label>
                  </q-item-section>

                  <q-item-section clickable v-if=" props.row.variableAmount !=true " side>
                    <q-btn  @click="generateInvoice(props.row)" flat fab-mini round icon="receipt" color="grey" >
                      <q-tooltip>Generate Invoice</q-tooltip>
                    </q-btn>
                    <q-item-label caption>Generate Invoice</q-item-label>


                  </q-item-section>

                  <q-item-section v-else side>

                    <q-btn  @click="updateInvoice(props.row)" flat fab-mini round icon="receipt" color="grey" >
                      <q-tooltip>Generate Invoice</q-tooltip>
                    </q-btn>
                    <q-item-label caption>Generate Invoice</q-item-label>
                  </q-item-section>

                </q-item>

              </div>
            </tr>
          </template>
        </q-table>
      </q-tab-panel>
    </q-tab-panels>

    <!--    payments info-->
    <q-dialog
      v-model="dialog.view"
      transition-show="slide-up"
      transition-hide="slide-down"
      class="q-pa-md "
    >
      <q-card
        ref="testHtml"
        class="rounded-borders dark-frost q-pa-sm dialog-payment-info">
        <q-toolbar class=" q-mt-xs bg-info">
          <!--          <q-toolbar-title class="text-grey text-weight-bold text-left">Activity </q-toolbar-title>-->
          <!--          <div class="row-record justify-evenly">-->
          <q-item @click="dialog.view =! dialog.view, activityDetails =  props.row" clickable class="col">

<!--            <q-item-section>-->
<!--              <q-item-label class="">{{activityDetails.activityName }}</q-item-label>-->
<!--              <q-item-label caption>Activity</q-item-label>-->
<!--            </q-item-section>-->
          </q-item>
          <q-separator inset vertical />
          <q-item clickable class="col"  >


            <q-item-section>
              <q-item-label>{{   activityDetails.activityType }}</q-item-label>
              <q-item-label caption>Activity type</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset vertical />
          <q-item clickable class="col">
            <q-item-section top avatar>
              <q-avatar text-color="purple" icon="description" />
            </q-item-section>

            <q-item-section>
              <q-item-label v-for="(role, index) in activityDetails.roles"  :key="index">
                <q-badge>
                  {{ role.title }}

                </q-badge>
              </q-item-label>
              <q-item-label caption>Member</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset vertical />
          <q-item clickable class="col"  >

            <q-item-section>
<!--              <q-item-label><span>&#8358;</span> {{   formatNumber( totalAmount) }}</q-item-label>-->
              <q-item-label caption>Total</q-item-label>
            </q-item-section>
          </q-item>
          <!--          </div>-->
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="row justify-center">

          <div  v-for="(payment, index) in activityDetails.paymentType"  :key="index" class=" col-12 row  q-mt-xs  row-record">
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label class="">{{payment.paymentName }}</q-item-label>
                <q-item-label caption>Payment</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset vertical />
            <q-item clickable class="col"  >
              <q-item-section>
                <q-item-label><span>&#8358;</span>{{   formatNumber(payment.amount) }}</q-item-label>
                <q-item-label caption>Amount</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset vertical />
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label>{{ payment.paymentType }}</q-item-label>
                <q-item-label caption>Type</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset vertical />
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label>{{ payment.description }}</q-item-label>
                <q-item-label caption>Description</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>


      </q-card>
    </q-dialog>
<!--    update invoice -->
    <q-dialog
      v-model="dialog.updateInvoice"
      transition-show="slide-up"
      transition-hide="slide-down"
      class="q-pa-md "
    >
      <q-card
        ref="testHtml"
        class="rounded-borders dark-frost q-pa-sm dialog-style">
        <q-toolbar class=" q-mt-xs bg-info">
          <q-item clickable class="col"  >
            <q-item-section>
              <q-item-label>Premise  Permit    </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset vertical />
          <q-item clickable class="col"  >

            <q-item-section>
              <q-item-label><span>&#8358;</span> {{   formatNumber( totalAmountList(paymentsSelect)) }}</q-item-label>
              <q-item-label caption>Total</q-item-label>
            </q-item-section>
          </q-item>
          <!--          </div>-->
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section
          class="row q-mt-sm justify-center row q-gutter-y-md col-md-8  q-gutter-x-md justify-around q-pa-sm"
        >
          <div class="col-md-5 card-input">
            <q-input label="Organization"   type="text"   color="grey" v-model="permit.organizationName"   >
              <template  v-slot:prepend>
                <q-icon name="domain" />
              </template>
            </q-input>
          </div>
          <!--              CAC-->
          <div class="col-md-5 col-xs-11 card-input">
            <q-input label="CAC"   type="text"   color="grey" v-model="permit.cac"   >
              <template  v-slot:prepend>
                <q-icon name="pin" />
              </template>
            </q-input>
          </div>
          <!--          payments-->
          <div class="col-md-10">
            <label class="text-grey text-capitalize">Select Premise Activity </label>
            <q-select
              class="col-md-3"
              outlined
              use-chips
              behavior="menu"
              @input="getPaymentType(paymentsSelect)"
              v-model="paymentsSelect"
              :options="paymentTypes"
              color="primary"
              clearable
              options-selected-class="text-primary"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label > {{ scope.opt.paymentName }}</q-item-label>
                    <q-item-label caption> {{ formatNumber( scope.opt.amount) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </template>
              <template v-slot:selected-item="scope">
                <q-chip


                  color="secondary"
                  text-color="white"
                  class="q-my-none q-ml-xs q-mr-none"
                >

                  {{ scope.opt.paymentName }} -
                  {{ formatNumber(scope.opt.amount) }}
                </q-chip>
              </template>
            </q-select>
          </div>

          <!--              Address-->
          <div class="col-md-10 col-xs-11 card-input">
            <q-input label="Address of practicing premises"   type="text"   color="grey" v-model="permit.addressPremises"   >
              <template  v-slot:prepend>
                <q-icon name="location_on" />
              </template>
            </q-input>
          </div>
          <!--              addtionalDetails-->
          <div class="col-md-10 col-xs-11 card-input">
            <q-input label="Additional Details"   type="text"   color="grey" v-model="permit.addtionalDetails"   >
              <template  v-slot:prepend>
                <q-icon name="list" />
              </template>
            </q-input>
          </div>

          <!--              vcnNumber-->
          <div class="col-md-10 col-xs-11 card-input">
            <q-input label=" Managing Director VCN Number"   type="text"   color="grey" v-model="permit.VCNNumber"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--              others-->
          <div class="col-md-10 col-xs-11 card-input">
            <q-input autogrow label="Others "   type="text"   color="grey" v-model="permit.others"   >
              <template  v-slot:prepend>
                <q-icon name="info" />
              </template>
            </q-input>
          </div>
          <!--              AffliatedTo-->
          <div class="col-md-10 col-xs-11 card-input">
            <q-input label="Affiliated To"   type="text"   color="grey" v-model="permit.affliatedTo"   >
              <template  v-slot:prepend>
                <q-icon name="home_work" />
              </template>
            </q-input>
          </div>

        </q-card-section>
        <q-card-actions  align="center" class="text-primary absolute-bottom q-mb-lg q-mt-md">
          <q-btn unelevated style="width: 93px; height: 40px; border-radius: 10px;" no-caps color="secondary" label="Generate" v-close-popup @click="generateInv('hi')" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        @click="dialog.activity = !dialog.activity"
        v-model="fabRight"
        vertical-actions-align="right"
        color="primary"
        glossy
        icon="keyboard_arrow_up"
        direction="up"
      >
        <!--        <q-fab-action label-position="left" color="dark" @click="generatePDFList" icon="print" label="Print PDF" />-->
        <!--        <download-excel-->
        <!--          :name="'LGA Inspectors ' + new Date().toDateString() + '.xls'"-->
        <!--          type="csv"-->
        <!--          :fetch="exportAll"-->
        <!--        >-->
        <!--          <q-fab-action label-position="left" color="dark" @click="exportAll" icon="bar_chart" label="Excel" />-->
        <!--        </download-excel>-->
      </q-fab>
    </q-page-sticky>
<!--    add payment-->
    <q-dialog
      v-model="dialog.payment"
      transition-show="slide-up"
      transition-hide="slide-down"
      class="q-pa-md "
    >
      <q-card
        ref="testHtml"
        class="rounded-borders dark-frost q-pa-sm dialog-style">
        <q-toolbar class=" q-mt-xs">
          <q-avatar size=""  color="" class="avartar">
            <q-btn flat round color="grey"  dense icon="agent_account" />
          </q-avatar>
          <q-toolbar-title class="text-grey text-weight-bold text-left">Create an payment type </q-toolbar-title>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section
          class="row q-mt-lg justify-center row q-gutter-y-md col-md-8  q-gutter-x-md justify-around q-pa-sm"
        >

          <!--              Payment name-->
          <div class="col-md-10 card-input">
            <q-input label="Payment"   type="text"   color="grey" v-model="payment.paymentName"   >
              <template  v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>

          <!--              Payment amount-->
          <div class="col-md-10 card-input">
            <q-input label="Amount"   type="text"   color="grey" v-model="payment.amount"   >
              <template  v-slot:prepend>
                <q-icon name="account_balance" />
              </template>
            </q-input>
          </div>


          <!--              activitypayment description-->
          <div class="col-md-10 card-input">
            <q-input label="Description"   type="text"   color="grey" v-model="payment.description"   >
              <template  v-slot:prepend>
                <q-icon name="description" />
              </template>
            </q-input>
          </div>

          <div  class="col-md-10 q-pl-md q-pr-md card-input">
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



        </q-card-section>
        <q-card-actions  align="center" class="text-primary absolute-bottom q-mb-lg">
          <q-btn style="width: 93px; height: 40px; border-radius: 10px;" no-caps color="secondary" label="Create" v-close-popup  />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import {LocalStorage} from "quasar";

let stringOptions = [ ]
import axios from "axios";

export default {
  data: () => ({
    paymentList: [],
    permit:{
      appliedActivities: [],
      paymentType: [],
      invoiceStatus: "PENDING",
      amount: 0,
      inspectedBy: 0,
      dateInspected: "",
      dateApproved: "",
      approvedBy: 0,
      recommendation: ""
    },
    paymentsSelect: [],
    payment: {
      paymentType: [],
      "userId": 0,
      "appliedActivities": [
        0
      ],
      "invoiceStatus": "string",
      "amount": 0
    },
    activityObject: {

    },
    paymentTypes: [],
    invoiceDetails: {
      "userId": 0,
      "appliedActivities": [],
      "invoiceStatus": "PENDING",
      "amount": 0
    },
    tab: 'inactive',
    fabRight: false,
    filter: '',
    activityDetails:{
      title: '',
      description: '',
      type: '',
      amount: '',
      date: '',
      timestamp: '',
      paymentType: [],
      roles: []
    },
    activities: [],
    isOpwd: true,
    user: {
      roles: [
        {
          title: ""
        }
      ],
      firstName: "",
      lastName: "",
      newPassword: "",
      oldPassword: "",
      password: "",
      id: "",
      email: "",
      phone: ""
    },
    dialog: {
      updateInvoice: false,
      payment:false,
      activity: false,
      view: false
    },
    pagination: {
      sortBy: 'timestamp',
      order: 'desc',
      rowsPerPage: 0
    },
    invoices: [],
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
    this.getProfile();
  },
  computed: {
  },
  methods: {
    getPaymentType(row){
      this.permit.paymentType.push(row.id)
      // forEach row map paymentType to paymentTypes
      // row.forEach((item) => {
      //   this.permit.paymentType.push(item.id)
      // })
      // this.permit.paymentType.push(row)
    },
    totalAmountList(arr){
      let total = 0
      for (let i = 0; i < arr.length; i++) {
        total += arr[i].amount
      }
      // this.amountTotal = total
      return total
    },
    generateInv(row){
      let url ="invoice/create-premise-invoice"
      this.post(url, this.permit).then(response => {
        this.$q.notify({
          message: 'Invoice generated  successfully',
          color: 'positive',
          position: 'top',
          icon: 'done'
        })

        //   move to invoice page
        // this.$router.push({name: 'user-invoice'})

      })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            message: "Error creating invoice ",
            color: "negative",
            position: "top",
            timeout: 2000
          });
        });
    },
    updateInvoice(row) {
      this.paymentTypes = row.paymentType
      this.permit.appliedActivities.push(row.id)
      this.permit.invoiceStatus = "PENDING"



      // this.permit.amount = this.totalAmountList(this.permit.paymentType)

      this.dialog.updateInvoice =! this.dialog.updateInvoice
    },

    generateInvoice(row) {
      this.invoiceDetails = row
      this.payment.appliedActivities = []
      let amount = 0
      for(let i = 0; i < this.invoiceDetails.paymentType.length; i++){
        amount += this.invoiceDetails.paymentType[i].amount
        this.payment.paymentType.push(this.invoiceDetails.paymentType[i].id)
      }
      this.payment.amount = amount
      this.payment.userId =  this.user.id
      this.payment.appliedActivities.push(this.invoiceDetails.id)
      this.payment.invoiceStatus = "PENDING"

      let url = "invoice/create";


      this.post(url, this.payment).then(response => {
        this.$q.notify({
          message: 'Invoice generated  successfully',
          color: 'positive',
          position: 'top',
          icon: 'done'
        })

      //   move to invoice page
        this.$router.push({name: 'user-invoice'})

      })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            message: "Error creating invoice ",
            color: "negative",
            position: "top",
            timeout: 2000
          });
        });


    },
    processPayment() {
      let url = "payment";
      this.post(url, this.payment).then(response => {
        this.dialog.payment = false
        this.$q.notify({
          message: 'Payment successful',
          color: 'positive',
          position: 'top',
          timeout: 2000
        })
      })
        .catch(error => {
          console.log(error);
        });
    },
    getProfile() {
      let url = "profile";
      this.get(url).then(response => {
        this.user = response.data;

        let url = "activity/role/"+response.data.roles[0].id;
        this.get(url).then(res => {


          this.activities = res.data;
        })
          .catch(error => {
            console.log(error);
          });


      })
        .catch(error => {
          console.log(error);
        });
    },
    getActivities() {
      let url = "activity/role/"+this.user.roles[0].id;
      this.get(url).then(response => {
          this.activities = response.data;
        })
        .catch(error => {
          console.log(error);
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
.dialog-style{
  width: 1105px;  height: 866px;
  background: #FFFFFF;
  box-shadow: -14px 30px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
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
