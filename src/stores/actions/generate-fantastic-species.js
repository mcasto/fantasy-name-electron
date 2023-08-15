import { useStore } from "../store";

export default () => {
  const store = useStore();

  window.api
    .invoke("generateFantasticSpecies", { ...store.config.fantasticSpecies })
    .then((data) => {
      store.output.fantasticSpecies = data;
    });
};
