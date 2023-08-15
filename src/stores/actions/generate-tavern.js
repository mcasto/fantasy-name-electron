import { useStore } from "../store";

export default () => {
  const store = useStore();

  window.api
    .invoke("generateTavern", { ...store.config.taverns })
    .then((data) => {
      store.output.taverns = data;
    });
};
