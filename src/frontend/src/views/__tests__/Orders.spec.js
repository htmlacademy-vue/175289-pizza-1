import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import orders from "@/store/mocks/data/orders";
import Orders from "@/views/Orders";

const setOrders = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Orders",
      entity: "orders",
      value: orders,
    },
    { root: true }
  );
};

describe("Orders", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        query: jest.fn(),
        delete: jest.fn(),
      },
    };
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It queries orders", () => {
    createComponent({ localVue, store, mocks });
    expect(actions.Orders.query).toHaveBeenCalled();
  });

  it("It renders orders", () => {
    setOrders(store);
    createComponent({ localVue, store, mocks });
    const orders = wrapper.findAll("[data-test='order']");
    expect(Array.from(orders).length).toEqual(orders.length);
  });

  it("It calls delete on order delete event", () => {
    setOrders(store);
    createComponent({ localVue, store, mocks });
    const order = wrapper.find("[data-test='order']");
    const orderId = orders.at(0).id;
    order.vm.$emit("delete", orderId);
    expect(actions.Orders.delete).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex Context
      orderId
    );
  });

  it("It repeat order and redirects to cart on order repeat event", () => {
    setOrders(store);
    createComponent({ localVue, store, mocks });
    const spyCopyOrderToCart = jest.spyOn(wrapper.vm, "copyOrderToCart");
    const order = wrapper.find("[data-test='order']");
    order.vm.$emit("repeat", orders.at(0));
    expect(spyCopyOrderToCart).toHaveBeenCalledWith(orders.at(0));
    expect(mocks.$router.push).toHaveBeenCalledWith("/cart");
  });
});
