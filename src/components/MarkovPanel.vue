<template>
  <q-page>
    <output-table section="markov"></output-table>
  </q-page>
</template>

<script>
  import OutputTable from "components/OutputTable.vue";

  export default {
    name: "MarkovPanel",
    components: { OutputTable },
  };
</script>
