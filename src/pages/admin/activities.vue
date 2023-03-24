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
                    <q-item-label>{{ formatNumber(totalAmountList(props.row.paymentType)) }}</q-item-label>
                    <q-item-label caption>Amount</q-item-label>
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
                          <q-item clickable @click="account = props.row, dialog.deactivate = ! dialog.deactivate">
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="red"
                                icon="block"
                              />
                            </q-item-section>
                            <q-item-section> Deactivate</q-item-section>
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
                          <q-item clickable @click="account = props.row,  dialog.delete =! dialog.delete">
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
    <!--create an activity-->
    <q-dialog
      v-model="dialog.activity"
      transition-show="slide-up"
      transition-hide="slide-down"
      class="q-pa-md "
    >
      <q-card
        style="height: 900px;width: 800px"
        ref="testHtml"
        class="rounded-borders dark-frost q-pa-sm dialog-style">
        <q-toolbar class=" q-mt-xs">
          <q-avatar size=""  color="" class="avartar">
            <q-btn flat round color="grey"  dense icon="agent_account" />
          </q-avatar>
          <q-toolbar-title class="text-grey text-weight-bold text-left">Create an activity </q-toolbar-title>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section
          class="row q-mt-lg justify-center row q-gutter-y-md col-md-8  q-gutter-x-md justify-around q-pa-sm"
        >

          <!--              Activity name-->
          <div class="col-md-10 card-input">
            <q-input label="Activity Name"   type="text"   color="grey" v-model="activity.activityName"   >
              <template  v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>

          <!--          Activity type-->
          <div class="col-md-10 col-xs-11  card-input">
            <q-select      label="Activity type"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="activity.activityType" :options="actTypes" >
              <template v-slot:prepend>
                <q-icon name="event_note" />
              </template>
            </q-select>
          </div>

          <!--              Activity description-->
          <div class="col-md-10 card-input">
            <q-input label="Description"   type="text"   color="grey" v-model="activity.description"   >
              <template  v-slot:prepend>
                <q-icon name="description" />
              </template>
            </q-input>
          </div>


<!--          payments-->
          <div class="col-md-10">
            <label class="text-grey text-capitalize">Payment </label>
            <q-select
              class="col-md-3"
              outlined
              use-chips
              multiple
              behavior="menu"
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
          <!--          Roles-->
          <div class="col-md-10">
            <label class="text-grey text-capitalize">Select Role </label>
            <q-select
              class="col-md-3"
              outlined
              behavior="menu"
              v-model="rolesSelect"
              :options="roles"
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
                    <q-item-label > {{ scope.opt.title }}</q-item-label>
                    <q-item-label caption> {{ scope.opt.description }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />

              </template>
              <template v-slot:selected>
                <q-chip
                  v-if="rolesSelect"
                  dense
                  square
                  color="secondary"
                  text-color="white"
                  class="q-my-none q-ml-xs q-mr-none"
                >

                  {{  rolesSelect.title }}
                </q-chip>
              </template>
            </q-select>
          </div>


        </q-card-section>
        <q-card-actions  align="center" class="text-primary absolute-bottom q-mb-lg">
          <q-btn style="width: 93px; height: 40px; border-radius: 10px;" no-caps color="secondary" label="Create" v-close-popup @click="createActivity" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

              <q-item-section>
                <q-item-label class="">{{activityDetails.activityName }}</q-item-label>
                <q-item-label caption>Activity</q-item-label>
              </q-item-section>
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
                <q-item-label><span>&#8358;</span> {{   formatNumber( totalAmount) }}</q-item-label>
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
  </q-page>
</template>

<script>
export default {
  data: () => ({

    roles: [],
    actTypes: ['Recurring','Registration'],
    paymentsSelect: [],
    rolesSelect: [],
    obj:{

    },
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
    activity:{
      payment: [],
      roles: []
    },
    activities: [],
    fabRight: false,
    dialog: {
      activity: false,
      view: false
    },
    paymentTypes: [],
    allMembers: [],
    tab: 'inactive',
    loading: true,
    pagination: {
      sortBy: 'timestamp',
      order: 'desc',
      rowsPerPage: 0
    },
    filter: '',


  }),
  mounted() {
    this.getActivity()
    this.getRoles();
    this.getPaymentTypes();
  },


  methods: {
    totalAmountList(arr){
      console.log(arr)
      let total = 0
      for (let i = 0; i < arr.length; i++) {
        total += arr[i].amount
      }
      return total
    },

    // create activity
    createActivity() {
      // loop throuh the selected payments and push the id to the payment array
      for (let i = 0; i < this.paymentsSelect.length; i++) {
        this.activity.payment.push(this.paymentsSelect[i].id)
      }


      // this.activity.payment.push(this.paymentsSelect.id)
      this.activity.roles.push(this.rolesSelect.id)

       //
       this.post("activity/create", this.activity)
        .then(response => {
          this.activities.push(response.data)
          this.$q.notify({
            message: "'created successfully'",
            color: "positive",
            position: "top",
            timeout: 2000
          });
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            message: "Error creating activity",
            color: "negative",
            position: "top",
            timeout: 2000
          });
        });
    },
    // get payments
    getPaymentTypes () {
      this.get('paymentType').then(response => {
        this.paymentTypes = response.data
      })
        .catch((error) => {
          this.$q.notify({
            message: 'Can not get payment types',
            color: 'negative',
            position: 'top',
            icon: 'warning'
          })
        });
    },
    // get roles
    getRoles () {
      this.get('roles').then(response => {
        this.roles = response.data
        this.roles = response.data.filter(role => role.isAdmin == false)
      })
        .catch((error) => {
          this.$q.notify({
            message: 'Can not get roles',
            color: 'negative',
            position: 'top',
            icon: 'warning'
          })
        });
    },

    // get all members
    getActivity () {

      let url = this.$route.meta.url
      this.get(url).then(response => {
        if (response.data.length === 0) {


          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'No more records found'
          })
        } else {
          console.log(response)
          this.activities = response.data

        }
      })
    },
    // download image
    downloadImage(file) {
      const link = document.createElement('a');
      link.href = file;
      link.download = 'image.png';
      link.click();
    },
    deleteRow(row) {
      const query = "incident/" + row.id;
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
    }
  },
  computed: {

    // totalAmount is activityDetails.payments.amount
    totalAmount () {
      let total = 0
      for (let i = 0; i < this.activityDetails.paymentType.length; i++) {
        total += this.activityDetails.paymentType[i].amount
      }
      return total
    },



    // paymentIds () {
    //   return this.activity.payments.map((item) => {
    //     return item.id
    //   })
    // },
    // roleIds () {
    //   return this.activity.roles.map((item) => {
    //     return item.id
    //   })
    // },
    pageNumber () {
      return this.$store.state.pageNumber
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
.dialog-payment-info{
  width: 1105px; max-width: 200vw; height: 966px;
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
.row-record {
  background: #FFFF;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 24px rgba(41, 121, 255, 0.08);
  border-radius: 12px;
}

</style>
