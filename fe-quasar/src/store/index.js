import Vue from "vue";
import Vuex from "vuex";

// Modules
import view from "./module-view";
import auth from "./module-auth";

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    view,
    auth,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
});

/**
 * Vuex Store 사용
 * @returns {Object} Vuex Store
 * @since 2023.06.29
 * @author hskim
 */
export const useStore = function (/* { ssrContext } */) {
  return Store;
};

console.log("#1");
export default useStore;

// NOTE: 기존 선언 방식
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       // example
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: process.env.DEBUGGING
//   })

//   return Store
// }
