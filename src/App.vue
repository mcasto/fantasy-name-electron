<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    async mounted() {
      await window.api.invoke("initDatabase");
    },
  };
</script>
