import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import pizzas from "@/store/mocks/data/pizzas";
import CartListItem from "@/modules/cart/components/CartListItem";
import AppCounter from "@/common/components/AppCounter";

const pizza = pizzas[0];

describe("CartListItem", () => {
  const localVue = createLocalVue();
  localVue.component("AppCounter", AppCounter);
  localVue.use(Vuex);

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const propsData = {
    pizza,
  };

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartListItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        updateCart: jest.fn(),
      },
    };
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, mocks, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It updates cart", () => {
    createComponent({ localVue, store, mocks, propsData });
    const counterInput = wrapper
      .find("[data-test='item-counter']")
      .find("input");
    counterInput.element.value = 2;
    counterInput.trigger("input");
    expect(actions.Cart.updateCart).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        entity: "pizzas",
        value: { ...pizza, quantity: 2 },
      }
    );
  });

  it("It calls updatePizza and redirects to index on click to change button", () => {
    createComponent({ localVue, store, mocks, propsData });
    const spyUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const changeButton = wrapper.find("[data-test='change-button']");
    changeButton.trigger("click");
    expect(spyUpdatePizza).toHaveBeenCalledWith(pizza);
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
