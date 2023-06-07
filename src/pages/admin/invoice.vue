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
                    <q-item-label >  {{ props.row.user.firstName + ' ' + props.row.user.lastName }}</q-item-label>
                    <q-item-label caption>Member</q-item-label>
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
                          <q-item clickable @click="approve(props.row)">
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="grey"
                                icon="account_balance_wallet"
                              />
                            </q-item-section>
                            <q-item-section> Approved</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="secondary"
                                icon="lock_open"
                              />
                            </q-item-section>
                            <q-item-section> Reset Password</q-item-section>
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
                    <q-item-label >  {{ props.row.user.firstName + ' ' + props.row.user.lastName }}</q-item-label>
                    <q-item-label caption>Member</q-item-label>
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
                          <q-item clickable @click="approve(props.row)">
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="grey"
                                icon="account_balance_wallet"
                              />
                            </q-item-section>
                            <q-item-section> Approved</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="secondary"
                                icon="lock_open"
                              />
                            </q-item-section>
                            <q-item-section> Reset Password</q-item-section>
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
        class="rounded-borders  q-pa-sm dialog-style">
        <q-toolbar class=" q-mt-xs ">
          <div  v-for="(activity, index) in invoiceInfo.appliedActivity"  :key="index" class=" col-12 row  q-mt-xs  ">
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label class="">{{  activity.activityName }}</q-item-label>
                <q-item-label caption>Activity</q-item-label>
              </q-item-section>
            </q-item>
            <q-btn flat round dense icon="close" v-close-popup />
          </div>
          <q-space />

        </q-toolbar>

<!--        payment details-->
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
                <q-item-label>{{ invoiceInfo.rrr }}</q-item-label>
                <q-item-label caption>RRR</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset vertical />
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label>{{ invoiceInfo.invoiceStatus}}</q-item-label>
                <q-item-label caption>Status</q-item-label>
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
<!--        User details-->
        <q-card-section class="row justify-center">

          <div   class=" col-12 row  q-mt-xs  row-record">
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label class="">{{ invoiceInfo.user.firstName + ` `+invoiceInfo.user.lastName+ ` `+invoiceInfo.user.otherName }}</q-item-label>
                <q-item-label caption>Fullname</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset vertical />
            <q-item clickable class="col"  >
              <q-item-section>
                <q-item-label><span></span>{{  invoiceInfo.user.membershipStatus ? 'Active' : 'Inactive'   }}</q-item-label>
                <q-item-label caption>Status</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset vertical />
            <q-item clickable class="col">
              <q-item-section>
                <q-item-label  v-for="(role, index) in invoiceInfo.user.roles"  :key="index"  >{{ role.title }}</q-item-label>
                <q-item-label caption>Membership</q-item-label>
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



    <!--    FAB-->
  </q-page>

</template>

<script>
export default {
  data: () => ({
    invoiceInfo:{
      img: '',
      user: {
        firstName: '',
        lastName: '',
        otherName: '',
        membershipStatus: '',
      },
    },
    invoiceDetails: {},
    pending: [],
    paid: [],
    invoices: [],
    permit:{
      activities: [],
    },
    dialog: {
      imagePreview: false,
      pdfViewer: false,
      applyPermit: false,
      delete: false,
      deactivate: false,
      view: false
    },
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
    filter: '',


  }),
  mounted() {
    this.getInvoice()
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
    getInvoiceDetails(row){
      this.invoiceInfo = row
      const url = this.$route.meta.url+'/'+row.id
      this.get(url).then(response => {
        console.log(response)
        this.invoiceInfo = response.data

        if (response.data.forms !==null &&   response.data.forms.length > 0){
          this.invoiceInfo.img  = "data:image/png;base64,"+response.data.forms[0].file
        }
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

    totalAmountList(arr){
      let total = 0
      for (let i = 0; i < arr.length; i++) {
        total += arr[i].amount
      }
      return total
    },
    // open receipt
    openReceipt (receiptDetails) {
      console.log(receiptDetails)
      // this.invoiceDetails = receiptDetails
      // this.dialog.view = true
    },

    // get all categories
    getInvoice(){
      const url = this.$route.meta.url+'/all'
      this.get(url).then(response => {
        this.invoices = response.data
        //   map through the payments and push the pending and paid to their respective arrays
        this.invoices.map((invoice) => {
          if (invoice.invoiceStatus === 'PENDING') {
            this.pending.push(invoice)
          } else {
            this.paid.push(invoice)
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

    // get all permits

    getAllPermits(){
      const url = 'permit'
      this.get(url).then(response => {
        this.permits = response.data
        console.log(response)

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

    // get all members
    getAllMembers (url) {

      this.get(url).then(response => {
        if (response.data.length === 0) {

          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'No more records found'
          })
          this.$store.commit('decrementPageNumber')
        } else {
          this.allMembers = response.data
        }
      })
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
    //update incident status
    approve(row){
      const url = this.$route.meta.url+"/" + row.id;
      const data = {
        "userId": 0,
        "appliedActivities": [],
        "invoiceStatus": "string",
        "amount": 0
      }

      this.post(url,data)
        .then((response) => {
          // this.resolvedList.push(response.data)
          setTimeout(() => {
            this.$q.notify({
              progress: true,
              position: 'bottom-right',
              message: 'Invoice approved successfully',
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
    //  reset store
    this.$store.commit("resetActives");
    this.$store.commit("resetStore");
  }
}
</script>

<style scoped>
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
