import { mount } from "@vue/test-utils";
import CartPopup from "@/modules/cart/components/CartPopup";

describe("CartPopup", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartPopup, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It emits close event on click", () => {
    createComponent();
    const button = wrapper.find("[data-test='dialog']");
    button.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("It emits close event on escape", () => {
    createComponent();
    const button = wrapper.find("[data-test='dialog']");
    button.trigger("keydown.esc");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("It emits close event on click to close button", () => {
    createComponent();
    const button = wrapper.find("[data-test='close-button']");
    button.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("It emits close event on click to dialog button", () => {
    createComponent();
    const button = wrapper.find("[data-test='dialog-button']");
    button.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
