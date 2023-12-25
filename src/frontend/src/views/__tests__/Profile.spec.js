import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setAddresses, setUser } from "@/common/helpers";
import addresses from "@/store/mocks/data/addresses";
import Profile from "@/views/Profile";
import AppInput from "@/common/components/AppInput.vue";

describe("Profile", () => {
  const localVue = createLocalVue();
  localVue.component("AppInput", AppInput);
  localVue.use(Vuex);

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    setUser(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders addresses list", () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store });
    const addressesList = wrapper.findAll("[data-test='address']");
    expect(Array.from(addressesList).length).toEqual(addresses.length);
  });

  it("It renders add address button", () => {
    setUser(store);
    createComponent({ localVue, store });
    const addAddressButton = wrapper.find("[data-test='add-address-button']");
    expect(addAddressButton.isVisible()).toBeTruthy();
  });

  it("It does not render add address button", async () => {
    setUser(store);
    createComponent({ localVue, store });
    const addAddressButton = wrapper.find("[data-test='add-address-button']");
    await addAddressButton.trigger("click");
    expect(addAddressButton.isVisible()).toBeFalsy();
  });

  it("It renders add address form on button click", async () => {
    setUser(store);
    createComponent({ localVue, store });
    const addAddressButton = wrapper.find("[data-test='add-address-button']");
    await addAddressButton.trigger("click");
    const addAddressForm = wrapper.find("[data-test='add-address-form']");
    expect(addAddressForm.isVisible()).toBeTruthy();
  });

  it("It does not render add address form", () => {
    setUser(store);
    createComponent({ localVue, store });
    const addAddressForm = wrapper.find("[data-test='add-address-form']");
    expect(addAddressForm.isVisible()).toBeFalsy();
  });
});
