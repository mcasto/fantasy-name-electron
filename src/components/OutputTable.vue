<template>
  <q-page>
    <q-toolbar>
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
  </q-page>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapState } from "pinia";
  import { camelCase } from "lodash";

  export default {
    props: ["section"],
    computed: {
      ...mapState(useStore, [ "output"]),
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
