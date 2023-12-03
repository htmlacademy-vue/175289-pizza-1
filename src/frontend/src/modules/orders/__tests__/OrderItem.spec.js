import { mount } from "@vue/test-utils";
import orders from "@/store/mocks/data/orders";
import OrderItem from "@/modules/orders/components/OrderItem";

const order = orders[0];

describe("OrderItem", () => {
  const propsData = {
    order,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(OrderItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It emits delete event on click to delete button", () => {
    createComponent({ propsData });
    const deleteButton = wrapper.find("[data-test='delete-button']");
    deleteButton.trigger("click");
    expect(wrapper.emitted().delete[0][0]).toEqual(order.id);
  });

  it("It emits repeat event on click to repeat button", () => {
    createComponent({ propsData });
    const repeatButton = wrapper.find("[data-test='repeat-button']");
    repeatButton.trigger("click");
    expect(wrapper.emitted().repeat[0][0]).toEqual(order);
  });

  it("It renders items", () => {
    createComponent({ propsData });
    const items = wrapper.findAll("[data-test='item']");
    expect(Array.from(items).length).toEqual(order.pizzas.length);
  });

  it("It renders additional", () => {
    createComponent({ propsData });
    const additional = wrapper.find("[data-test='additional']");
    const additionalItems = additional.findAll("[data-test='additional-item']");
    expect(additional.exists()).toBeTruthy();
    expect(Array.from(additionalItems).length).toEqual(order.misc.length);
  });

  it("It does not render additional", () => {
    propsData.order.misc = undefined;
    createComponent({ propsData });
    const additional = wrapper.find("[data-test='additional']");
    expect(additional.exists()).toBeFalsy();
  });

  it("It renders address", () => {
    createComponent({ propsData });
    const address = wrapper.find("[data-test='address']");
    expect(address.exists()).toBeTruthy();
  });

  it("It does not render address", () => {
    propsData.order.address = undefined;
    createComponent({ propsData });
    const address = wrapper.find("[data-test='address']");
    expect(address.exists()).toBeFalsy();
  });
});
