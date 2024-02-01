import { boot } from "quasar/wrappers";
import { SessionStorage } from "quasar";

// https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate";

// https://www.npmjs.com/package/secure-ls
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

export default boot(({ app, store }) => {
  createPersistedState({
    paths: [
      "view.currentMainMenuLabel",
      "auth.accessToken",
      "auth.email",
      "view.step",
      "view.sidebar.subAside.isShow",
      "view.sidebar.subDetailAside.isMini",
    ],

    // NOTE: Quasar SessionStorage 사용
    // storage: {
    //   getItem: (key) => SessionStorage.getItem(key),
    //   setItem: (key, value) => SessionStorage.set(key, value),
    //   removeItem: (key) => SessionStorage.remove(key),
    // },

    // NOTE: secure-ls 사용 - Window LocalStorage에 저장됨
    // storage: {
    //   getItem: (key) => ls.get(key),
    //   setItem: (key, value) => ls.set(key, value),
    //   removeItem: (key) => ls.remove(key),
    // },

    // NOTE: Window SessionStorage 사용
    storage: window.sessionStorage,
  })(store);
});
