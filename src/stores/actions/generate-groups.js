import { useStore } from "../store";

export default () => {
  const store = useStore();

  window.api
    .invoke("generateGroups", { ...store.config.groups })
    .then((data) => {
      store.output.groups = data;
    });
};
