import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setBuilderData } from "@/common/helpers";
import builder from "@/store/mocks/data/builder";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import AppCounter from "@/common/components/AppCounter";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("BuilderIngredientsSelector", () => {
  const localVue = createLocalVue();
  localVue.component("AppCounter", AppCounter);
  localVue.component("AppDrag", AppDrag);
  localVue.component("AppDrop", AppDrop);
  localVue.component("AppRadioButton", AppRadioButton);
  localVue.use(Vuex);

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders sauce selectors", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const sauceSelectors = wrapper.findAll("[data-test='sauce']");
    expect(Array.from(sauceSelectors).length).toEqual(builder.sauces.length);
  });

  it("It emits a change-sauce event on sauce input change", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const radioButton = wrapper.find("[data-test='sauce']");
    radioButton.vm.$emit("change");
    expect(wrapper.emitted()["change-sauce"][0][0]).toEqual(builder.sauces[0]);
  });

  it("It renders filling selectors", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const fillingSelectors = wrapper.findAll("[data-test='filling']");
    expect(Array.from(fillingSelectors).length).toEqual(
      builder.ingredients.length
    );
  });

  it("It emits a change-ingredient event on filling counter change", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const counterInput = wrapper
      .find("[data-test='filling-counter']")
      .find("input");
    counterInput.element.value = 2;
    counterInput.trigger("input");
    expect(wrapper.emitted()["change-ingredient"][0][0]).toEqual({
      ingredient: builder.ingredients[0],
      quantity: 2,
    });
  });
});
