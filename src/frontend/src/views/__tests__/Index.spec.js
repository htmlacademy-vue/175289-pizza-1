import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setBuilderData, setBuilderPizza } from "@/common/helpers";
import { dough, sizes, sauces, ingredients } from "@/store/mocks/data/builder";
import Index from "@/views/Index.vue";
import AppButton from "@/common/components/AppButton";
import AppCounter from "@/common/components/AppCounter.vue";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("Index", () => {
  const localVue = createLocalVue();
  localVue.component("AppButton", AppButton);
  localVue.component("AppCounter", AppCounter);
  localVue.component("AppDrag", AppDrag);
  localVue.component("AppDrop", AppDrop);
  localVue.component("AppRadioButton", AppRadioButton);
  localVue.use(Vuex);

  const stubs = ["router-view"];

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        updateCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It updates pizza dough on dough change", () => {
    setBuilderData(store);
    createComponent({ localVue, store, stubs });
    const spyUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const doughSelector = wrapper.find('[data-test="dough-selector"]');
    doughSelector.vm.$emit("change-dough", dough.at(0));
    expect(spyUpdatePizza).toHaveBeenCalledWith({ dough: dough.at(0) });
  });

  it("It updates pizza size on size change", () => {
    setBuilderData(store);
    createComponent({ localVue, store, stubs });
    const spyUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const sizeSelector = wrapper.find('[data-test="size-selector"]');
    sizeSelector.vm.$emit("change-size", sizes.at(0));
    expect(spyUpdatePizza).toHaveBeenCalledWith({ size: sizes.at(0) });
  });

  it("It updates pizza sauce on sauce change", () => {
    setBuilderData(store);
    createComponent({ localVue, store, stubs });
    const spyUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const ingredientsSelector = wrapper.find(
      '[data-test="ingredients-selector"]'
    );
    ingredientsSelector.vm.$emit("change-sauce", sauces.at(0));
    expect(spyUpdatePizza).toHaveBeenCalledWith({ sauce: sauces.at(0) });
  });

  it("It updates pizza on ingredient change", () => {
    setBuilderData(store);
    createComponent({ localVue, store, stubs });
    const spyUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");

    const ingredientsSelector = wrapper.find(
      '[data-test="ingredients-selector"]'
    );
    ingredientsSelector.vm.$emit("change-ingredient", {
      ingredient: ingredients.at(0),
      quantity: 2,
    });
    expect(spyUpdatePizza).toHaveBeenCalledWith({
      ingredients: [{ ...ingredients.at(0), quantity: 2 }],
    });
  });

  it("It updates pizza on ingredient move", () => {
    setBuilderData(store);
    createComponent({ localVue, store, stubs });
    const spyUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const view = wrapper.find('[data-test="view"]');
    view.vm.$emit("drop", ingredients.at(0));
    expect(spyUpdatePizza).toHaveBeenCalledWith({
      ingredients: [{ ...ingredients.at(0), quantity: 1 }],
    });
  });

  it("It updates pizza name on name change", async () => {
    createComponent({ localVue, store, stubs });
    const spyUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const nameInput = wrapper.find('[data-test="name-input"]');
    nameInput.element.value = "Test";
    await nameInput.trigger("input");
    expect(spyUpdatePizza).toHaveBeenCalledWith({ name: "Test" });
  });

  it("It does not add pizza to cart", async () => {
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="button"]');
    await button.trigger("click");
    expect(actions.Cart.updateCart).not.toHaveBeenCalled();
  });

  it("It adds pizza to cart", async () => {
    setBuilderPizza(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="button"]');
    await button.trigger("click");
    expect(actions.Cart.updateCart).toHaveBeenCalled();
  });
});
