import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const object = {};

  for (let key of params.keys()) {
    if (params.getAll(key).length > 1) {
      object[key] = params.getAll(key);
    } else {
      object[key] = params.get(key);
    }
  }
  return object;
};
