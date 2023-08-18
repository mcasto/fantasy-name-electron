<template>
  <q-toolbar>
    <q-toolbar-title>
      {{ title }}
    </q-toolbar-title>
    <q-space></q-space>
    <q-btn icon="refresh" round flat @click="refresh"></q-btn>
  </q-toolbar>
  <q-markup-table v-if="output[section]">
    <tbody>
      <tr v-for="row in rows" :key="row">
        <td v-for="(col, index) in row" :key="`${col}-${index}`">
          {{ col }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapState } from "pinia";
  import { camelCase, kebabCase } from "lodash";

  export default {
    props: ["section"],
    computed: {
      ...mapState(useStore, [
        "config",
        "fantasticSpecies",
        "groups",
        "markov",
        "output",
      ]),
      columns() {
        return this.sectionColumns[this.section];
      },
      rows() {
        const recs = [...this.output[this.section]];
        const numRows = Math.ceil(
          recs.length / this.sectionColumns[this.section]
        );

        let row,
          retRows = [];

        for (let r = 0; r < numRows; r++) {
          row = [];
          for (let c = 0; c < this.sectionColumns[this.section]; c++) {
            row.push(recs.shift());
          }

          retRows.push(row);
        }

        return retRows;
      },
      title() {
        if (this.section == "fantasticSpecies") {
          if (!this.fantasticSpecies) return "";
          const species = this.config.fantasticSpecies.species;

          const item = this.fantasticSpecies
            .filter((rec) => rec.species == kebabCase(species))
            .shift();

          return item.name;
        }

        if (this.section == "groups") {
          if (!this.groups) return "";
          const group = this.config.groups.group;
          const item = this.groups.filter((rec) => rec.group == group).shift();
          return item.name;
        }

        if (this.section == "markov") {
          if (!this.markov) return "";
          const name = this.config.markov.name;
          const item = this.markov.filter((rec) => rec.name == name).shift();
          return item.title;
        }

        return "test";
      },
    },
    methods: {
      refresh() {
        const store = useStore();
        const actionName = camelCase(`generate ${this.section}`);
        store[actionName]();
      },
    },
    created() {
      this.sectionColumns = {
        markov: 5,
        fantasyName: 4,
        fantasticSpecies: 4,
        groups: 3,
        taverns: 3,
      };
    },
  };
</script>
