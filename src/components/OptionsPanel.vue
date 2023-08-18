<template>
  <q-toolbar>
    <q-toolbar-title>
      {{ title }}
    </q-toolbar-title>
  </q-toolbar>
  <q-input
    type="number"
    label="Number to Generate"
    class="q-mx-lg"
    v-model="config[storeProp].num"
  ></q-input>

  <div class="text-h5 q-mt-lg q-mx-md q-mb-sm" v-if="options">
    Generation Type

    <q-input
      type="text"
      v-model="search"
      label="Search"
      clearable
      class="q-mr-lg"
      @keydown.esc="search = null"
    ></q-input>
  </div>
  <div style="height: 600px; overflow-y: scroll;" v-if="options">
    <q-list dense separator>
      <q-item
        clickable
        v-for="option in options"
        :key="option._id"
        @click="handleGenerator(option)"
      >
        {{ option.title }}
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapActions, mapState, mapWritableState } from "pinia";
  import { camelCase, startCase } from "lodash";

  export default {
    name: "OptionsPanel",
    data: () => ({
      search: null,
    }),
    computed: {
      ...mapState(useStore, ["tab"]),
      ...mapWritableState(useStore, ["config"]),
      storeProp() {
        const propName =
          this.tab == "generic-fantasy" ? "fantasy-name" : this.tab;
        return camelCase(propName);
      },
      options() {
        const store = useStore();

        if (!store[this.storeProp]) return null;

        return store[this.storeProp]
          .map((option) => {
            return { ...option, title: startCase(option.name) };
          })
          .filter((option) => {
            if (!this.search) return true;

            return option.name
              .toLowerCase()
              .includes(this.search.toLowerCase());
          });
      },
      title() {
        return startCase(this.tab);
      },
    },
    methods: {
      ...mapActions(useStore, [
        "generateFantasticSpecies",
        "generateGroups",
        "generateMarkov",
      ]),
      handleGenerator(option) {
        const fields = {
          fantasticSpecies: "species",
          groups: "group",
          markov: "name",
        };

        const field = fields[camelCase(this.tab)];
        const value = option[fields[camelCase(this.tab)]];

        this.config[camelCase(this.tab)][field] = value;

        const storeAction = camelCase(`generate ${this.tab}`);

        this[storeAction]();
      },
    },
  };
</script>
