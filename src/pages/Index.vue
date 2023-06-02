<template>
  <q-page class="flex flex-center   row q-gutter-x-lg justify-center items-start  " padding>
<!--    <div class="col-md-5 col-xs-11 row ">-->
<!--      <div class=" "><span class="text-h4 text-weight-bold text-grey-8">Experience Premium-Quality International Calling to Any Mobile or Landline Phone. </span>-->

<!--        &lt;!&ndash;        <div class="text-grey-8 text-weight-bold">Don't have an account? <q-btn  :to="{ name: 'Home' }"  no-caps  unelevated  class="text-secondary  q-pa-sm "  label="Sign Up!" /></div>&ndash;&gt;-->

<!--      </div>-->

<!--      <div class="col-8">-->
<!--        <q-img  src="img/person.png" />-->
<!--      </div>-->
<!--    </div>-->
    <div class="col-md-3 col-xs-11 ">

      <q-card flat class="text-center">

<!--        <q-card-section class="text-center">-->
                        <div class="text-h4 text-weight-bold text-grey-8">Welcome back</div>

<!--        </q-card-section>-->

        <q-form style="border-radius: 10.7px" class=" text-center my-card q-pa-md  q-gutter-y-sm">
          <q-avatar size="150px" >
            <q-img   alt="Crate365  logo"  src="https://res.cloudinary.com/galaxycom/image/upload/v1681513241/carter365_hxted2.png" />
          </q-avatar>
          <q-input
            name="email"
            outlined
            input-class=""
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
          <div class="">
            <q-input
              outlined
              name="password"
              placeholder="Password"
              input-class=""
              v-model="user.password"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type your password']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="grey" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

          </div>
          <q-card-actions class="text-center q-gutter-y-lg justify-around">
            <q-btn  @click="logUserIn"  no-caps  color="accent"  class="text-white full-width q-pa-sm login-btn"  label="Sign in" />
            <q-btn  unelevated  no-caps label=" Don't have an account?" />

            <q-btn
              :to="{ name: 'register' }"
              unelevated
              padding="xs lg"
              text-color="accent"
              type="submit"
              no-caps
              size="md"
              class="bg-transparent  q-pt-xs q-pb-xs q-pt-sm q-pb-sm text-primary btn-primary q-pl-xl q-pr-xl"
            >Register

            </q-btn>
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
      email: "",
      password: "",
    },
    isPwd: true,
    loading: false,
  }),
  mounted() {
    // this.getMyActivities();
  },
  methods: {
    // get User activities
    getMyActivities(){
      let url = "activity/1";
      this.get(url)
        .then((response) => {
          console.log(response);
          this.activities = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            type: "negative",
            message: "Cannot get user activities",
          });
          // return error
        });

    },
    getProfile() {
      const url = "profile"
      this.get(url)
        .then((response) => {

          console.log(response)

          //  save to local storage
          localStorage.setItem('profile', JSON.stringify(response.data))
          // this.profile = response.data
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
    logUserIn() {


      //check if token is available in local storage
      if (localStorage.getItem('token')) {
        //remove token from local storage
        localStorage.removeItem('token')

        // this.$router.push('/dashboard')
      }
      else {

      }

      this.loading = !this.loading;
      const query = "auth/sign-in";
      this.post(query, this.user)
        .then((response) => {


          this.setAuthToken(response.data.token);

          let userRoles = response.data.roles[0];

          // this.getProfile();


          if(userRoles){

            // this.$router.push({ name: "dashboard-user" });
            if(userRoles.authority==="VET"){
              this.$router.push({ name: "member-dashboard" });
            }
            else if(userRoles.authority==="ADMIN"){
              this.$router.push({ name: "members-admin" });
            }
            else if(userRoles.authority==="CO-ORDINATOR"){
              this.$router.push({ name: "members-admin" });
            }
            else if(userRoles.authority==="PARA"){
              this.$router.push({ name: "member-dashboard" });
            }
          }




        })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading;
          this.$q.notify({
            type: "negative",
            message: "Check you login details and try again",
          });
          // return error
        });
    },

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
  box-shadow: 0px 9px 9px rgba(0, 0, 0, 0.1);
  /*backdrop-filter: blur(10px);*/
  border-radius: 8px;
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
.login-btn{
  background: #4461F2;
  box-shadow: 0px 12px 21px 4px rgba(68, 97, 242, 0.15);
  border-radius: 10px;

}
</style>
