import { shallowMount } from "@vue/test-utils";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppRadioButton", () => {
  const propsData = {
    name: "testName",
    text: "testText",
    value: "testValue",
    isChecked: true,
  };

  const listeners = {
    change: null,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
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

  it("It emits a change event", () => {
    createComponent({ propsData, listeners });
    const input = wrapper.find("input");
    input.trigger("change");
    expect(listeners.change).toHaveBeenCalled();
  });

  it("Its name is prop name", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("Its value is prop value", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("value")).toBe(propsData.value);
  });

  it("It is checked", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.element.checked).toEqual(true);
  });

  it("It is not checked", () => {
    propsData.isChecked = false;
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.element.checked).toEqual(false);
  });
});
