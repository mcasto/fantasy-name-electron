<template>
  <q-page>
    <output-table section="fantasyName"></output-table>
  </q-page>
</template>

<script>
  import OutputTable from "components/OutputTable.vue";

  export default {
    name: "GenericFantasyPanel",
    components: { OutputTable },
  };
</script>
