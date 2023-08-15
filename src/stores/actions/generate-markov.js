import { useStore } from "../store";

export default () => {
  const store = useStore();

  window.api
    .invoke("generateMarkov", { ...store.config.markov })
    .then((data) => {
      store.output.markov = data;
    });
};
