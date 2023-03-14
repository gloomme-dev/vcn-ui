import Vue from "vue";
import Vuex from "vuex";
import { api } from "boot/axios";
import axios from "axios";
import { Notify, LocalStorage } from "quasar";

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      doc: {},
      docs: [],
      record: {},
      active: [],
      print: [],
      inactive: [],
      records: [],
      pendordersers: [],
      procordersers: [], //
      mvdv: [],
      mvst: [],
      dvst: [],
      sttr: [],
      st: [],
      rows: [],
      loader: false,
      pagination: {
        rowsPerPage: 100,
      },
      notification: {
        orders: 0
      }
    },
    mutations: {
      updateNotifications (state, update) {
        state.notification = update
      },
      resetNotifications (state) {
        state.notification = { orders: 0 }
      },
      addToDocs(state, doc) {
        state.docs.push(doc);
      },
      removeFromDocs(state, id) {
        const index = state.docs.findIndex((doc) => doc._id === id);
        state.docs.splice(index, 1);
      },
      addToRows(state, docs) {
        state.rows = docs;
      },
      addToRecord(state, docs) {
        state.record = docs;
      },
      initializeDocs(state, docs) {
        state.docs = docs;
      },
      addToActive(state, record) {
        state.active = record;
      },
      addToPrint(state, record) {
        state.print = record;
      },
      addToInaActive(state, record) {
        state.inactive = record;
      },
      pushToActive(state, record) {
        state.active.push(record);
      },
      pushToPendingOrders(state, record) {
        state.pendordersers.push(record);
      },
      pushToProcessedOrders(state, record) {
        state.procorders.push(record);
      },
      pushToInaActive(state, record) {
        state.inactive.push(record);
      },
      pushToRecords(state, record) {
        state.records.push(record);
      },
      addToRecords(state, record) {
        state.records = record;
      },
      removeFromActiveMultiple(state, list) {
        for (let i = 0; i < list.length; i++) {
          const index = state.active.findIndex(
            record =>
              record.agent_id === list[i].agent_id || record.id === list[i].id
          );
          state.active.splice(index, 1);
        }
      },
      removeRow(state, id) {
        const index = state.rows.findIndex(
          (record) => record.agent_id === id || record.id === id
        );
        state.rows.splice(index, 1);
      },
      removeFromRows(state, list) {
        for (let i = 0; i < list.length; i++) {
          const index = state.rows.findIndex(
            (record) =>
              record.agent_id === list[i].agent_id || record.id === list[i].id
          );
          state.rows.splice(index, 1);
        }
      },
      removeFromInActiveMultiple(state, list) {
        for (let i = 0; i < list.length; i++) {
          const index = state.inactive.findIndex(
            record =>
              record.agent_id === list[i].agent_id || record.id === list[i].id
          );
          state.inactive.splice(index, 1);
        }
      },
      removeFromActive(state, id) {
        const index = state.active.findIndex(
          (record) => record.agent_id === id || record.id === id
        );
        state.active.splice(index, 1);
      },
      removeFrominActive(state, id) {
        const index = state.inactive.findIndex(
          (record) => record.agent_id === id || record.id === id
        );
        state.inactive.splice(index, 1);
      },
      removeFromRecords(state, id) {
        const index = state.records.findIndex((record) => record._id === id);
        state.records.splice(index, 1);
      },
      removeZawiyya(state, id) {
        const index = state.records.findIndex((zawiyya) => zawiyya.id === id);
        console.log(id);
        state.records.splice(index, 1);
      },
      updateRecords(state, doc) {
        const index = state.records.findIndex(
          (record) => record._id === doc._id
        );
        state.records[index] = doc;
        state.records = state.records.slice();
      },
      initializeRecords(state, records) {
        state.records = records;
      },
      initializemvdv(state, records) {
        state.mvdv = records;
      },
      initializemvst(state, records) {
        state.mvst = records;
      },
      initializedvst(state, records) {
        state.dvst = records;
      },
      initializest(state, records) {
        state.st = records;
      },
      initializependordersers(state, records) {
        state.pendordersers = records;
      },
      initializeprocorders(state, records) {
        state.procorders = records;
      },

      initDoc(state, doc) {
        state.doc = doc;
      },
      initRecord(state, record) {
        state.record = record;
      },
      setPassword(state, password) {
        state.record.details.password = password;
      },

      resetRecord(state) {
        state.record = {};
      },
      resetActives(state) {
        state.active = [];
        state.inactive = [];
      },
      resetStore(state) {
        state.record = {};
        state.rows = [];
        state.records = [];
        state.doc = [];
        state.docs = [];
        state.active = [];
        state.inactive = [];
      },

      clearDocs(state) {
        state.docs = [];
      },

      print() {
        window.print();
      },

      initRows(state, rows) {
        state.rows = rows;
      },

      findActiveRows(state, path) {
        state.loader = true;
        axios
          .get(state.baseUrl + path, {
            headers: { Authorization: getToken() },
          })
          .then((response) => {
            state.loader = false;
            state.active = response.data;
            // state.docs = response.data
          })
          .catch((error) => {
            state.loader = false;
            Notify.create({
              type: "Negative",
              message:
                "Unable to load records. Please check your network and try again !",
            });
            return error;
          });
      },

      findInActiveRows(state, path) {
        state.loader = true;
        axios
          .get(state.baseUrl + path, {
            headers: { Authorization: getToken() },
          })
          .then((response) => {
            state.loader = false;
            state.inactive = response.data;
            // state.docs = response.data
          })
          .catch((error) => {
            state.loader = false;
            Notify.create({
              type: "Negative",
              message:
                "Unable to load records. Please check your network and try again !",
            });
            return error;
          });
      },

      findRows(state, path) {
        state.loader = true;
        axios
          .get(state.baseUrl + path, {
            headers: { Authorization: getToken() },
          })
          .then((response) => {
            state.loader = false;
            state.rows = response.data;
            state.docs = response.data;
          })
          .catch((error) => {
            state.loader = false;
            Notify.create({
              type: "Negative",
              message:
                "Unable to load records. Please check your network and try again !",
            });
            return error;
          });
      },

      // findDocs (state, selector) {
      //   db.find({ selector }).then(response => {
      //     state.docs = response.docs
      //   }).catch(error => {
      //     Notify.create({
      //       type: 'negative',
      //       message: 'Unable to load records. Please try again !'
      //     })
      //     return error
      //   })
      // },
      // findRecord (state, id) {
      //   db.get(id).then(response => {
      //     state.record = response
      //   }).catch(error => {
      //     return error
      //   })
      // },
      // findRecords (state, selector) {
      //   db.find({ selector, limit: 2000 }).then(response => {
      //     state.records = response.docs
      //   }).catch(error => {
      //     Notify.create({
      //       type: 'negative',
      //       message: 'Unable to load records. Please try again !'
      //     })
      //     return error
      //   })
      // }
    },

    actions: {
      searhDocs(context, selector) {
        context.commit("findDocs", selector);
      },
      searchRecord(context, id) {
        context.commit("findRecord", id);
      },
      searchRecords(context, selector) {
        context.commit("findRecords", selector);
      },
      rows(context, path) {
        context.commit("findActiveRows", path);
      },
      requestRows(context, path) {
        context.commit("findRows", path);
      },
    },
  });

  return Store;
}

function getToken() {
  let token =
    LocalStorage.getItem("token") === null ? "" : LocalStorage.getItem("token");
  return String("Bearer ").concat(token);
}
