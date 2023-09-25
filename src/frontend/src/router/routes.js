export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    children: [
      {
        path: "/thanks",
        name: "Thanks",
        component: () => import("../views/Thanks.vue"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "AppLayoutSidebar" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "AppLayoutSidebar" },
  },
];
