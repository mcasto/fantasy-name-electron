<template>
  <q-page>
    <output-table section="groups"></output-table>
  </q-page>
</template>

<script>
  import OutputTable from "components/OutputTable.vue";

  export default {
    name: "GroupsPanel",
    components: { OutputTable },
  };
</script>
