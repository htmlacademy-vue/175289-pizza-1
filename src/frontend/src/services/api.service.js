import axios from "@/plugins/axios";
import JwtService from "@/services/jwt.service";

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
