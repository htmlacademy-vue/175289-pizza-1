import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import misc from "@/store/mocks/data/misc";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import AppCounter from "@/common/components/AppCounter.vue";

const setMisc = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Misc",
      entity: "misc",
      value: misc,
    },
    { root: true }
  );
};

describe("CartAdditional", () => {
  const localVue = createLocalVue();
  localVue.component("AppCounter", AppCounter);
  localVue.use(Vuex);

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartAdditional, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        updateCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders additional items", () => {
    setMisc(store);
    createComponent({ localVue, store });
    const additionalItems = wrapper.findAll("[data-test='additional-item']");
    expect(Array.from(additionalItems).length).toEqual(misc.length);
  });

  it("It updates cart", () => {
    setMisc(store);
    createComponent({ localVue, store });
    const counterInput = wrapper
      .find("[data-test='additional-item-counter']")
      .find("input");
    counterInput.element.value = 2;
    counterInput.trigger("input");
    expect(actions.Cart.updateCart).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        entity: "misc",
        value: { ...misc[0], quantity: 2 },
      }
    );
  });
});
