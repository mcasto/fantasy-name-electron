import { useStore } from "../store";
import { Notify } from "quasar";
import { cloneDeep } from "lodash";

export default () => {
  const store = useStore();

  const config = cloneDeep(store.config.markov);

  window.api.invoke("generateMarkov", config).then((data) => {
    if (data.error) {
      Notify.create({ message: data.error, color: "red" });
      return;
    }
    store.output.markov = data;
  });
};
