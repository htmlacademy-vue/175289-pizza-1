import { shallowMount } from "@vue/test-utils";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

describe("AppLayoutSidebar", () => {
  const slots = {
    default: "Content",
  };

  const stubs = ["router-link"];

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ slots, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders out the slot content", () => {
    createComponent({ slots, stubs });
    expect(wrapper.html()).toContain(slots.default);
  });
});
