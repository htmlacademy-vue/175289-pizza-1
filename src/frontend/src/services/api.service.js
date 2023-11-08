import store from "@/store";
import axios from "@/plugins/axios";
import JwtService from "@/services/jwt.service";
import Resources from "@/common/enums/resources";
import { getPizzaPrice } from "@/common/helpers";

class ApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends ApiService {
  constructor(notifier) {
    super(notifier);
  }

  login(data) {
    return axios.post("login", data);
  }

  logout() {
    return axios.delete("logout");
  }

  getMe() {
    return axios.get("whoAmI");
  }

  setAuthHeader() {
    const token = JwtService.getToken();

    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }
}

export class ReadOnlyApiService extends ApiService {
  #resource;

  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  /**
   * Запрос на получения списка сущностей
   */
  query() {
    return axios.get(this.#resource);
  }

  /**
   * Запрос на получения одной сущности
   */
  get(id) {
    return axios.get(`${this.#resource}/${id}`);
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;

  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  /**
   * Запрос на создание сущности
   */
  post(data) {
    return axios.post(this.#resource, data);
  }

  /**
   * Запрос на обновление сущности
   */
  put(data) {
    return axios.put(`${this.#resource}/${data.id}`, data);
  }

  /**
   * Запрос на удаление сущности
   */
  delete(id) {
    return axios.delete(`${this.#resource}/${id}`);
  }
}

export class OrdersApiService extends CrudApiService {
  constructor(notifier) {
    super(Resources.ORDERS, notifier);
  }

  _normalizeToClient({ addressId, id, orderPizzas, orderMisc, orderAddress, phone }) {
    const normalizePizza = (pizza) => {
      const adaptPizza = {
        ...pizza,
        dough: store.state.Builder.data.dough.find(({ id }) => id === pizza.doughId),
        ingredients: pizza.ingredients.map(({ ingredientId, quantity }) => ({
          ...store.state.Builder.data.ingredients.find(({id}) => id === ingredientId),
          quantity,
        })),
        sauce: store.state.Builder.data.sauces.find(({ id }) => id === pizza.sauceId),
        size: store.state.Builder.data.sizes.find(({ id }) => id === pizza.sizeId),
      };

      adaptPizza.price = getPizzaPrice(adaptPizza);

      delete adaptPizza.doughId;
      delete adaptPizza.sauceId;
      delete adaptPizza.sizeId;

      return adaptPizza;
    };

    const normalizeMisc = (misc) => ({
      ...store.state.Misc.misc.find(({ id }) => id === misc.miscId),
      quantity: misc.quantity,
    });

    const adaptOrder = {
      addressId,
      id,
      pizzas: orderPizzas.map(normalizePizza),
      misc: orderMisc?.map(normalizeMisc),
      address: orderAddress,
      phone,
    };

    if (!adaptOrder.misc) {
      delete adaptOrder.misc;
    }

    if (!adaptOrder.address) {
      delete adaptOrder.address;
    }

    return adaptOrder;
  }

  _normalizeToServer({ userId, phone, address, pizzas, misc }) {
    const normalizePizza = (pizza) => ({
      name: pizza.name,
      sauceId: pizza.sauce.id,
      doughId: pizza.dough.id,
      sizeId: pizza.size.id,
      quantity: pizza.quantity,
      ingredients: pizza.ingredients.map(({ id, quantity}) => ({
        ingredientId: id,
        quantity,
      })),
    });

    const normalizeMisc = ({ id, quantity }) => ({
      miscId: id,
      quantity,
    });

    return {
      userId,
      phone,
      address,
      pizzas: pizzas.map(normalizePizza),
      misc: misc.map(normalizeMisc),
    };
  }

  query() {
    return super.query().then(({ data }) => data.map(this._normalizeToClient));
  }

  post(data) {
    return super.post(this._normalizeToServer(data));
  }
}
