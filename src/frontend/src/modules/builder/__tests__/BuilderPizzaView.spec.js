import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setBuilderPizza } from "@/common/helpers";
import pizzas from "@/store/mocks/data/pizzas";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppDrop from "@/common/components/AppDrop";

const pizza = pizzas[0];
const pizzaFillingsCount = pizza.ingredients.reduce(
  (accumulator, { quantity }) => accumulator + quantity,
  0
);

describe("BuilderPizzaView", () => {
  const localVue = createLocalVue();
  localVue.component("AppDrop", AppDrop);
  localVue.use(Vuex);

  const stubs = ["transition-group"];

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders filling", () => {
    setBuilderPizza(store);
    createComponent({ localVue, store, stubs });
    const filling = wrapper.findAll("[data-test='pizza-filling']");
    expect(Array.from(filling).length).toEqual(pizzaFillingsCount);
  });
});
