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
        icon="workspace_premium"
      >
        <q-badge color="secondary" floating>{{ permits.length }}</q-badge>
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
      <q-tab class="text-grey" name="pending" :label="'Pending '+ $route.meta.title" >
        <q-badge color="red" floating>{{ pending.length  }}</q-badge>
      </q-tab>
      <q-tab class="text-grey" name="approved" :label="'Approved '+ $route.meta.title" >
        <q-badge color="red" floating>{{ approved.length  }}</q-badge>
      </q-tab>
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="jump-up"
      transition-next="jump-down"
      class="bg-transparent text-white "
    >
      <!--      pending permit-->
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
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="red"
                      icon="person_search"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="">{{ props.row.user.firstName+ " "+props.row.user.lastName }}</q-item-label>
                    <q-item-label caption>Applicant</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />



                <q-separator inset vertical />
                <q-item clickable class="col"  >
                  <q-item-section top avatar>
                    <q-avatar text-color="orange" icon="call" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.user.phone }}</q-item-label>
                    <q-item-label caption>Phone</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <!--            registered voters -->
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="mail" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.user.email }}</q-item-label>
                    <q-item-label caption>Email</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="domain" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.organizationName }}</q-item-label>
                    <q-item-label caption>Organization</q-item-label>
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
                    <q-item-label>{{  props.row.paymentType[0].paymentName }}</q-item-label>

                    <q-item-label caption>Category</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

                <q-item clickable class="col">
                  <q-item-section>
                    <q-item-label>{{  props.row.invoiceGenerationStatus == false ? 'Not yet approved ':' Approved'  }}</q-item-label>

                    <q-item-label caption>Invoice Generate Status</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />

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
                          <q-item-section clickable v-if="props.row.invoiceGenerationStatus == true " side>
                            <q-btn  @click="generateInvoice(props.row)" flat fab-mini round icon="receipt" color="grey" >
                              <q-tooltip>Generate Invoice</q-tooltip>
                            </q-btn>
                            <!--                    <q-item-label caption>Generate Invoice</q-item-label>-->


                          </q-item-section>
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
      <!--      approved permit-->
      <q-tab-panel flat  name="approved" class="bg-transparent row justify-center">
        <q-table
          flat
          class="bg-transparent rounded-borders row col-md-12 col-xs-12"
          :pagination="pagination"
          :data="approved"
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
                      icon="person_search"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="">{{ props.row.user.firstName+ " "+props.row.user.lastName }}</q-item-label>
                    <q-item-label caption>Applicant</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />



                <q-separator inset vertical />
                <q-item clickable class="col"  >
                  <q-item-section top avatar>
                    <q-avatar text-color="orange" icon="call" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.user.phone }}</q-item-label>
                    <q-item-label caption>Phone</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <!--            registered voters -->
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="mail" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.user.email }}</q-item-label>
                    <q-item-label caption>Email</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="domain" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.organizationName }}</q-item-label>
                    <q-item-label caption>Organization</q-item-label>
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
                    <q-item-label>{{  props.row.paymentType[0].paymentName }}</q-item-label>

                    <q-item-label caption>Category</q-item-label>
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
                          <q-item @click="generateInvoice(props.row)" clickable >
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="primary"
                                icon="task_alt"
                              />
                            </q-item-section>
                            <q-item-section> Generate Invoice</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section top avatar>
                              <q-avatar
                                color="secondary-1"
                                class="avartar"
                                text-color="secondary"
                                icon="edit"
                              />
                            </q-item-section>
                            <q-item-section> Update</q-item-section>
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
        <q-form  @submit.prevent="apply"  class=" q-mt-md col-md-12 row q-pa-md q-gutter-y-lg q-gutter-x-xs justify-evenly justify-start" enctype="multipart/form-data">
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
            <q-btn  @click="apply"  no-caps  color="primary"  class="text-white full-width q-pa-sm login-btn"  label="Apply" />
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>

    <!--    FAB-->
    <q-page-sticky position="bottom-right" :offset="[20, 60]">
      <q-fab
        icon="add"
        direction="up"
        color="primary"
        vertical-actions-align="right"
      >
        <q-fab-action  @click="dialog.applyPermit = ! dialog.applyPermit" label-position="right" label="Apply" color="secondary" :icon="$route.meta.icon" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    pending: [],
    approved: [],
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
    let url = 'users/'
    // this.getAllMembers(url)
    this.getAllPermits()
    // this.getAllCategories()
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
    generateInvoice(row){

      let amount = this.totalAmountList(row.paymentType)
      let data = {
        amount: amount,
        permitId: row.id,
      }
      const url = 'invoice/generate-premise-invoice'
      this.post(url, data).then(response => {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'check_circle',
          message: 'Permit approved'
        })

        //   move in approved
        this.approved.push(row)
        this.pending.splice(this.pending.indexOf(row), 1)

      })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'Can not approve permit'
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

    // get all categories
    getAllCategories(){
      const url = 'premise-activity'
      this.get(url).then(response => {
        this.activties = response.data
        console.log(this.activties)
      })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'Can not get categories'
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

    // get all permits

    getAllPermits(){
      const url = this.$route.meta.url
      this.get(url).then(response => {
        this.permits = response.data
        this.pending = response.data.filter((permit) => {
          return permit.invoiceGenerationStatus === false
        })
        this.approved = response.data.filter((permit) => {
          return permit.invoiceGenerationStatus === true
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
