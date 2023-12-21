import { auth, guest } from "@/middlewares";
import { AppRoute } from "@/common/constants";

export default [
  {
    path: AppRoute.MAIN,
    name: "Index",
    component: () => import("../views/index/Index.vue"),
    children: [
      {
        path: AppRoute.LOGIN,
        name: "Login",
        component: () => import("../views/index/^Login.vue"),
        meta: {
          middlewares: [guest],
        },
      },
    ],
  },
  {
    path: AppRoute.CART,
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: AppRoute.ORDERS,
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
  {
    path: AppRoute.PROFILE,
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
];
