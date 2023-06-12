<template>
  <q-layout view="lHh Lpr lFf" class=" bg-grey-1">
    <q-drawer
      side="left"
      behavior="desktop"
      v-model="left"
      show-if-above
      :width="220"
      :breakpoint="400"
      content-class="bg"
    >
      <q-scroll-area class=" fit bg-grey-9   " style="height: calc(100% - 190px); margin-top: 0px; border-radius: 0px 14.17px 14.17px 0px;">
        <q-list style="height: 1000px; margin-top: 0px" fit padding class="  q-gutter-y-lg text-grey-7 glass-top-dark text-white menu-list q-pr-sm">
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
                  <span class="text-white">{{ user.firstName + ' ' + user.lastName }}</span>
                </div>
                <div class="text-primary"><q-chip square class="white-frost">Coordinator</q-chip></div>
              </div>
            </q-card>
          </div>


          <q-item class="text-white" :to="{ name:'permits-staff' }"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="workspace_premium" />
            </q-item-section>

            <q-item-section> APL </q-item-section>
          </q-item>


          <q-item class="text-white" :to="{ name:'staff-invoice' }"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="receipt" />
            </q-item-section>

            <q-item-section> Invoices </q-item-section>
          </q-item>


          <q-item class="text-white"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section> Profile </q-item-section>
          </q-item>


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
    }

    // updateApp () {
    //   this.workbox.addEventListener('controlling', () => {
    //     window.location.reload()
    //   })
    //   this.workbox.messageSkipWaiting()
    // }
  },

  mounted() {
    if (!LocalStorage.getItem("profile")) {
      this.getProfile()
    }
    else {
      this.user = JSON.parse(LocalStorage.getItem("profile"))
    }
  },
};
</script>

<style >

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
  background-color: #e9ecef;
}

.q-item.q-router-link--active, .q-item--active {
  color: #ffffff;
  padding-right: 12px;
  margin-right: 4px;
  margin-left: 8px;
  border-radius: 5px 5px 5px 5px;
  background-color: #f16521;
}
.q-tabs--active, .q-tabs--active{
  background-color: #2264d1;
}






</style>
