import notificationTypes from "@/common/enums/notificationTypes";

export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  success(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: notificationTypes.SUCCESS,
    });
  }

  error(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: notificationTypes.ERROR,
    });
  }
}
