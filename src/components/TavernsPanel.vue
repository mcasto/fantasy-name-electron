<template>
  <q-page>
    <output-table section="taverns"></output-table>
  </q-page>
</template>

<script>
  import OutputTable from "components/OutputTable.vue";

  export default {
    name: "TavernsPanel",
    components: { OutputTable },
  };
</script>
