import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setBuilderData } from "@/common/helpers";
import builder from "@/store/mocks/data/builder";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

describe("BuilderDoughSelector", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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

  it("It renders dough selectors", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const selectors = wrapper.findAll("[data-test='dough']");
    expect(Array.from(selectors).length).toEqual(builder.dough.length);
  });

  it("It emits a change-dough event on dough input change", () => {
    setBuilderData(store);
    createComponent({ localVue, store });
    const input = wrapper.find("[data-test='dough-input']");
    input.trigger("change");
    expect(wrapper.emitted()["change-dough"][0][0]).toEqual(builder.dough[0]);
  });
});
