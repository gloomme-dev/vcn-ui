<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1 ">
    <q-drawer
      side="left"
      behavior="desktop"
      v-model="left"
      show-if-above
      :width="200"
      :breakpoint="400"
      content-class="bg"
    >
      <q-scroll-area class=" fit bg-grey-9    " style="height: calc(100% - 190px); margin-top: 0px; border-radius: 0px 14.17px 14.17px 0px;">
        <q-list style="height: 1000px; margin-top: 0px" fit padding class="  q-gutter-y-lg text-grey-7 glass-top-dark text-white menu-list">
          <div class="text-center q-mt-lg q-mb-lg" >

            <q-card
              flat
              style="height: 150px;"
              class="bg-transparent  text-center q-gutter-y-lg  q-mt-md "

            >
                     <span class="text-white text-weight-bolder">
                  VCN <br>

               </span>
                         <div class="absolute-bottom bg-transparent ">

                           <q-avatar size="100px"   class="avartar bg-transparent">
                             <q-img   alt="Crate365  logo"  src="https://res.cloudinary.com/galaxycom/image/upload/v1681513241/carter365_hxted2.png" />
                           </q-avatar>
                <div class="text-weight-bold text-white q-mt-sm">
                  <q-avatar size="56px" class="q-mb-sm">
                    <img :src='user.avatar'>
                  </q-avatar>
                </div>
               <span class="text-white">{{  }}</span>
               <span class="text-white">{{ user.firstName + ' ' + user.lastName }}</span>



                <div class="text-primary"><q-chip square class="white-frost">{{ user.roles[0].title  }}</q-chip></div>
                <div class="text-primary"><q-chip color="white" outline class="">{{ user.membershipStatus ? 'Active' : 'Inactive'  }}</q-chip></div>
              </div>
            </q-card>
          </div>

          <q-item class="text-white" :to="{ name:'member-dashboard' }"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item class="text-white" :to="{ name:'permit-user' }"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="workspace_premium" />
            </q-item-section>

            <q-item-section> Permits </q-item-section>
          </q-item>

<!--          <q-item v-if="user.membershipStatus==true" class="text-white" :to="{ name:'permit-user' }"  clickable v-ripple>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="workspace_premium" />-->
<!--            </q-item-section>-->

<!--            <q-item-section> License </q-item-section>-->
<!--          </q-item>-->

          <q-item class="text-white" :to="{ name:'user-invoice' }"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="receipt" />
            </q-item-section>

            <q-item-section> Invoices </q-item-section>
          </q-item>



<!--          <q-item  :to="{ name: 'payment-user' }" class="text-white"   clickable v-ripple>-->
<!--            <q-item-section avatar>-->
<!--              <q-icon name="account_balance" />-->
<!--            </q-item-section>-->

<!--            <q-item-section> Payments </q-item-section>-->
<!--          </q-item>-->


          <q-item class="text-white" @click="logUserOut" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>


      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import { LocalStorage } from "quasar";
// import { Workbox } from 'workbox-window'
export default {
  data() {
    return {
      invoices: [],
      user: {
        avatar: "",
        applicationFile: [
          {
            file: ""
          }
        ],
        roles: [
          {
            title: ""
          }
        ]
      },
      left: false,
      update: false,
      // workbox: new Workbox('service-worker.js')
    };
  },

  methods: {

    getProfile() {
      const url = "profile"
      this.get(url)
        .then((response) => {
          this.user = response.data
          //  save to local storage
          localStorage.setItem('profile', JSON.stringify(response.data))
          // if this.user.applicationFile[0].file is empty, use default avatar
          if (this.user.applicationFile  === undefined ) {

          }
          else{
            const avatar = "data:image/png;base64," + this.user.applicationFile[0].file
            this.user.avatar = avatar
            localStorage.setItem('profile', JSON.stringify(this.user))
          }
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            type: 'negative',
            message: 'Cannot get user profile ',
            actions: [
              { icon: 'refresh', color: 'white', handler: () => {  } }
            ]
          })
        });
    },
    // get activities
    getActivities() {
      let url = "invoice"+"/"+LocalStorage.getItem("profile").id;
      this.$axios
        .get(url)
        .then(response => {
          console.log(response);
          this.invoices = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  mounted() {
  if (!LocalStorage.getItem("profile")) {
    console.log("profile not in local storage")
    this.getProfile()
  }
  else {
    this.user = JSON.parse(LocalStorage.getItem("profile"))
  }
    this.getActivities();



  },
};
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

q-drawer{
  background-color: #2264d1;
}

.q-item.q-router-link--active, .q-item--active {
  color: #ffffff;
  padding-right: 12px;
  margin-right: 4px;
  border-radius: 0 5px 5px 0;
  background-color: #f16521;
}
.q-tabs--active, .q-tabs--active{
  background-color: #2264d1;
}






</style>
