import Vue from "vue";
import {Cookies, date} from 'quasar';
import { LocalStorage } from "quasar";
import axios from 'axios'

Vue.mixin({
  methods: {
    momentGetMonth(date) {
      return moment(new Date(date)).format("MMMM");
    },
    momentGetDate(date) {
      return moment(new Date(date)).format("Do");
    },
    ago(date) {
      const previousDate = moment([
        new Date(date).getFullYear(),
        new Date(date).getMonth(),
        new Date(date).getDate(),
      ]);
      const currentDate = moment([
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ]);
      return previousDate.from(currentDate);
    },
    appendZero(digit) {
      if (String(digit).length < 2) {
        return "0" + String(digit);
      } else {
        return String(digit);
      }
    },
    setMonth(m) {
      const month = parseInt(m) + 1;
      if (String(month).length < 2) {
        return "0" + String(month);
      } else {
        return String(month);
      }
    },
    goTo(component, id, from) {
      this.$router.push({ name: component, query: { id: id, from: from } });
    },

    humanDate(d){
      const timeStamp = d
      return     date.formatDate(timeStamp, 'dddd  Do  MMM-YYYY-hh:mm')
    },
    getDate() {
      return String(
        this.appendZero(new Date().getDate()) +
        "-" +
        this.setMonth(new Date().getMonth()) +
        "-" +
        new Date().getFullYear()
      );

      //
    },
    logUserOut() {
      this.$store.commit("resetActives");
      this.$store.commit("resetStore");
      this.$q.localStorage.remove('session')
      this.$q.localStorage.remove("token");
      this.$router.push({ name: "Home" });
    },
    setAuthToken(token) {
      LocalStorage.set("token", token);
    },
    setSession(credentials) {
      LocalStorage.set("session", credentials);
      LocalStorage.set("token", credentials.token);
    },
    getAuth() {
      return LocalStorage.getItem("session").token;
    },

    //format the number to standard numerical format of using commas and dots
    formatNumber(value){
      let result = 0
      if(isNaN(value)==true){
        result = parseFloat(value)
        return Intl.NumberFormat().format(result)
      }
      else {
        return Intl.NumberFormat().format(value)
      }

    },


    getSession() {
      return LocalStorage.getItem("session").token;
    },
    getFullname() {
      const name = LocalStorage.getItem("session");
      return name.fullName;
    },
    getUserDetails() {
      const obj = LocalStorage.getItem("session");
      return {
        token: obj.token,
        email: obj.user.email,
        fullName: obj.staffRecord.firstName + " " + obj.staffRecord.middleName +"  "+ obj.staffRecord.surname,
        staffId: obj.staffRecord.staffId,
        phone: obj.user.phoneNumber,
        id: obj.staffRecord.id,
      };
    },
    getUsername() {
      const username = LocalStorage.getItem("session");
      // console.log(username.email)
      return username.email;
    },
    endSession() {
      return LocalStorage.remove("session");
    },
  },
});


export { date }




