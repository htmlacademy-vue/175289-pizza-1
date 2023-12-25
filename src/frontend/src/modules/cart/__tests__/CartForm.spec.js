import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setAddresses, setUser } from "@/common/helpers";
import { SET_ENTITY } from "@/store/mutations-types";
import addresses from "@/store/mocks/data/addresses";
import validator from "@/common/mixins/validator";
import CartForm from "@/modules/cart/components/CartForm";
import AppInput from "@/common/components/AppInput";

const setDelivery = (store, value) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "delivery",
      value,
    },
    { root: true }
  );
};

describe("CartForm", () => {
  const localVue = createLocalVue();
  localVue.component("AppInput", AppInput);
  localVue.use(Vuex);

  const mocks = {
    $validator: validator,
  };

  const numberOfBasicDeliveryOptions = 2;

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        updatePhone: jest.fn(),
        updateDelivery: jest.fn(),
        updateAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders basic deliveries", () => {
    createComponent({ localVue, store, mocks });
    const deliveryOptions = wrapper
      .find("[data-test='delivery']")
      .findAll("option");
    expect(Array.from(deliveryOptions).length).toEqual(
      numberOfBasicDeliveryOptions
    );
  });

  it("It renders user deliveries", () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, mocks });
    const deliveryOptions = wrapper
      .find("[data-test='delivery']")
      .findAll("option");
    expect(Array.from(deliveryOptions).length).toEqual(
      numberOfBasicDeliveryOptions + addresses.length
    );
  });

  it("It calls updateDelivery on delivery change", async () => {
    createComponent({ localVue, store, mocks });
    const delivery = wrapper.find("[data-test='delivery']");
    delivery.element.value = "pickup";
    await delivery.trigger("change");
    expect(actions.Cart.updateDelivery).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      "pickup"
    );
  });

  it("It calls updatePhone on phone input", async () => {
    createComponent({ localVue, store, mocks });
    const phoneInput = wrapper
      .find("[data-test='phone-component']")
      .find("input");
    phoneInput.element.value = "+7 999-999-99-99";
    await phoneInput.trigger("input");
    expect(actions.Cart.updatePhone).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      "+7 999-999-99-99"
    );
  });

  it("It does not render address fields when delivery is not new address", () => {
    setDelivery(store, "pickup");
    createComponent({ localVue, store, mocks });
    const address = wrapper.find("[data-test='address']");
    expect(address.exists()).toBeFalsy();
  });

  it("It renders address fields when delivery is new address", () => {
    setDelivery(store, "new address");
    createComponent({ localVue, store, mocks });
    const address = wrapper.find("[data-test='address']");
    expect(address.exists()).toBeTruthy();
  });

  it("It calls updateAddress on street input", async () => {
    setDelivery(store, "new address");
    createComponent({ localVue, store, mocks });
    const streetInput = wrapper
      .find("[data-test='street-component']")
      .find("input");
    streetInput.element.value = "Test";
    await streetInput.trigger("input");
    expect(actions.Cart.updateAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { street: "Test" }
    );
  });

  it("It calls updateAddress on building input", async () => {
    setDelivery(store, "new address");
    createComponent({ localVue, store, mocks });
    const buildingInput = wrapper
      .find("[data-test='building-component']")
      .find("input");
    buildingInput.element.value = "Test";
    await buildingInput.trigger("input");
    expect(actions.Cart.updateAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { building: "Test" }
    );
  });

  it("It calls updateAddress on flat input", async () => {
    setDelivery(store, "new address");
    createComponent({ localVue, store, mocks });
    const flatInput = wrapper
      .find("[data-test='flat-component']")
      .find("input");
    flatInput.element.value = "Test";
    await flatInput.trigger("input");
    expect(actions.Cart.updateAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { flat: "Test" }
    );
  });

  it("It does not call updateAddress when delivery is user address", async () => {
    setDelivery(store, addresses.at(0).id);
    createComponent({ localVue, store, mocks });
    const streetInput = wrapper
      .find("[data-test='street-component']")
      .find("input");
    const buildingInput = wrapper
      .find("[data-test='building-component']")
      .find("input");
    const flatInput = wrapper
      .find("[data-test='flat-component']")
      .find("input");

    streetInput.element.value = "Test";
    await streetInput.trigger("input");
    buildingInput.element.value = "Test";
    await buildingInput.trigger("input");
    flatInput.element.value = "Test";
    await flatInput.trigger("input");

    expect(actions.Cart.updateAddress).not.toHaveBeenCalled();
  });
});
