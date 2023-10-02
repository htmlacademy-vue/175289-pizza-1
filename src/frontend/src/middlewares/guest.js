export default function guest({ next, store, nextMiddleware }) {
  if (store.$jwt.getToken()) {
    next("/");
  }
  return nextMiddleware();
}
