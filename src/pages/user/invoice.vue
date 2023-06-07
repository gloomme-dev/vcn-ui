<template>
  <q-page padding class="bg-grey-1">
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
        <q-badge color="secondary" floating>{{ invoices.length }}</q-badge>
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
    <q-tabs
      style="height: 56px;"
      v-model="tab"
      align="justify"
      class=" tab-cont tabs-container-bg "
      indicator-color="transparent"
      active-class="cust-tab q-pt-xs text-primary q-ml-xs q-mr-xs"
    >
      <q-tab class="text-grey" name="pending" label="Pending" >
        <q-badge color="red" floating>{{ pending.length  }}</q-badge>
      </q-tab>
      <q-tab class="text-grey" name="paid" label="Paid" >
        <q-badge color="red" floating>{{ paid.length  }}</q-badge>
      </q-tab>
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="jump-up"
      transition-next="jump-down"
      class="bg-transparent text-white "
    >
      <!--      Pending  invoice-->
      <q-tab-panel flat  name="pending" class="bg-transparent row justify-center">
        <q-table
          flat
          class="bg-transparent rounded-borders row col-md-12 col-xs-12"
          :pagination="pagination"
          :data="pending"
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
                <q-item @click="getInvoiceDetails(props.row)" clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="red"
                      icon="receipt"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-for="(activity, index) in props.row.appliedActivity" class="" :key="index">{{ activity.activityName }}</q-item-label>
                    <q-item-label caption>Activity</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label  class="" >
                      <q-item-label><span>&#8358;</span>{{  formatNumber(totalAmountList(props.row.paymentType)) }}</q-item-label>
                    </q-item-label>
                    <q-item-label caption>Amount</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label >  {{ props.row.invoiceStatus }}</q-item-label>
                    <q-item-label caption>Status</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label >  {{ props.row.rrr }}</q-item-label>
                    <q-item-label caption>RRR</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item  class="">
                  <q-item-section side>
                    <q-btn flat fab-mini round icon="more_vert" color="grey" >
                      <q-menu class="bg-transparent"
                              style="min-width: 300px;
                      box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 12px rgba(41, 121, 255, 0.08);
  border-radius: 12px;"
                      >
                        <q-list style="min-width: 200px;
box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 12px rgba(41, 121, 255, 0.08);
  border-radius: 12px;">
                          <q-item v-close-popup clickable @click="makePayment(props.row.rrr)">
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="grey"
                                icon="account_balance_wallet"
                              />
                            </q-item-section>
                            <q-item-section> Pay</q-item-section>
                          </q-item>
                               <q-separator />
                          <q-item v-close-popup clickable @click="checkStatusRRR(props.row.rrr)">
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="grey"
                                icon="verified_user"
                              />
                            </q-item-section>
                            <q-item-section> Check</q-item-section>
                          </q-item>
                               <q-separator />
                          <q-item clickable >
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="red"
                                icon="delete_forever"
                              />
                            </q-item-section>
                            <q-item-section> Delete</q-item-section>
                          </q-item>

                        </q-list>
                      </q-menu>
                    </q-btn>

                  </q-item-section>
                </q-item>
              </div>
            </tr>
          </template>
        </q-table>
      </q-tab-panel>
      <!--      Paid invoices-->
      <q-tab-panel flat  name="paid" class="bg-transparent row justify-center">
        <q-table
          flat
          class="bg-transparent rounded-borders row col-md-12 col-xs-12"
          :pagination="pagination"
          :data="paid"
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
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="red"
                      icon="receipt"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-for="(activity, index) in props.row.appliedActivity" class="" :key="index">{{ activity.activityName }}</q-item-label>
                    <q-item-label caption>Activity</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label><span>&#8358;</span>{{  formatNumber(totalAmountList(props.row.paymentType)) }}</q-item-label>

                    <q-item-label caption>Amount</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label >  {{ props.row.invoiceStatus }}</q-item-label>
                    <q-item-label caption>Status</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label >  {{ props.row.rrr }}</q-item-label>
                    <q-item-label caption>RRR</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item  class="">
                  <q-item-section side>
                    <q-btn flat fab-mini round icon="more_vert" color="grey" >
                      <q-menu class="bg-transparent"
                              style="min-width: 300px;
                      box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 12px rgba(41, 121, 255, 0.08);
  border-radius: 12px;"
                      >
                        <q-list style="min-width: 200px;
box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 12px rgba(41, 121, 255, 0.08);
  border-radius: 12px;">
                          <q-item clickable @click="processPayment(props.row)">
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="grey"
                                icon="account_balance_wallet"
                              />
                            </q-item-section>
                            <q-item-section> Pay</q-item-section>
                          </q-item>
                          <q-separator />
                          <q-item clickable >
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="red"
                                icon="delete_forever"
                              />
                            </q-item-section>
                            <q-item-section> Delete</q-item-section>
                          </q-item>

                        </q-list>
                      </q-menu>
                    </q-btn>

                  </q-item-section>
                </q-item>
              </div>
            </tr>
          </template>
        </q-table>
      </q-tab-panel>

    </q-tab-panels>
    <!--    Invoice view -->
    <q-dialog
      v-model="dialog.view"
      transition-show="slide-up"
      transition-hide="slide-down"
      class="q-pa-md "
    >
      <q-card
        ref="testHtml"
        class="rounded-borders dark-frost q-pa-sm dialog-style">
        <q-toolbar class=" q-mt-xs bg-info">
          <div  v-for="(activity, index) in invoiceInfo.appliedActivity"  :key="index" class=" col-12 row  q-mt-xs  ">
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label class="">{{  activity.activityName }}</q-item-label>
                <q-item-label caption>Payment</q-item-label>
              </q-item-section>
            </q-item>
            <q-btn flat round dense icon="close" v-close-popup />
          </div>
          <q-space />

        </q-toolbar>

        <q-card-section class="row justify-center">

          <div  v-for="(payment, index) in invoiceInfo.paymentType"  :key="index" class=" col-12 row  q-mt-xs  row-record">
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
                <q-item-label>{{ payment.description }}</q-item-label>
                <q-item-label caption>Description</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
        <!--       forms image Asset-->
        <q-card-section class="row justify-center"  v-for="(img,index) in invoiceInfo.forms"  :key="index">
          <q-img
            class="avatar"
            :src="`data:image/png;base64,`+img.file"
          />
        </q-card-section>

      </q-card>
    </q-dialog>
  </q-page>
</template>
<script type="text/javascript" src="https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"></script>

<script>
import axios from 'axios';
import {api} from "boot/axios";

let pending = []
let paid = []
export default {
  data: () => ({
    invoiceInfo:{
      img: ''
    },
    appData: {
      pending: [],
      paid: [],
      // other properties
    },
    rrr: '',
    rrrList: [],
    pending: pending,
    paid: paid,
    invoices: [],
    permit:{
      activities: [],
    },
    invoice:{
      user: 0,
      invoice: 0,
      files: []
    },
    invoiceDetails:{
      user: 0,
      invoice: 0,
      files: []
    },
    dialog: {
      invoice: false,
      payment: false,
      applyPermit: false,
      delete: false,
      deactivate: false,
      view: false
    },
    imgUploaded: '',
    model: null,
    activties: [],
    inActiveMembers: [],
    ActiveMembers: [],
    fabRight: false,
    permits: [],
    allMembers: [],
    tab: 'pending',
    loading: true,
    pagination: {
      sortBy: 'timestamp',
      order: 'desc',
      rowsPerPage: 0
    },
    filter: ''
  }),
  mounted() {
    // this.paid = []
    // this.pending = []
    this.getInvoice()
    const script = document.createElement("script");
    script.src = "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js";
    script.async = true;
    document.head.appendChild(script)

  },

  computed: {
    activitiesId () {
      return this.permit.activities.map((activity) => {
        return activity.id
      })
    },

    pageNumber () {
      return this.$store.state.pageNumber
    }
  },


  methods: {
    // get invoice details
    getInvoiceDetails(row){

      this.invoiceInfo = row

      const url = this.$route.meta.url+'/'+row.id
      this.get(url).then(response => {
        this.invoiceInfo = response.data
        this.invoiceInfo.img  = "data:image/png;base64,"+response.data.forms[0].file
        this.dialog.view = true

      })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'Can not get '+this.$route.meta.title
          })
          // return error
        });
    },
    // check the status of rrr
    checkStatusRRR(rrr){
      const url = this.$route.meta.url  +'/status-rrr/' + rrr
      this.get(url).then(response => {


        //   if response.data.message ==='Successful'
        if(response.data.message ==='Successful'){


          // find the index of the invoice using the rrr from the pending list
          const index = pending.findIndex(invoice => invoice.rrr === rrr)

          // using the index find the invoice from the invoices list pending and push to paid
          paid.push(pending[index])

          // remove the invoice from the pending list
          pending.splice(index, 1)

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Payment Successful',
            position: 'top'
          })
        }
        else{
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'No payment made',
            position: 'top'
          })
        }

      }).catch(
        error => {
          console.log(error)
        }
      )
    },
    makePayment(rrr) {
      function RRRstatusCheck(rrr) {
        const url = `invoice/status-rrr/${rrr}`;
        api.get(url)
          .then(response => {
            // Find the invoice in the "pending" list with the matching RRR
            const invoiceIndex = pending.findIndex(invoice => invoice.rrr === rrr);
            if (invoiceIndex === -1) {
              console.warn(`Invoice with RRR ${rrr} not found in "pending" list`);
              return;
            }

            // Move the invoice from "pending" to "paid" list
            const invoice = pending[invoiceIndex];
            paid.push(invoice);
            pending.splice(invoiceIndex, 1);
          })
          .catch(error => {
            console.error('Error fetching status:', error);
          });
      }
      const paymentEngine = RmPaymentEngine.init({
        key: 'S1VESXwzMjk3NTY0MnxiNmMwZTRmN2Q3OTg5ZjE0NWY5YzMzYWI2NDI1NGFjNTlmN2YwYzVjMDc3ZjE2ZTEwNjc3NTIwZjcwYmQ1Njk0ODU3YTU4YzIxZWEyMDkzZjYwZGE0ZGM4ZDI4NjBkMGQ1NmFjY2FkOGEzN2M1MTQxNDljN2JkZjI4OGU4MmZmMg==',
        processRrr: true,
        transactionId: Math.floor(Math.random() * 1101233),
        extendedData: {
          customFields: [{
            name: 'rrr',
            value: rrr,
          }]
        },
        onSuccess: function(response) {
          RRRstatusCheck(rrr);
          const xhr = new XMLHttpRequest();
          xhr.open('GET', 'https://remita.net/');
          xhr.send();
        },
        onError: function(response) {
          console.log('callback Error Response', response);
        },
        onClose: function() {
          console.log('closed');
        }
      });
      paymentEngine.showPaymentWidget();
    },
    totalAmountList(arr){
      let total = 0
      for (let i = 0; i < arr.length; i++) {
        total += arr[i].amount
      }
      return total
    },
    processPayment(row){
      this.dialog.payment = ! this.dialog.payment
      this.invoice.user = row.user.id
      this.invoice.invoice = row.id

    },
    // get all categories
    getInvoice(){
      const url = this.$route.meta.url
      this.get(url).then(response => {
        this.invoices = response.data
        //   map through the payments and push the pending and paid to their respective arrays
        this.invoices.map((invoice) => {
          if (invoice.invoiceStatus === 'PENDING') {
            pending.push(invoice)
            this.tab = 'pending'
          } else {
            paid.push(invoice)
          }
        })
      })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'Can not get '+this.$route.meta.title
          })
          // return error
        });
    },
    // apply for a permit
    apply(){
      const url = 'permit/create'


      this.permit.premiseActivityCategories = this.activitiesId
      this.post(url, this.permit).then(response => {
        console.log(response)
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Permit applied successfully'
        })
        this.dialog.applyPermit = ! this.dialog.applyPermit
      })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'Can not apply for '+this.$route.meta.title
          })
          // return error
        });
    },
    //exportCSV
    exportAll() {
      return this.unresolvedList.map((account) => {
        const record = {};
        record["Incident"] = account.title;
        record["Description"] = account.description;
        record["Reporter"] = account.firstName + " " + account.lastName,
          record["Phone"] = account.phone;
        record["PU"] = account.location;
        record["Time"] = this.toDate(account.createdAt);

        return record;
      });
    },
    //generate pdf
    generatePDFList() {
      //columns for the generate PDF table
      const columns = [
        { title: "Incident ", dataKey: "incident" },
        { title: "Description", dataKey: "description" },
        { title: "Reporter", dataKey: "reporter" },
        { title: "Phone", dataKey: "phone" },
        { title: "PU", dataKey: "pu" },
        { title: "Time", dataKey: "time" },

      ];
      const formattedData = this.unresolvedList.map((item, index) => {
        return {
          incident: item.title,
          description: item.description,
          reporter: item.firstName + " " + item.lastName,
          phone: item.phone,
          // lga: item.location.lga.name,
          pu: item.location,
          time: this.toDate(item.createdAt)
        };
      });
      const doc = new jsPDF
      ({
        orientation: "portrait",
        unit: "in",
        format: "a4"
      });

      const title = this.$route.meta.title;
      // const title = '';

      // doc.addImage("img/ship.jpg", "JPEG", doc.internal.pageSize.width  / 1.5 , 0.4, 1, 1);
      // doc.addImage("img/ship.jpg", "JPEG", doc.internal.pageSize.width  % 2 , 0.4, 1, 1);
      doc.setFontSize(12).text(this.reportTypeHeader, 0.5, 1.6);
      doc.setFontSize(12).text(this.dateHeader, 0.5, 1.9);
      doc.setFontSize(12).text(title, 0.5, 2.1);
      doc.setFontSize(12).text(this.totalHeader+" "+formattedData.length, 0.5, 3.1);
      // create a line under heading
      // doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 2.0);
      // doc.line(20, 20, 60, 20); // horizontal line
      // Using autoTable plugin
      doc.autoTable({
        // columns,
        body: formattedData,
        margin: { left: 0.5, top: 2.2 }
      });

      doc
        .setFont("helvetica")
        .setFontSize(12)


      // Creating footer and saving file
      doc
        .setFont("times")
        .setFontSize(11)
        .setTextColor(0, 0, 255)
        .text(
          "Powered by Poll Monitor",
          0.5,
          doc.internal.pageSize.height - 0.5
        )
        .text(
          "www.pollmonitor.com.ng",
          0.5,
          doc.internal.pageSize.height - 0.7
        )
        .save(`${this.reportTypeHeader +new Date().toDateString() }.pdf`);
    },
    //delete
    deleteRow(row) {
      const query = "invoice/" + row.id;
      this.del(query)
        .then((response) => {

          let status = row.incidentStatus
          if(status==='PENDING'){
            // remove from active list in store
            this.$store.commit('removeFromActive', row.id)
          }
          else if(status==='COMPLETED'){
            this.$store.commit('removeFrominActive', row.id)
          }

          this.$q.notify({
            type: "dark",
            message: "Deleted successfully",
            actions: [
              {
                label: "Close",
                color: "white",
                handler: () => {
                  /* ... */
                },
              },
            ],
          });
          this.dialog.delete = false;
        })
        .catch((error) => {
          console.log(error);
          // this.loading = !this.loading
          this.$q.notify({
            type: "negative",
            message: "Cannot delete account",
          });
          // return error
        });
    },
    //get incident metaData
    getIncidentMetaData(id) {
      this.get("incident/" + id)
        .then((response) => {
          this.incident = response.data;
          this.dialog.view = true;
        })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading
          // return error
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
    //update incident status
    updateIncidentStatus(row, status){
      const query = "incident/" + row.id;
      const data = {
        title: row.title,
        description: row.description,
        locationId: row.locationId,
        userLocationEnum: 'POLLING_UNIT',
        incidentStatus: status,
        lgaNumber: row.lgaNumber,
        wardNumber: row.wardNumber,
        puNumber: row.puNumber
      }

      this.put(query, data)
        .then((response) => {
          this.unresolvedList.splice(this.unresolvedList.indexOf(row), 1)

          // this.resolvedList.push(response.data)
          setTimeout(() => {
            this.$q.notify({
              progress: true,
              position: 'bottom-right',
              message: 'Incident has been marked as resolved',
              icon: 'task_alt',
              color: 'dark',
              textColor: 'white'
            })
          }, 500)
        })
        .catch((error) => {
          console.log(error);
          // this.loading = !this.loading
          this.$q.notify({
            type: "negative",
            message: "Cannot update status",
          });
          // return error
        });
    }
  },
  beforeDestroy() {
    // clear the  pending and paid arrays

    paid = [];
    pending = [];

    this.$store.commit("resetActives");
    this.$store.commit("resetStore");
  }
}
</script>

<style scoped>
.tabs-container-bg{
  background: rgba(118, 118, 128, 0.12);
  border-radius: 8px;
}

.cust-tab{
  margin-top: 3px;
  padding-top: 2px;
  height: 35px;
  background: #FFFFFF;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
  border-radius: 7px;
  background-color: white;
}

.login-btn{
  background: #4461F2;
  box-shadow: 0px 12px 21px 4px rgba(68, 97, 242, 0.15);
  border-radius: 10px;

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
.dialog-style{
  width: 1105px; max-width: 80vw; height: 866px;
  background: #FFFFFF;
  box-shadow: -14px 30px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.row-record {
  background: #FFFF;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 24px rgba(41, 121, 255, 0.08);
  border-radius: 12px;
}

</style>
