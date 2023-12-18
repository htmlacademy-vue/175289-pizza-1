import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setUser } from "@/common/helpers";
import {
  ENTER_ANIMATION_DURATION,
  LEAVE_ANIMATION_DURATION,
} from "@/common/constants";
import { SET_ENTITY } from "@/store/mutations-types";
import pizzas from "@/store/mocks/data/pizzas";
import Cart from "@/views/Cart";

const addItems = (store) => {
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

const fillForm = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "delivery",
      value: "pickup",
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "phone",
      value: "+7 999-999-99-99",
    },
    { root: true }
  );
};

const wait = async (timeout) => {
  await Promise.resolve((fn) => setTimeout(fn, timeout));
};

describe("Cart", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const stubs = {
    AppButton: { template: "<div>App Button</div>" },
    AppCounter: { template: "<div>App Counter</div>" },
    AppInput: { template: "<div>App Input</div>" },
  };

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        post: jest.fn(),
      },
    };
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It calls validations mixin on form submit", async () => {
    addItems(store);
    createComponent({ localVue, store, stubs });
    const spyValidateFields = jest.spyOn(
      wrapper.vm.$refs.form,
      "$validateFields"
    );
    const layoutForm = wrapper.find("[data-test='layout-form']");
    await layoutForm.trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(actions.Orders.post).not.toHaveBeenCalled();
  });

  it("It calls post if form is valid", async () => {
    addItems(store);
    fillForm(store);
    createComponent({ localVue, store, stubs });
    const spyResetBuilder = jest.spyOn(wrapper.vm, "resetBuilder");
    const spyResetCart = jest.spyOn(wrapper.vm, "resetCart");
    const layoutForm = wrapper.find("[data-test='layout-form']");
    await layoutForm.trigger("submit");

    expect(actions.Orders.post).toHaveBeenCalled();
    await wait(ENTER_ANIMATION_DURATION);
    expect(wrapper.find("[data-test='popup']").exists()).toBeTruthy();
    expect(spyResetBuilder).toHaveBeenCalled();
    expect(spyResetCart).toHaveBeenCalled();
  });

  it("It redirects to index", async () => {
    addItems(store);
    fillForm(store);
    createComponent({ localVue, store, stubs, mocks });
    const layoutForm = wrapper.find("[data-test='layout-form']");
    await layoutForm.trigger("submit");
    await wait(ENTER_ANIMATION_DURATION);
    const popup = wrapper.find("[data-test='popup']");
    jest.useFakeTimers();
    popup.vm.$emit("close");
    await wait(LEAVE_ANIMATION_DURATION);
    jest.runAllTimers();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("It redirects to orders", async () => {
    setUser(store);
    addItems(store);
    fillForm(store);
    createComponent({ localVue, store, stubs, mocks });
    const layoutForm = wrapper.find("[data-test='layout-form']");
    await layoutForm.trigger("submit");
    await wait(ENTER_ANIMATION_DURATION);
    const popup = wrapper.find("[data-test='popup']");
    jest.useFakeTimers();
    popup.vm.$emit("close");
    await wait(LEAVE_ANIMATION_DURATION);
    jest.runAllTimers();
    expect(mocks.$router.push).toHaveBeenCalledWith("/orders");
  });

  it("It renders empty-cart text", () => {
    createComponent({ localVue, store, stubs });
    const text = wrapper.find("[data-test='empty-cart-text']");
    expect(text.exists()).toBeTruthy();
  });

  it("It does not render empty-cart text", () => {
    addItems(store);
    createComponent({ localVue, store, stubs });
    const text = wrapper.find("[data-test='empty-cart-text']");
    expect(text.exists()).toBeFalsy();
  });
});
