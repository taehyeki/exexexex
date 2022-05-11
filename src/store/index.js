import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import permit2 from "./modules/permit2";
import auth from "./modules/auth";
import chart from "./modules/chart";
import selectedUser from "./modules/selectedUser";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["auth", "selectedUser", "common"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  modules: {
    chart,
    common,
    permit2,
    selectedUser,
    auth,
  },
});
