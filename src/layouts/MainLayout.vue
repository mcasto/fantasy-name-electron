<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { useStore } from "stores/store";

  export default {
    name: "MainLayout",
    async mounted() {
      const store = useStore();
      await store.getOptions();
      store.initResults();
    },
  };
</script>
