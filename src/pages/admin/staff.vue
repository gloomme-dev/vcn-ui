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
        :label="$route.meta.title+ 's'"
        color="secondary"
        flat
        icon="groups"
      >
        <q-badge color="secondary" floating>{{ staff.length }}</q-badge>
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
      <!--      Inactive Member-->
      <q-tab-panel flat  name="inactive" class="bg-transparent row justify-center">
        <q-table
          flat
          class="bg-transparent rounded-borders row col-md-12 col-xs-12"
          :pagination="pagination"
          :data="staff"
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
                    <q-item-label class="">{{ props.row.firstName+ " "+props.row.lastName }}</q-item-label>
                    <q-item-label v-for="(role,index) in props.row.roles" caption :key="index">
                      <q-badge>
                        {{ role.title }}

                      </q-badge>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset vertical />
                <q-item clickable class="col"  >
                  <q-item-section top avatar>
                    <q-avatar text-color="orange" icon="call" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.phone }}</q-item-label>
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
                    <q-item-label>{{  props.row.email }}</q-item-label>
                    <q-item-label caption>Email</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <!--            registered voters -->
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="home_work" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.stateOrigin }}</q-item-label>
                    <q-item-label caption>State</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset vertical />
                <!--            registered voters -->
                <q-item clickable class="col">
                  <q-item-section top avatar>
                    <q-avatar text-color="purple" icon="home" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{  props.row.lgaOrigin }}</q-item-label>
                    <q-item-label caption>LGA</q-item-label>
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
<!--    create staff-->
    <q-dialog
      v-model="dialog.staff"
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
          <q-toolbar-title class="text-grey text-weight-bold text-left">Add staff</q-toolbar-title>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section
          class="row q-mt-xs justify-center row q-gutter-y-md col-md-8  q-gutter-x-md justify-around q-pa-sm"
        >


          <!--          Roles-->
          <div class="col-md-6">
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

          <!--first name-->
          <div class="col-md-6 col-xs-11 card-input">
            <q-input label="First name"   type="text"   color="grey" v-model="staffForm.firstName"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--lastName          -->
          <div class="col-md-6 col-xs-11 card-input">
            <q-input label="Last name"   type="text"   color="grey" v-model="staffForm.lastName"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--otherName-->
          <div class="col-md-6 col-xs-11 card-input">
            <q-input label="Other name"   type="text"   color="grey" v-model="staffForm.otherName"   >
              <template  v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <!--              email-->
          <div class="col-md-6 card-input">
            <q-input label="Email"   type="email"   color="grey" v-model="staffForm.email"   >
              <template  v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </div>
          <!--                Phone-->
          <div class="col-md-6 col-xs-11 card-input">
            <q-input label="Phone"   type="text"   color="grey" v-model="staffForm.phone"   >
              <template  v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>
          <!--          Gender-->
          <div class="col-md-6 col-xs-11  card-input">
            <q-select      label="Gender"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="staffForm.gender" :options="gender" >
              <template v-slot:prepend>
                <q-icon name="wc" />
              </template>
            </q-select>
          </div>

          <!--state/Region-->
          <div class="col-md-6 col-xs-11 card-input">
            <q-select      label="State"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="staffForm.stateOrigin" :options="states" >
              <template v-slot:prepend>
                <q-icon name="home_work" />
              </template>
            </q-select>
          </div>
          <!--        Local Goverment area-->
          <div class="col-md-6 col-xs-11 card-input">
            <q-select     label="Local Government Area"  behavior="menu" transition-show="jump-up" transition-hide="jump-up" color="teal"  v-model="staffForm.lgaOrigin" :options="lga_of_origin" >
              <template v-slot:prepend>
                <q-icon name="home" />
              </template>
            </q-select>
          </div>


        </q-card-section>
        <q-card-actions  align="center" class="text-primary absolute-bottom q-mb-lg">
          <q-btn style="width: 93px; height: 40px; border-radius: 10px;" no-caps color="secondary" label="Create" v-close-popup  @click="createStaff" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        @click="dialog.staff = !dialog.staff"
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
import states from "../../states.js";
export default {
  data: () => ({
    roles: [],
    rolesSelect: [],
    states: Object.keys(states),
    gender: ["Male", "Female"],
    staff: [],
    staffForm: {
      roles: [],
      "firstName": "",
      "lastName": "",
      "otherName": "",
      "email": "",
      "phone": "",
      "gender": "",
      "password": "123456",
      "stateOrigin": "",
      "lgaOrigin": ""
    },
    inActiveMembers: [],
    ActiveMembers: [],
    fabRight: false,
    dialog: {
      staff: false,
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
    this.getRoles();
    let url = 'staff'
    this.getStaff(url)
  },

  computed: {
    lga_of_origin() {
      return states[this.staffForm.stateOrigin];
    },
    pageNumber () {
      return this.$store.state.pageNumber
    }
  },

  methods: {
    // get roles
    getRoles () {
      this.get('roles').then(response => {

        // filter out the admin role
        this.roles = response.data.filter(role => role.isAdmin == true)
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
    getStaff (url) {

      this.get(url).then(response => {
        console.log(response)
        if (response.data.length === 0) {

          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report_problem',
            message: 'No more records found'
          })
          this.$store.commit('decrementPageNumber')
        } else {
          this.staff = response.data
        }
      })
    },
    // create staff
    createStaff(){

      this.staffForm.roles.push(this.rolesSelect.id)

      this.post('staff', this.staffForm).then(response => {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'report_problem',
          message: 'Staff created successfully'
        })
        this.staff.unshift(response.data)
      })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            message: "Error adding staff",
            color: "negative",
            position: "top",
            timeout: 2000
          });
        });
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
