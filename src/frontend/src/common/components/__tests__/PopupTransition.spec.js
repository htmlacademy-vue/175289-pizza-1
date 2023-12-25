import { shallowMount } from "@vue/test-utils";
import PopupTransition from "@/common/components/PopupTransition";

describe("PopupTransition", () => {
  const slots = {
    default: "Content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(PopupTransition, options);
  };

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
});
