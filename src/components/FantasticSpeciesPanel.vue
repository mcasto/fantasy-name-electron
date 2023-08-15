<template>
  <q-page>
    <output-table section="fantasticSpecies"></output-table>
  </q-page>
</template>

<script>
  import OutputTable from "components/OutputTable.vue";

  export default {
    name: "FantasticSpeciesPanel",
    components: { OutputTable },
  };
</script>
