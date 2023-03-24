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
      <q-badge color="secondary" floating>{{ allMembers.length }}</q-badge>
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
    <q-tab class="text-grey" name="inactive" label="Inactive members" >
      <q-badge color="red" floating>{{ inActiveMembers.length  }}</q-badge>
    </q-tab>
    <q-tab class="text-grey" name="active" label="Active members" >
      <q-badge color="red" floating>{{ activeMembers.length  }}</q-badge>
    </q-tab>
  </q-tabs>
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
        :data="inActiveMembers"
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
                  <q-item-label caption>Member</q-item-label>
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
              <q-item clickable class="col">
                <q-item-section top avatar>
                  <q-avatar text-color="purple" icon="mail" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{  props.row.roles[0].title }}</q-item-label>
                  <q-item-label caption>Membership</q-item-label>
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
                        <q-item clickable @click="approveMembership(props.row.id)">
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
<!--    Active Member-->
    <q-tab-panel flat  name="active" class="bg-transparent row justify-center">
      <q-table
        flat
        class="bg-transparent rounded-borders row col-md-12 col-xs-12"
        :pagination="pagination"
        :data="activeMembers"
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
                  <q-item-label caption>Member</q-item-label>
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
              <q-item clickable class="col">
                <q-item-section top avatar>
                  <q-avatar text-color="purple" icon="mail" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{  props.row.roles[0].title }}</q-item-label>
                  <q-item-label caption>Membership</q-item-label>
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
</q-page>
</template>

<script>
export default {
  data: () => ({
    inActiveMembers: [],
    activeMembers: [],
    fabRight: false,
    dialog: {
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
    let url = 'users'
    this.getAllMembers(url)
  },

  computed: {
    pageNumber () {
      return this.$store.state.pageNumber
    }
  },

  methods: {
    approveMembership(id){


      const url = 'users/activate-account'
      this.post(url, { userId: id}).then(response => {
        this.$q.notify({
          message: 'Membership Approved',
          color: 'positive',
          position: 'top',
          timeout: 2000
        })

      //   move the user to active list
        this.activeMembers.push(this.inActiveMembers.find(member => member.id === id))
      //   remove member from inactive list
        this.inActiveMembers = this.inActiveMembers.filter(member => member.id !== id)
      })
        .catch((error) => {
          console.log(error)
        })
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
        // map through the response and filter out the active members
          this.activeMembers = this.allMembers.filter(member => member.membershipStatus === true)
          this.inActiveMembers = this.allMembers.filter(member => member.membershipStatus === false)

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

.row-record {
  background: #FFFF;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 12px 24px rgba(41, 121, 255, 0.08);
  border-radius: 12px;
}

</style>
