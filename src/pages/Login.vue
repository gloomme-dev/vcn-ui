<template>
  <q-page class="flex flex-center   row q-gutter-x-lg justify-center items-start  " padding>
    <div class="col-md-5 col-xs-11 row ">
      <div class=" "><span class="text-h4 text-weight-bold text-grey-8">Experience Premium-Quality International Calling to Any Mobile or Landline Phone. </span>

<!--        <div class="text-grey-8 text-weight-bold">Don't have an account? <q-btn  :to="{ name: 'Home' }"  no-caps  unelevated  class="text-secondary  q-pa-sm "  label="Sign Up!" /></div>-->

      </div>

      <div class="col-8">
        <q-img  src="img/person.png" />
      </div>
    </div>
    <div class="col-md-3 col-xs-11 ">

          <q-card flat class="">

            <q-card-section class="text-center">
<!--              <div class="text-h4 text-weight-bold text-grey-8">Welcome back</div>-->
<!--              <div class="text-subtitle2">Sign in</div>-->
            </q-card-section>
            <q-form style="border-radius: 10.7px" class="my-card q-pa-md  q-gutter-y-sm">
              <q-input
                borderless
                name="full name"
                input-class="list-item-s"
                placeholder="Full name"
                v-model="user.fullname"
                type="text"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type your full name']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="grey" />
                </template>
              </q-input>
              <q-input
                name="email"
                borderless
                input-class="list-item-s"
                placeholder="Email"
                v-model="user.email"
                type="email"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type your email']"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="grey" />
                </template>
              </q-input>
<!--              password field-->
              <q-input
                name="password"
                placeholder="Password"
                input-class="list-item-s"
                borderless
                v-model="user.password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type your password']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-card-actions>
                <q-btn  @click="login"  no-caps  color="primary"  class="text-white full-width q-pa-sm login-btn"  label="Sign in" />
              </q-card-actions>
            </q-form>
          </q-card>
    </div>

  </q-page>
</template>

<script>

export default {
  data: () => ({
    session: false,
    email: "",
    password: "",
    localEmail: "",
    localFullname: "",
    profile: {
      token: '',
      email: '',
      fullName: ''
    },
    token: '',
    user: {
      fullname: '',
      email: "",
      password: "",
    },
    isPwd: true,
    loading: false,
  }),
  mounted() {

  },
  methods: {
    login() {
      //   save the user details to localStorage
      localStorage.setItem('user', JSON.stringify(this.user));
      //   redirect to the dashboard
      this.$router.push({name: 'dashboard-user'});
    }

  },
};
</script>

<style>
.login-btn{
  background: #4461F2;
  box-shadow: 0px 12px 21px 4px rgba(68, 97, 242, 0.15);
  border-radius: 10px;

}
</style>
