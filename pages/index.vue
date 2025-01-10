<template>
  <p>
    {{ val }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{}>()
const emits = defineEmits<{}>()

const val = ref(0)
</script>

<style lang="postcss" scoped></style>