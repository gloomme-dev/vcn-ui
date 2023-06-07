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
      this.$q.localStorage.remove("file");
      // this.$q.localStorage.remove("profile");
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

    getUserDetails() {
      const obj = JSON.parse(LocalStorage.getItem("profile"))

      console.log(obj)

        return {
        email: obj.email,
        fullName: obj.firstName + " " + obj.lastName +"  "+ obj.otherName,
        id: obj.id,
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




