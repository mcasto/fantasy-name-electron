import { useStore } from "../store";

export default () => {
  const store = useStore();

  window.api
    .invoke("generateFantasyName", { ...store.config.fantasyName })
    .then((data) => {
      store.output.fantasyName = data;
    });
};
