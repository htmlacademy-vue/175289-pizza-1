import jwtService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";

export default function (store) {
  store.$api = createResources();
  store.$jwt = jwtService;
}
