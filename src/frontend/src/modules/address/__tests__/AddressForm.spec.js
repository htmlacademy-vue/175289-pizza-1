import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setUser } from "@/common/helpers";
import addresses from "@/store/mocks/data/addresses";
import validator from "@/common/mixins/validator";
import AddressForm from "@/modules/address/components/AddressForm";
import AppInput from "@/common/components/AppInput";

const address = addresses.at(0);

describe("AddressForm", () => {
  const localVue = createLocalVue();
  localVue.component("AppInput", AppInput);
  localVue.use(Vuex);

  const mocks = {
    $validator: validator,
  };

  const propsData = {
    addressToEdit: address,
    number: 1,
  };

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AddressForm, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        delete: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
      },
    };
    propsData.addressToEdit = address;
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It is rendered", () => {
    createComponent({ localVue, store, mocks, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It renders edit button", () => {
    createComponent({ localVue, store, mocks, propsData });
    const editButton = wrapper.find("[data-test='edit-button']");
    expect(editButton.exists()).toBeTruthy();
  });

  it("It does not render edit button when edit address", async () => {
    createComponent({ localVue, store, mocks, propsData });
    let editButton = wrapper.find("[data-test='edit-button']");
    await editButton.trigger("click");
    // ToDo: если еще раз не найти элемент, то проверка работает неправильно, как будто exists не учитывает изменения в рендеринге. Это правильное решение?
    editButton = wrapper.find("[data-test='edit-button']");
    expect(editButton.exists()).toBeFalsy();
  });

  it("It does not render edit button when add address", () => {
    propsData.addressToEdit = undefined;
    createComponent({ localVue, store, mocks, propsData });
    const editButton = wrapper.find("[data-test='edit-button']");
    expect(editButton.exists()).toBeFalsy();
  });

  it("It renders form on click to edit button", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const editButton = wrapper.find("[data-test='edit-button']");
    await editButton.trigger("click");
    const addressForm = wrapper.find("[data-test='address-form']");
    expect(addressForm.exists()).toBeTruthy();
  });

  it("It renders form when add address", () => {
    propsData.addressToEdit = undefined;
    createComponent({ localVue, store, mocks, propsData });
    const addressForm = wrapper.find("[data-test='address-form']");
    expect(addressForm.exists()).toBeTruthy();
  });

  it("It does not render form", () => {
    createComponent({ localVue, store, mocks, propsData });
    const addressForm = wrapper.find("[data-test='address-form']");
    expect(addressForm.exists()).toBeFalsy();
  });

  it("It calls validation mixin on form submit", async () => {
    propsData.addressToEdit = undefined;
    createComponent({ localVue, store, mocks, propsData });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const addressForm = wrapper.find("[data-test='address-form']");
    await addressForm.trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(actions.Addresses.post).not.toHaveBeenCalled();
  });

  it("It adds address when form is valid", async () => {
    propsData.addressToEdit = undefined;
    setUser(store);
    createComponent({ localVue, store, mocks, propsData });
    const addressForm = wrapper.find("[data-test='address-form']");
    const nameInput = addressForm
      .find("[data-test='name-component']")
      .find("input");
    const streetInput = addressForm
      .find("[data-test='street-component']")
      .find("input");
    const buildingInput = addressForm
      .find("[data-test='building-component']")
      .find("input");

    nameInput.element.value = "Test name";
    await nameInput.trigger("input");
    streetInput.element.value = "Test street";
    await streetInput.trigger("input");
    buildingInput.element.value = "Test building";
    await buildingInput.trigger("input");

    await addressForm.trigger("submit");
    expect(actions.Addresses.post).toHaveBeenCalled();
  });

  it("It updates address", async () => {
    setUser(store);
    createComponent({ localVue, store, mocks, propsData });
    const editButton = wrapper.find("[data-test='edit-button']");
    await editButton.trigger("click");
    const addressForm = wrapper.find("[data-test='address-form']");
    const nameInput = addressForm
      .find("[data-test='name-component']")
      .find("input");

    nameInput.element.value = "Test name";
    await nameInput.trigger("input");

    await addressForm.trigger("submit");
    expect(actions.Addresses.put).toHaveBeenCalled();
  });

  it("It deletes address", async () => {
    setUser(store);
    createComponent({ localVue, store, mocks, propsData });
    const editButton = wrapper.find("[data-test='edit-button']");
    await editButton.trigger("click");
    const deleteButton = wrapper.find("[data-test='delete-button']");
    await deleteButton.trigger("click");
    expect(actions.Addresses.delete).toHaveBeenCalled();
  });
});
