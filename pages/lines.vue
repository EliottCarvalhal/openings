<template>
  <div class="p-5 pl-10">
    <h1 class="text-3xl">Your saved lines</h1>
    <div class="w-full h-full bg-[#170034]">
      <Nodes :nodes="nodes" variant="view" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as api from '~/api'
import Nodes from '~/components/Nodes.vue'

const props = defineProps<{}>()

const nodes = ref()
onMounted(async () => {
  nodes.value = await api.getNodes()
  console.log(nodes.value)
})
</script>

<style lang="postcss" scoped></style>
