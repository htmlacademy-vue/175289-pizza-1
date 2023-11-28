import { cloneDeep } from "lodash";
import Vuex from "vuex";
import { state, mutations } from "@/store";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

export const generateMockStore = (actions) => {
  const cloneModules = cloneDeep(modules);

  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      cloneModules[module] = { ...cloneModules[module], actions };
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    modules: cloneModules,
    plugins: [VuexPlugins],
  });
};
