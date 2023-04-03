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
          :data="payments"
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
                      icon="account_balance"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="">{{ props.row.paymentName }}</q-item-label>
                    <q-item-label caption>Payment</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <q-item clickable class="col"  >
                  <q-item-section top avatar>
                    <q-avatar text-color="orange" icon="account_balance" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label><span>&#8358;</span>{{   formatNumber( props.row.amount) }}</q-item-label>
                    <q-item-label caption>Amount</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="description" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.description }}</q-item-label>
                    <q-item-label caption>Description</q-item-label>
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
    <!--create a payment type-->
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

          <!--          activitypayment type-->
          <div class="col-md-10 col-xs-11  card-input">
            <q-select      label="Type"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="payment.paymentType" :options="actTypes" >
              <template v-slot:prepend>
                <q-icon name="event_note" />
              </template>
            </q-select>
          </div>

          <!--              activitypayment description-->
          <div class="col-md-10 card-input">
            <q-input label="Description"   type="text"   color="grey" v-model="payment.description"   >
              <template  v-slot:prepend>
                <q-icon name="description" />
              </template>
            </q-input>
          </div>



        </q-card-section>
        <q-card-actions  align="center" class="text-primary absolute-bottom q-mb-lg">
          <q-btn style="width: 93px; height: 40px; border-radius: 10px;" no-caps color="secondary" label="Create" v-close-popup @click="createPayment" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        @click="dialog.payment = !dialog.payment"
        v-model="fabRight"
        vertical-actions-align="right"
        color="primary"
        glossy
        icon="keyboard_arrow_up"
        direction="up"
      >
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    actTypes: ['Yealy','Once'],
    payments: [],
    payment: {
      paymentName: '',
      amount: '',
      paymentType: '',
      description: '',
    },
    fabRight: false,
    dialog: {
      payment: false,
      view: false
    },
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
    let url = this.$route.meta.url
    this.getPayments(url)
  },

  computed: {
    pageNumber () {
      return this.$store.state.pageNumber
    }
  },

  methods: {
    // createPayment
    createPayment () {
      let url = this.$route.meta.url+'/create'
      this.payment.amount = parseInt(this.payment.amount)
      this.post(url, this.payment).then(response => {
        this.payments.unshift(response.data)
        // clear the form
        this.payment.paymentName = ''
        this.payment.amount = ''
        this.payment.paymentType = ''
        this.payment.description = ''

        this.$q.notify({
          message: 'Payment type created successfully',
          color: 'positive',
          position: 'top',
          icon: 'done'
        })
      })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            message: "Error creating Payment type",
            color: "negative",
            position: "top",
            timeout: 2000
          });
        });
    },

    // get all members
    getPayments (url) {

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
          this.payments = response.data
        }
      })
    },


    shareIncident (description, file) {
      if (navigator.share) {
        navigator.share({
          title: 'Incident Report',
          text: description,
          url: file,
        })
          .then(() =>{
            this.$q.notify({
              message: 'Incident shared successfully',
              color: 'positive',
              position: 'top',
              icon: 'done'
            })
          })
          .catch((error) => {
            this.$q.notify({
              message: 'Error sharing incident',
              color: 'negative',
              position: 'top',
              icon: 'warning'
            })
          });
      } else {
        this.$q.notify({
          message: 'Web Share API is not supported in this browser.',
          color: 'negative',
          position: 'top',
          icon: 'warning'
        })
      }
    },

    // download image
    downloadImage(file) {
      const link = document.createElement('a');
      link.href = file;
      link.download = 'image.png';
      link.click();
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
    //  reset store
    this.$store.commit("resetActives");
    this.$store.commit("resetStore");
  }
}
</script>

<style scoped>

.row-record {
  background: #FFFF;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 24px rgba(41, 121, 255, 0.08);
  border-radius: 12px;
}

</style>
