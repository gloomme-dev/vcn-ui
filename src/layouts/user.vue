<template>
  <q-layout view="lHh Lpr lFf" class=" ">
    <q-drawer
      side="left"
      behavior="desktop"
      v-model="left"
      show-if-above
      :width="200"
      :breakpoint="400"
      content-class="bg"
    >
      <q-scroll-area class=" fit bg-primary   " style="height: calc(100% - 190px); margin-top: 0px; border-radius: 0px 14.17px 14.17px 0px;">
        <q-list style="height: 1000px; margin-top: 0px" fit padding class="  q-gutter-y-lg text-grey-7 glass-top-dark text-white menu-list">
          <div class="text-center q-mt-lg q-mb-lg" >

            <q-card
              flat
              style="height: 150px;"
              class="bg-transparent  text-center q-gutter-y-lg  q-mt-md "

            >
                    <span class="text-info text-weight-bolder">
                  VCN <br>

               </span>
              <div class="absolute-bottom bg-transparent ">

                <q-avatar size=""  color="secondary" class="avartar">
                  <q-icon color="white" name="manage_accounts" />
                </q-avatar>
                <div class="text-weight-bold text-white q-mt-sm">
                  {{ user.firstName + ' ' + user.lastName }}
<!--                  {{ user }}-->
                </div>
                <div class="text-primary"><q-chip square class="white-frost">Member</q-chip></div>
              </div>
            </q-card>
          </div>

          <q-item class="text-white" :to="{ name:'member-profile' }"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section> Profile </q-item-section>
          </q-item>

          <q-item class="text-white" :to="{ name:'permit' }"  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="workspace_premium" />
            </q-item-section>

            <q-item-section> Permits </q-item-section>
          </q-item>


          <q-item class="text-white"   clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_balance" />
            </q-item-section>

            <q-item-section> Payments </q-item-section>
          </q-item>

          <q-item class="text-white"   clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="sync" />
            </q-item-section>

            <q-item-section> Renewal </q-item-section>
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
      user: '',
      left: false,
      update: false,
      // workbox: new Workbox('service-worker.js')
    };
  },

  methods: {
    // updateApp () {
    //   this.workbox.addEventListener('controlling', () => {
    //     window.location.reload()
    //   })
    //   this.workbox.messageSkipWaiting()
    // }
  },

  mounted() {
    // load the profile from local storage and convert it to a JSON object

  this.user = LocalStorage.getItem("profile");

  },
};
</script>

<style scoped>

q-drawer{
  background-color: #2264d1;
}

.q-item.q-router-link--active, .q-item--active {
  color: #ffffff;
  padding-right: 12px;
  margin-right: 4px;
  border-radius: 0 5px 5px 0;
  background-color: #2264d1;
}
.q-tabs--active, .q-tabs--active{
  background-color: #2264d1;
}






</style>
