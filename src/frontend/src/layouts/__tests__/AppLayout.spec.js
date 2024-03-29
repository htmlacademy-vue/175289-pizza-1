import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";

describe("AppLayout", () => {
  const mocks = {
    $route: {
      meta: {
        layout: "",
      },
    },
  };

  const slots = {
    default: "Content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ mocks, slots });
    expect(wrapper.exists()).toBeTruthy();
  });
});
