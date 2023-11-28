import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { setUser } from "@/common/helpers";
import { generateMockStore } from "@/store/mocks";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

describe("AppLayoutHeader", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mocks = {
    $notifier: {
      success: jest.fn(),
    },
    $router: {
      push: jest.fn(),
    },
    $store: {
      dispatch: jest.fn(),
    },
  };

  const stubs = ["router-link"];

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
    mocks.$store.dispatch = jest.fn(() => Promise.resolve());
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders user buttons", () => {
    setUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const userButtons = wrapper.find("[data-test='user-buttons']");
    expect(userButtons.exists()).toBeTruthy();
  });

  it("It does not render user buttons", () => {
    createComponent({ localVue, store, mocks, stubs });
    const userButtons = wrapper.find("[data-test='user-buttons']");
    expect(userButtons.exists()).toBeFalsy();
  });

  it("It calls logout on logout button click", async () => {
    setUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const logoutButton = wrapper.find("[data-test='logout-button']");
    await logoutButton.trigger("click");
    // ToDo: не работает, не понимаю что не так
    expect(mocks.$store.dispatch).toHaveBeenCalled();
    expect(mocks.$notifier.success).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalled();
  });

  it("It renders login button", () => {
    createComponent({ localVue, store, mocks, stubs });
    const loginButton = wrapper.find("[data-test='login-button']");
    expect(loginButton.exists()).toBeTruthy();
  });

  it("It does not render login button", () => {
    setUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const loginButton = wrapper.find("[data-test='login-button']");
    expect(loginButton.exists()).toBeFalsy();
  });
});
