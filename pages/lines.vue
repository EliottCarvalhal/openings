<template>
  <div class="p-5 pl-10">
    <h1 class="text-3xl pb-10">Your saved lines</h1>
    <div class="w-full h-full bg-[#170034] rounded-xl py-5 min-h-60">
      <div v-if="loading" class="flex items-center justify-center h-full">
        <v-icon icon="mdi-loading" class="animate-spin" />
      </div>
      <Nodes
        v-else
        :nodes="nodes"
        variant="view"
        @select="handleSelect($event)"
        :selected-node="selectedNode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as api from '~/api'
import Nodes from '~/components/Nodes.vue'
import type { Node } from '~/models'

const router = useRouter()
const selectedNode = ref<Node>()
const nodes = ref()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  nodes.value = await api.getNodes()
  loading.value = false
})

const handleSelect = (node: Node) => {
  if (node.type === 'folder') return
  selectedNode.value = node
  router.push({ path: '/home', query: { pgn: node.pgn } })
}
</script>

<style lang="postcss" scoped></style>
