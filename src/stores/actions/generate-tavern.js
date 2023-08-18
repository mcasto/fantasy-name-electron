import { useStore } from "../store";
import { Notify } from "quasar";

export default () => {
  const store = useStore();

  window.api
    .invoke("generateTavern", { ...store.config.taverns })
    .then((data) => {
      if (data.error) {
        Notify.create({ message: data.error, color: "red" });
        return;
      }
      store.output.taverns = data;
    });
};
