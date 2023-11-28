import { shallowMount } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput";

describe("AppInput", () => {
  const bigLabelClass = "input--big-label";
  const errorClass = "input--error";

  const defaultType = "text";

  const propsData = {
    label: "testLabel",
    type: "password",
    name: "testName",
    value: "testValue",
    placeholder: "testPlaceholder",
    bigLabel: true,
    errorText: "testErrorText",
    required: true,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

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
    expect(input.element.value).toBe(propsData.value);
  });

  it("It emits an input event", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("It emits the current value", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = "value";
    input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("value");
  });

  it("Its type is prop type", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe(propsData.type);
  });

  it("Its type is text", () => {
    delete propsData.type;
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe(defaultType);
  });

  it("Its name is prop name", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("Its placeholder is prop placeholder", () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(propsData.placeholder);
  });

  it("It has big label class", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain(bigLabelClass);
  });

  it("It has error class", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain(errorClass);
  });
});
