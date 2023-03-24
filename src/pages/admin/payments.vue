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
        <q-badge color="secondary" floating>{{ payments.length }}</q-badge>
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

      <!--     PENDING Payments-->
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
                <q-item @click="openReceipt(props.row)" clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="red"
                      icon="receipt"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label >{{ props.row.invoice.appliedActivity[0].activityName }}</q-item-label>
                    <q-item-label caption>Activity</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label><span>&#8358;</span>
                      {{ props.row.invoice.appliedActivity[0].paymentType[0].amount }}
                      <!--                      <p>{{ activity.paymentType }}</p>-->

                    </q-item-label>
                    <q-item-label caption>Amount</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label >  {{ props.row.invoice.invoiceStatus }}</q-item-label>
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
                                icon="task_alt"
                              />
                            </q-item-section>
                            <q-item-section> Approve</q-item-section>
                          </q-item>
                          <q-separator />

                          <q-item clickable @click="approveMembership(props.row)">
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="grey"
                                icon="task_alt"
                              />
                            </q-item-section>
                            <q-item-section> Activate Member</q-item-section>
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
<!--      ARROVED Payments-->
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
          <!--        <template v-slot:header="props">-->
          <!--          <q-tr-->
          <!--            class="bg-transparent rounded-borders q-mb-xs q-mt-xs"-->
          <!--            style="max-width: 600px"-->
          <!--            :props="props">-->
          <!--            <div-->
          <!--              class="row q-gutter-y-xs text-center  bg-white q-ma-sm "-->
          <!--            >-->
          <!--              <q-th-->
          <!--                v-for="col in props.cols"-->
          <!--                :key="col.name"-->
          <!--                :props="props"-->
          <!--                class=" text-purple col  text-left q-item  "-->
          <!--              >-->
          <!--                {{ col.label }}-->
          <!--              </q-th>-->
          <!--            </div>-->
          <!--          </q-tr>-->
          <!--        </template>-->
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
                    <q-item-label >{{ props.row.invoice.appliedActivity[0].activityName }}</q-item-label>
                    <q-item-label caption>Activity</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label><span>&#8358;</span>
                      {{ props.row.invoice.appliedActivity[0].paymentType[0].amount }}
                      <!--                      <p>{{ activity.paymentType }}</p>-->

                    </q-item-label>
                    <q-item-label caption>Amount</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label >  {{ props.row.invoice.invoiceStatus }}</q-item-label>
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



                <!--                <q-separator inset vertical />-->
                <!--                <q-item clickable class="col"  >-->
                <!--                  <q-item-section top avatar>-->
                <!--                    <q-avatar text-color="orange" icon="call" />-->
                <!--                  </q-item-section>-->

                <!--                  <q-item-section>-->
                <!--                    <q-item-label>{{  props.row.createdBy.phone }}</q-item-label>-->
                <!--                    <q-item-label caption>Phone</q-item-label>-->
                <!--                  </q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-separator inset vertical />-->
                <!--                &lt;!&ndash;            registered voters &ndash;&gt;-->
                <!--                <q-item clickable class="col">-->
                <!--                  <q-item-section top avatar>-->
                <!--                    <q-avatar text-color="purple" icon="mail" />-->
                <!--                  </q-item-section>-->

                <!--                  <q-item-section>-->
                <!--                    <q-item-label>{{  props.row.createdBy.email }}</q-item-label>-->
                <!--                    <q-item-label caption>Email</q-item-label>-->
                <!--                  </q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-separator inset vertical />-->
                <!--                <q-item clickable class="col">-->
                <!--                  <q-item-section top avatar>-->
                <!--                    <q-avatar text-color="purple" icon="domain" />-->
                <!--                  </q-item-section>-->

                <!--                  <q-item-section>-->
                <!--                    <q-item-label>{{  props.row.organizationName }}</q-item-label>-->
                <!--                    <q-item-label caption>Organization</q-item-label>-->
                <!--                  </q-item-section>-->
                <!--                </q-item>-->

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
                                icon="task_alt"
                              />
                            </q-item-section>
                            <q-item-section> Approve</q-item-section>
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

    <!--    Apply for Permit-->
    <q-dialog
      v-model="dialog.applyPermit"
      transition-show="slide-up"
      transition-hide="slide-down"
      class="q-pa-md"
    >
      <q-card
        ref="testHtml"
        class="rounded-borders dark-frost q-pa-sm dialog-style">
        <q-toolbar class=" justfy-around q-mt-xs q-gutter-x-md">
          <q-btn flat round dense :icon="$route.meta.icon" />
          <div class="text-h5">Apply for a {{ $route.meta.title }}</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-form   class=" q-mt-md col-md-12 row q-pa-md q-gutter-y-lg q-gutter-x-xs justify-evenly justify-start" enctype="multipart/form-data">
          <div class="col-md-5 card-input">
            <q-input label="Organization"   type="text"   color="grey" v-model="permit.OrganizationName"   >
              <template  v-slot:prepend>
                <q-icon name="domain" />
              </template>
            </q-input>
          </div>
          <!--              CAC-->
          <div class="col-md-4 col-xs-11 card-input">
            <q-input label="CAC"   type="text"   color="grey" v-model="permit.cac"   >
              <template  v-slot:prepend>
                <q-icon name="pin" />
              </template>
            </q-input>
          </div>

          <!--        Categories-->
          <div class="col-md-10  card-input ">
            <q-select
              borderless
              use-chips
              multiple
              input-debounce="0"
              label="Category"
              behavior="menu" transition-show="jump-up" transition-hide="jump-up"
              options-selected-class="text-orange"
              v-model="permit.activities"
              :options="activties"
              popup-content-style="border-radius: 12px; margin-top: 10px;"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section avatar>
                    <q-icon name="category" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-capitalize" v-html="scope.opt.name" />
                    <q-item-label caption>{{ scope.opt.subCategory }}</q-item-label>
                  </q-item-section>

                </q-item>
              </template>
              <template v-slot:selected-item="scope">
                <q-chip
                  square
                  color="grey-3"
                  text-color="grey-white"
                  class="q-ma-none text-capitalize"
                >
                  {{ scope.opt.name }}
                </q-chip>
                <q-item>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon  name="category"  />
              </template>
            </q-select>
          </div>

          <!--              Address-->
          <div class="col-md-10 col-xs-11 card-input">
            <q-input label="Address of practicing premises"   type="text"   color="grey" v-model="permit.AddressPremises"   >
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

          <!--              ManagingDirector-->
          <div class="col-md-5 col-xs-11 card-input">
            <q-input label="Managing Director "   type="text"   color="grey" v-model="permit.ManagingDirector"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--              vcnNumber-->
          <div class="col-md-4 col-xs-11 card-input">
            <q-input label="VCN Number"   type="text"   color="grey" v-model="permit.vcnNumber"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--              others-->
          <div class="col-md-5 col-xs-11 card-input">
            <q-input label="Others "   type="text"   color="grey" v-model="permit.Others"   >
              <template  v-slot:prepend>
                <q-icon name="info" />
              </template>
            </q-input>
          </div>
          <!--              AffliatedTo-->
          <div class="col-md-4 col-xs-11 card-input">
            <q-input label="Affiliated To"   type="text"   color="grey" v-model="permit.AffliatedTo"   >
              <template  v-slot:prepend>
                <q-icon name="home_work" />
              </template>
            </q-input>
          </div>

          <q-card-actions class="col-10">
            <q-btn   no-caps  color="primary"  class="text-white full-width q-pa-sm login-btn"  label="Apply" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <!--    FAB-->

  </q-page>
</template>

<script>
export default {
  data: () => ({
    receiptDetails: {
    },
    payments: [],
    pending: [],
    paid: [],
    invoices: [],
    permit:{
      activities: [],
    },
    dialog: {
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
    this.getPayments()
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

    approveMembership(row){

      let id = 0
      id = row.user.id

      const url = 'users/activate-account'
      this.post(url, { userId: id}).then(response => {
        this.$q.notify({
          message: 'Membership Approved',
          color: 'positive',
          position: 'top',
          timeout: 2000
        })
        this.dialog.view = false
        this.getPayments()
      })
        .catch((error) => {
          console.log(error)
        })
    },

    // open receipt
    openReceipt (row) {
      let id = 0
      // loop through row.receipts and get the id
      row.receipts.forEach((receipt) => {
        id = receipt.id
        // console.log(receipt.id)
      })
      // loop through row.receipts
    },

    // get all categories
    getPayments(){
      const url = this.$route.meta.url+'/all'
      this.get(url).then(response => {
        this.payments = response.data
      //   map through the payments and push the pending and paid to their respective arrays
        this.payments.forEach((payment) => {
          if(payment.status === 'PENDING'){
            this.pending.push(payment)
          }else if(payment.status === 'PAID'){
            this.paid.push(payment)
          }
        })
        this.loading = !this.loading


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

    approve(row){

      let id = 0
      // loop through row.receipts and get the id
      row.receipts.forEach((receipt) => {
        id = receipt.id
        // console.log(receipt.id)
      })

      const url = this.$route.meta.url+"/" + row.id;

      const data = {
        invoiceId: row.invoice.id,
        paymentId: row.id
      }

      this.post(url,data)
        .then((response) => {
          // this.resolvedList.push(response.data)
          setTimeout(() => {
            this.$q.notify({
              progress: true,
              position: 'bottom-right',
              message: 'Payment approved successfully',
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
