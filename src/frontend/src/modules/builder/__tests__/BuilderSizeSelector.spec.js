import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setBuilderData } from "@/common/helpers";
import builder from "@/store/mocks/data/builder";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

describe("BuilderSizeSelector", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
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

  it("It renders size selectors", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const selectors = wrapper.findAll("[data-test='size']");
    expect(Array.from(selectors).length).toEqual(builder.sizes.length);
  });

  it("It emits a change-size event on size input change", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const input = wrapper.find("[data-test='size-input']");
    input.trigger("change");
    expect(wrapper.emitted()["change-size"][0][0]).toEqual(builder.sizes[0]);
  });
});
