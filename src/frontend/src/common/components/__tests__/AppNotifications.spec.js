import { shallowMount } from "@vue/test-utils";
import AppNotifications from "@/common/components/AppNotifications";

describe("AppNotifications", () => {
  const successClass = "notification--success";
  const errorClass = "notification--error";

  const mocks = {
    $store: {
      state: {
        notifications: [],
      },
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppNotifications, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
  });

  it("It does not render out when we don't have notifications", () => {
    createComponent({ mocks });
    expect(wrapper.html()).toBeFalsy();
  });

  it("It renders out when we have notifications", () => {
    mocks.$store.state.notifications = [{ text: "Text" }];
    createComponent({ mocks });
    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.html()).toContain("Text");
  });

  it("It has success class", () => {
    mocks.$store.state.notifications = [{ type: "success" }];
    createComponent({ mocks });
    const notification = wrapper.find(".notification");
    expect(notification.attributes("class")).toContain(successClass);
  });

  it("It has error class", () => {
    mocks.$store.state.notifications = [{ type: "error" }];
    createComponent({ mocks });
    const notification = wrapper.find(".notification");
    expect(notification.attributes("class")).toContain(errorClass);
  });
});
