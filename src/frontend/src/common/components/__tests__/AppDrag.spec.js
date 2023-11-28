import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrag", () => {
  const propsData = {
    draggable: true,
    transferData: {},
  };

  const slots = {
    default: "Content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ propsData, slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders out the slot content", () => {
    createComponent({ propsData, slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("It is draggable", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("draggable")).toBe("true");
  });

  it("It is not draggable", () => {
    propsData.draggable = false;
    createComponent({ propsData });
    expect(wrapper.attributes("draggable")).toBe("false");
  });
});
