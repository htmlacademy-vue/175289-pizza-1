import jwtService from "@/services/jwt.service";
import Notifier from "@/plugins/notifier";
import { createResources } from "@/common/helpers";

export default function (store) {
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
  store.$jwt = jwtService;
}
