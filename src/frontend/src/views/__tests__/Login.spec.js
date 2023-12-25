import { createLocalVue, mount } from "@vue/test-utils";
import validator from "@/common/mixins/validator";
import Login from "@/views/Login";
import AppInput from "@/common/components/AppInput";

describe("Login", () => {
  const localVue = createLocalVue();
  localVue.component("AppInput", AppInput);

  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $store: {
      dispatch: jest.fn(() => Promise.resolve()),
    },
    $validator: validator,
  };

  const stubs = ["router-link"];

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    mocks.$router.push = jest.fn();
    mocks.$store.dispatch = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It calls validation mixin on form submit", async () => {
    createComponent({ localVue, mocks, stubs });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const loginForm = wrapper.find("[data-test='login-form']");
    await loginForm.trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(mocks.$store.dispatch).not.toHaveBeenCalled();
  });

  it("It calls login and redirects to index if credentials are valid", async () => {
    createComponent({ localVue, mocks, stubs });
    const loginForm = wrapper.find("[data-test='login-form']");
    const emailInput = loginForm
      .find("[data-test='email-component']")
      .find("input");
    const passwordInput = loginForm
      .find("[data-test='password-component']")
      .find("input");

    emailInput.element.value = "my@mail.com";
    await emailInput.trigger("input");
    passwordInput.element.value = "password";
    await passwordInput.trigger("input");

    await loginForm.trigger("submit");
    await expect(mocks.$store.dispatch).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
