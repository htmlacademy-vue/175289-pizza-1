import { shallowMount } from "@vue/test-utils";
import AppCounter from "@/common/components/AppCounter";

describe("AppCounter", () => {
  const orangeClass = "counter__button--orange";

  const propsData = {
    maxValue: 10,
    minValue: 1,
    orange: true,
    value: 3,
  };

  const listeners = {
    change: null,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppCounter, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It sets the initial value", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(parseInt(input.element.value)).toBe(propsData.value);
  });

  it("Input emit a change event", () => {
    createComponent({ propsData, listeners });
    const input = wrapper.find("input");
    input.element.value = 5;
    input.trigger("input");
    expect(listeners.change).toHaveBeenCalledWith(5);
  });

  it("Decrement button emits a change event", () => {
    createComponent({ propsData, listeners });
    wrapper.find("button.counter__button--minus").trigger("click");
    expect(listeners.change).toHaveBeenCalledWith(propsData.value - 1);
  });

  it("Increment button emits a change event", () => {
    createComponent({ propsData, listeners });
    wrapper.find("button.counter__button--plus").trigger("click");
    expect(listeners.change).toHaveBeenCalledWith(propsData.value + 1);
  });

  it("Decrement button is disabled", () => {
    propsData.value = 1;
    createComponent({ propsData });
    const button = wrapper.find("button.counter__button--minus");
    expect(button.attributes("disabled")).toBe("disabled");
  });

  it("Increment button is disabled", () => {
    propsData.value = 11;
    createComponent({ propsData });
    const button = wrapper.find("button.counter__button--plus");
    expect(button.attributes("disabled")).toBe("disabled");
  });

  it("Increment button has orange class", () => {
    createComponent({ propsData });
    const button = wrapper.find("button.counter__button--plus");
    expect(button.attributes("class")).toContain(orangeClass);
  });

  it("Increment button does not have orange class", () => {
    propsData.orange = false;
    createComponent({ propsData });
    const button = wrapper.find("button.counter__button--plus");
    expect(button.attributes("class")).not.toContain(orangeClass);
  });
});
