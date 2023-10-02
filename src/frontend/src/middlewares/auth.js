export default function auth({ next, store, nextMiddleware }) {
  if (!store.state.Auth.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      store.$api.auth.setAuthHeader();
      store.dispatch("Auth/getMe");
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}
