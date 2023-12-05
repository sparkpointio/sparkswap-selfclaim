import superjson from "superjson";
import {SuperJSONValue} from "superjson/dist/types";

export const serialize = (object: SuperJSONValue, includeMeta = false) => {
  const serialized = superjson.serialize(object)

  if (includeMeta) {
      return serialized
  }

  return serialized.json
}
