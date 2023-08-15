<template>
  <q-toolbar class="flex justify-center bg-blue-grey-2">
    <q-tabs v-model="tab">
      <q-tab
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
        :label="item.label"
      ></q-tab>
    </q-tabs>

    <q-btn
      class="settings-button q-ml-sm q-mb-md"
      round
      icon="settings"
      flat
      @click="settingsDrawer = true"
      :disable="disableSettings"
      :color="disableSettings ? 'grey-6' : ''"
    ></q-btn>
  </q-toolbar>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapWritableState } from "pinia";

  import fantasticSpecies from "assets/header-icons/fantastic-species";
  import genericFantasy from "assets/header-icons/generic-fantasy";
  import groups from "assets/header-icons/groups";
  import markov from "assets/header-icons/markov";
  import taverns from "assets/header-icons/taverns";

  export default {
    name: "TopToolbar",
    data: () => ({
      tabs: [
        {
          name: "markov",
          icon: `img:${markov()}`,
          label: "Markov Chain",
        },
        {
          name: "generic-fantasy",
          icon: `img:${genericFantasy()}`,
          label: "Generic Fantasy",
        },
        {
          name: "fantastic-species",
          icon: `img:${fantasticSpecies()}`,
          label: "Fantastic Species",
        },
        {
          name: "groups",
          icon: `img:${groups()}`,
          label: "Groups",
        },
        {
          name: "taverns",
          icon: `img:${taverns()}`,
          label: "Taverns",
        },
      ],
    }),
    computed: {
      ...mapWritableState(useStore, ["config", "settingsDrawer", "tab"]),

      disableSettings() {
        return this.tab != "markov" && this.tab != "taverns";
      },
    },
  };
</script>
