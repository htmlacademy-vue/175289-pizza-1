import { shallowMount } from "@vue/test-utils";
import AppDrop from "@/common/components/AppDrop";

describe("AppDrop", () => {
  const slots = {
    default: "Content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppDrop, options);
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
