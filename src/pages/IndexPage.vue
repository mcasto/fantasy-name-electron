<template>
  <q-splitter v-model="splitterModel">
    <template #before>
      <options-panel></options-panel>
    </template>

    <template #after>
      <top-toolbar></top-toolbar>

      <q-tab-panels v-model="tab">
        <q-tab-panel name="markov">
          <markov-panel></markov-panel>
        </q-tab-panel>
        <q-tab-panel name="generic-fantasy">
          <generic-fantasy-panel></generic-fantasy-panel>
        </q-tab-panel>
        <q-tab-panel name="fantastic-species">
          <fantastic-species-panel></fantastic-species-panel>
        </q-tab-panel>
        <q-tab-panel name="groups">
          <groups-panel></groups-panel>
        </q-tab-panel>
        <q-tab-panel name="taverns">
          <taverns-panel></taverns-panel>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>

  <q-drawer
    side="right"
    bordered
    overlay
    ref="rightDrawer"
    v-model="settingsDrawer"
    v-if="tab == 'markov' || tab == 'taverns'"
  >
    <q-toolbar class="border-bottom">
      <q-toolbar-title>
        Settings
      </q-toolbar-title>
      <q-btn round flat icon="close" @click="settingsDrawer = false"></q-btn>
    </q-toolbar>
    <settings-form></settings-form>
  </q-drawer>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapActions, mapWritableState } from "pinia";
  import { startCase } from "lodash";

  import OptionsPanel from "components/OptionsPanel.vue";
  import TopToolbar from "components/TopToolbar.vue";
  import SettingsForm from "components/SettingsForm.vue";
  import FantasticSpeciesPanel from "components/FantasticSpeciesPanel.vue";
  import GenericFantasyPanel from "components/GenericFantasyPanel.vue";
  import GroupsPanel from "components/GroupsPanel.vue";
  import MarkovPanel from "components/MarkovPanel.vue";
  import TavernsPanel from "components/TavernsPanel.vue";

  export default {
    name: "IndexPage",
    components: {
      FantasticSpeciesPanel,
      GenericFantasyPanel,
      GroupsPanel,
      MarkovPanel,
      OptionsPanel,
      SettingsForm,
      TavernsPanel,
      TopToolbar,
    },
    data: () => ({
      splitterModel: 25,
    }),
    computed: {
      ...mapWritableState(useStore, ["output", "settingsDrawer", "tab"]),
    },
    watch: {
      tab() {
        if (this.tab != "markov" && this.tab != "taverns")
          this.settingsDrawer = false;
      },
    },
    methods: {
      ...mapActions(useStore, ["getOptions"]),
    },
    mounted() {
      this.getOptions();
    },
  };
</script>
