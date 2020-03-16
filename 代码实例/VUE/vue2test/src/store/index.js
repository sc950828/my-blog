import Vue from "vue";
import Vuex from "vuex";
import mode1 from "./modules/mode1";

Vue.use(Vuex);

const store = new Vuex.Store(mode1);

export default store;
