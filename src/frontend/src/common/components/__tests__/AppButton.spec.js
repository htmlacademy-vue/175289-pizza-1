import { shallowMount } from "@vue/test-utils";
import AppButton from "@/common/components/AppButton";

describe("AppButton", () => {
  const arrowClass = "button--arrow";
  const borderClass = "button--border";

  const defaultType = "button";

  const propsData = {
    arrow: true,
    border: true,
    disabled: true,
    link: "",
    type: "submit",
  };

  const slots = {
    default: "Content",
  };

  const stubs = ["router-link"];

  const listeners = {
    click: null,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppButton, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("It emits a click event", () => {
    createComponent({ listeners });
    wrapper.find("button").trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });

  it("It does not emit a click event when it is disabled", () => {
    createComponent({ propsData, listeners });
    wrapper.find("button").trigger("click");
    expect(listeners.click).not.toHaveBeenCalled();
  });

  it("It has arrow class", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain(arrowClass);
  });

  it("It does not have arrow class", () => {
    propsData.arrow = false;
    createComponent({ propsData });
    expect(wrapper.attributes("class")).not.toContain(arrowClass);
  });

  it("It has border class", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain(borderClass);
  });

  it("It does not have border class", () => {
    propsData.border = false;
    createComponent({ propsData });
    expect(wrapper.attributes("class")).not.toContain(borderClass);
  });

  it("Its type is button", () => {
    createComponent();
    expect(wrapper.attributes("type")).toBe(defaultType);
  });

  it("Its type is submit", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("type")).toBe(propsData.type);
  });

  it("It is disabled", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("disabled")).toBe("disabled");
  });

  it("It is not disabled", () => {
    createComponent();
    expect(wrapper.attributes("disabled")).toBe(undefined);
  });

  it("It is a link", () => {
    propsData.link = "#";
    createComponent({ propsData, stubs });
    expect(wrapper.attributes("to")).toBe("#");
    expect(wrapper.attributes("type")).toBe(undefined);
  });
});
