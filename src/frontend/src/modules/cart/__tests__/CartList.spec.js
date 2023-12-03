import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import pizzas from "@/store/mocks/data/pizzas";
import CartList from "@/modules/cart/components/CartList";
import AppCounter from "@/common/components/AppCounter.vue";

const setCartPizzas = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "pizzas",
      value: pizzas,
    },
    { root: true }
  );
};

describe("CartList", () => {
  const localVue = createLocalVue();
  localVue.component("AppCounter", AppCounter);
  localVue.use(Vuex);

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders cart items", () => {
    setCartPizzas(store);
    createComponent({ localVue, store });
    const items = wrapper.findAll("[data-test='item']");
    expect(Array.from(items).length).toEqual(pizzas.length);
  });
});
