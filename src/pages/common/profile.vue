<template>
  <q-page class="justify-content-center row  white-frost">
    <q-page-container></q-page-container>
    <!--    <q-toolbar class="toolbar text-center q-pr-xl">-->
    <!--      <q-btn color="grey" @click="$router.go(-1)"  round fab-mini flat icon="chevron_left" />-->
    <!--      <q-toolbar-title class="text-center text-grey text-body1">Agent</q-toolbar-title>-->
    <!--    </q-toolbar>-->

    <div
      class="  col-md-11 q-pa-md q-mt-xl list text-left text-grey flex flex-center column q-gutter-y-md"
    >
      <q-avatar
        size="100px"
        font-size="52px"
        color="primary"
        text-color="white"
        icon="person"
      />

      <q-item class="item">
        <q-item-section avatar>
          <q-icon color="primary" name="account_circle" />
        </q-item-section>

        <q-item-section>{{ profile.firstName + ' ' + profile.lastName }}</q-item-section>
      </q-item>
      <q-item class="item">
        <q-item-section avatar>
          <q-icon color="primary" name="mail" />
        </q-item-section>

        <q-item-section>{{ profile.email }}</q-item-section>
      </q-item>
      <q-item class="item">
        <q-item-section avatar>
          <q-icon color="primary" name="call" />
        </q-item-section>

        <q-item-section>{{ profile.phone }}</q-item-section>
      </q-item>

      <q-form class="q-mt-sm bg-transparent">
        <q-card flat class="bg-transparent">
          <q-card-section class="q-gutter-y-md">
            <!--            old password-->
            <div class="q-pl-md q-pr-md list-item-s">
              <q-input
                light
                label-color="primary"
                class="text-white text-subtitle1"
                color="primary"
                :type="isOpwd ? 'password' : 'text'"
                v-model="user.oldPassword"
                label="Old password"

              >
                <template  v-slot:prepend>
                  <q-icon name="lock_open" color="primary" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isOpwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isOpwd = !isOpwd"
                  />
                </template>
              </q-input>
            </div>
            <!--            new password-->
            <div class="q-pl-md q-pr-md list-item-s">
              <q-input
                light
                label-color="primary"
                class="text-white text-subtitle1"
                color="primary"
                :type="isOpwd ? 'password' : 'text'"
                v-model="user.newPassword"
                label="New Password"

              >
                <template  v-slot:prepend>
                  <q-icon name="lock" color="primary" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isOpwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isOpwd = !isOpwd"
                  />
                </template>
              </q-input>
            </div>
            <!--            Confirm password-->
            <div class="q-pl-md q-pr-md list-item-s">
              <q-input
                light
                label-color="primary"
                class="text-white text-subtitle1"
                color="primary"
                :type="isOpwd ? 'password' : 'text'"
                v-model="cpassword"
                label="Confirm Password"

              >
                <template  v-slot:prepend>
                  <q-icon name="lock" color="primary" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isOpwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isOpwd = !isOpwd"
                  />
                </template>
              </q-input>
            </div>


          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              @click="changePassword(profile.id)"
              no-caps
              color="primary"
              class="q-pt-sm q-pb-sm"
              padding="xs lg"
              label="Change Password"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
export default {
  data() {
    return {
      user: {
        oldPassword: "",
        newPassword: "",
      },
      cpassword: "",
      isPwd: true,
      isCpwd: true,
      isOpwd: true,
      profile: {},
      loading: false,
      noData: false,
      listContent: false,
      users: [],
      stat: "",
      statZawaiiya: 23,
      dialog: false,
      position: "top",
    };
  },
  methods: {
    getProfile(){
      const  url = "profile"
      this.get(url)
        .then((response) => {
          console.log(response.data)

          this.profile = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            type: 'negative',
            message: 'Cannot get use profile',
            actions: [
              { icon: 'refresh', color: 'white', handler: () => {  } }
            ]
          })
        });
    },
    changePassword(id) {
      const query = "change-password";
      this.put(query, this.user)
        .then((response) => {
          this.$q.notify({
            type: "dark",
            message: " Password changed successfully",
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
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
          // this.loading = !this.loading
          this.$q.notify({
            type: "negative",
            message: "Cannot change password ",
            actions: [
              {
                label: "Close",
                color: "white",
                handler: () => {
                  this.changePassword();
                },
              },
            ],
          });
          // return error
        });
    },
  },
  mounted() {
    // get profile from localStorage
    this.user = LocalStorage.getItem("profile");

    console.log(this.user);

    this.getProfile();
    // this.profile = this.getUserDetails();
  },
};
</script>

<style>
.list-item-s{
  padding-left: 16px;
  padding-right: 16px;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  /*backdrop-filter: blur(10px);*/
  border-radius: 8px;
}
.list {
  /* Auto layout */

  display: flex;
  flex-direction: column;
  padding: 0px;

  position: absolute;
  height: 356px;
  left: 56px;
}
.input {
  height: 48px;
  width: 300px;
  background: #ffffff;
  border-radius: 12px;
}
.item {
  padding-right: 28px;
  height: 48px;
  width: 300px;
  background: #ffffff;
  border-radius: 12px;
}
.toolbar {
  /* White */

  background: #ffffff;
  /* header */

  box-shadow: 0px 1px 45px #e5e5e5;
  border-radius: 0px 0px 12px 12px;
}
</style>
