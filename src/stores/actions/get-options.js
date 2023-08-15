import { useStore } from "../store";
import { camelCase } from "lodash";

export default async () => {
  const store = useStore();

  ["markov", "groups", "fantastic species"].forEach((section) => {
    const storeProp = camelCase(section);
    const handler = camelCase(`get ${section}`);

    return window.api.invoke(handler).then((options) => {
      store[storeProp] = options;
    });
  });
};
