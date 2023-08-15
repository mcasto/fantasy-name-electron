import { useStore } from "../store";

export default () => {
  const store = useStore();

  [
    "generateFantasticSpecies",
    "generateGroups",
    "generateMarkov",
    "generateFantasyName",
    "generateTaverns",
  ].forEach((action) => {
    store[action]();
  });
};
