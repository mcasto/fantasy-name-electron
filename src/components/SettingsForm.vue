<template>
  <q-form class="q-mx-md">
    <div v-if="tab == 'markov'">
      <q-field
        outlined
        :label="`Min/Max Length (${strLen.min} - ${strLen.max})`"
        stack-label
        class="q-my-md"
      >
        <q-range v-model="strLen" :min="3" :max="15"></q-range>
      </q-field>
      <q-field
        outlined
        label="Markov Order"
        stack-label
        class="q-my-md"
        style="position: relative;"
      >
        <q-slider v-model="markovOrder" :min="1" :max="5"></q-slider>
        <q-icon
          name="question_mark"
          style="position: absolute; top: 12px; right: 0;"
        >
          <q-tooltip
            v-model="orderTooltip"
            anchor="top end"
            self="center middle"
          >
            Define the amount of characters<br />
            'looked back' by the algorithm.<br />
            Set lower values to generate more<br />
            random results.
          </q-tooltip>
        </q-icon>
      </q-field>
    </div>

    <q-input type="text" label="Start With" v-model="startWith"></q-input>
    <q-input type="text" label="End With" v-model="endWith"></q-input
    ><q-input type="text" label="Contains" v-model="doesContain"></q-input
    ><q-input
      type="text"
      label="Does Not Contain"
      v-model="doesNotContain"
    ></q-input>
    <q-btn @click="regenerate" class="q-mt-lg">Regenerate</q-btn>
  </q-form>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapState, mapWritableState } from "pinia";
  import { camelCase } from "lodash";

  export default {
    data: () => ({
      strLen: { min: 4, max: 11 },
      markovOrder: 3,
      startWith: null,
      endWith: null,
      doesContain: null,
      doesNotContain: null,
      orderTooltip: false,
    }),
    computed: {
      ...mapState(useStore, ["tab"]),
      ...mapWritableState(useStore, ["config"]),
    },
    watch: {
      tab() {
        this.updateConfig();
      },
    },
    methods: {
      regenerate() {
        const store = useStore();
        if (this.tab == "markov") {
          store.config.markov.minLength = this.strLen.min;
          store.config.markov.maxLength = this.strLen.max;
          store.config.markov.order = this.markovOrder;
        }

        store.config[this.tab] = {
          ...store.config[this.tab],
          startsWithString: this.startWith,
          endsWithString: this.endWith,
          doesContain: this.doesContain,
          doesNotContain: this.doesNotContain,
        };

        const actionName = camelCase(`generate ${this.tab}`);
        store[actionName]();
      },
      updateConfig() {
        const config = this.config[this.tab];
        this.strLen.min = config.minLength;
        this.strLen.max = config.maxLength;
        this.markovOrder = config.order;
        this.startWith = config.startsWithString;
        this.endWith = config.endsWithString;
        this.doesContain = config.doesContain;
        this.doesNotContain = config.doesNotContain;
      },
    },
    mounted() {
      this.updateConfig();
    },
  };
</script>
