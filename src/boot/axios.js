import Vue from 'vue'
import axios from 'axios'
import { LocalStorage } from "quasar";


// const url = "https://monkfish-app-fonzu.ondigitalocean.app/api/";
const url = "http://localhost:8080/api/";

const config = {

};
const api = axios.create(config);

Vue.prototype.$axios = axios




Vue.mixin({
  methods: {
    get(id) {
      api.defaults.headers.common["Authorization"] = `Bearer ${
        LocalStorage.getItem("token") !== null
          ? LocalStorage.getItem("token")
          : ""
      }`;
      return api.get(url + id);
    },
    put(id, data) {
      // api.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.getItem('token') !== null ? LocalStorage.getItem('token') : ''}`

      return api.put(url + id, data);
    },
    putWithNoBody(id) {
      api.defaults.headers.common["Authorization"] = `Bearer ${
        LocalStorage.getItem("token") !== null
          ? LocalStorage.getItem("token")
          : ""
      }`;
      return api.put(url + id);
    },
    postWithHeaders(id, data) {
      api.defaults.headers.common["Authorization"] = `Bearer ${
        LocalStorage.getItem("token") !== null
          ? LocalStorage.getItem("token")
          : ""
      }`;

      return api.post(url + id, data, { headers: { 'content-type': 'multipart/form-data' } });
    },
    post(id, data) {
      api.defaults.headers.common["Authorization"] = `Bearer ${
        LocalStorage.getItem("token") !== null
          ? LocalStorage.getItem("token")
          : ""
      }`;

      return api.post(url + id, data);
    },
    // del (id) {
    //   return api.delete(url + id)
    // },
    del(id, data) {
      return api.delete(url + id, data);
    },
    patch(id, data) {
      api.defaults.headers.common["Authorization"] = `Bearer ${
        LocalStorage.getItem("token") !== null
          ? LocalStorage.getItem("token")
          : ""
      }`;

      return api.patch(url + id, data);
    },
  },
});

export { axios, api }
