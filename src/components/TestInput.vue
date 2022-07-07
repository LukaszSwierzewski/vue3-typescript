<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "TestInput",
  props: {
    valueA: {
      type: String,
      required: true,
    },
    valueB: {
      type: String,
      required: true,
    },
  },
  setup (_, {emit}) {
    const someMethod = (value: string) => {
      emit('update:valueA', value)
    }
    return {
      someMethod
    }
  }
});
</script>

<template>
  <h1>teaast kurwa {{ valueA }}</h1>
  <input :value="valueA" @input="$emit('update:valueA', $event.target.value)" />
  <input :value="valueB" @input="$emit('update:valueB', $event.target.value)" />
</template>
