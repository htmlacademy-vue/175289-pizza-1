import {
  capitalize,
  formatPrice,
  getPizzaPrice,
  getOrderPrice,
} from "@/common/helpers";
import orders from "@/store/mocks/data/orders";
import pizzas from "@/store/mocks/data/pizzas";

describe("Helpers", () => {
  it("capitalize", () => {
    expect(capitalize("test")).toBe("Test");
    expect(capitalize("test test")).toBe("Test test");
  });

  it("formatPrice", () => {
    expect(formatPrice(100)).toBe("100");
    expect(formatPrice(1000)).toBe("1 000");
    expect(formatPrice(100000)).toBe("100 000");
    expect(formatPrice(100000.1)).toBe("100 000");
    expect(formatPrice(100000.9)).toBe("100 001");
  });

  it("getOrderPrice", () => {
    expect(getOrderPrice(orders[0])).toBe(2955);
  });

  it("getPizzaPrice", () => {
    expect(getPizzaPrice(pizzas[0])).toBe(920);
    expect(getPizzaPrice(pizzas[1])).toBe(1743);
  });
});
