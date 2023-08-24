import { defineStore } from "pinia";

import generateFantasticSpecies from "./actions/generate-fantastic-species";
import generateGroups from "./actions/generate-groups";
import generateMarkov from "./actions/generate-markov";
import generateFantasyName from "./actions/generate-fantasy-name";
import generateTaverns from "./actions/generate-tavern";
import getOptions from "./actions/get-options";
import initResults from "./actions/init-results";

export const useStore = defineStore("store", {
  state: () => ({
    fantasticSpecies: null,
    groups: null,
    markov: null,
    tab: "markov",
    settingsDrawer: false,
    config: {
      markov: {
        showSettings: true,
        dictionary: "ancientGreekCities",
        num: 30,
        startsWithString: "",
        endsWithString: "",
        doesContain: "",
        doesNotContain: "",
        minLength: 4,
        maxLength: 11,
        order: 3,
      },
      fantasyName: {
        num: 30,
      },
      fantasticSpecies: {
        species: "alterativeFemaleDarkElf",
        num: 30,
      },
      groups: {
        type: "militaryUnit",
        num: 30,
      },
      taverns: {
        showSettings: true,
        num: 30,
        startsWithString: "",
        endsWithString: "",
        doesContain: "",
        doesNotContain: "",
      },
    },
    output: {
      markov: null,
      fantasyName: null,
      fantasticSpecies: null,
      groups: null,
      taverns: null,
    },
  }),
  actions: {
    generateFantasticSpecies,
    generateGroups,
    generateMarkov,
    generateFantasyName,
    generateTaverns,
    getOptions,
    initResults,
  },
});
