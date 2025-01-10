<template>
  <div
    v-for="node in nodes"
    :key="node.name"
    class="px-7 min-w-full py-2"
    @click.stop="selectNode(node)">
    <div
      v-if="node.type === 'folder'"
      class="rounded-2xl px-2"
      :class="node.parent ? '' : 'w-full'">
      <v-icon icon="mdi-folder" class="pb-1" />
      <span :class="isSelected(node) ? 'bg-blue-100' : ''">{{ node.name }}</span>
      <component
        v-if="node.children.length > 0"
        :is="node.type === 'folder' ? 'v-btn' : 'v-card'"
        @click="toggleCollapse">
        <v-icon v-if="collapsedRef" icon="mdi-chevron-up" class="ml-auto" />
        <v-icon v-else icon="mdi-chevron-down" class="ml-auto" />
      </component>
      <Nodes
        v-if="!collapsedRef"
        :nodes="node.children"
        variant="submit"
        collapsed
        @select="onChildSelect"
        :selected-node="selectedNode" />
    </div>
    <div v-else>
      <div class="rounded-2xl px-2">
        <v-icon icon="mdi-chess-pawn" />
        {{ node.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node } from '~/models'

import Nodes from '~/components/Nodes.vue'

const props = defineProps<{
  nodes?: Node[]
  collapsed?: boolean
  selectedNode?: Node
  variant: 'submit' | 'view'
}>()
const emit = defineEmits(['select'])

const collapsedRef = ref(props.collapsed)

const toggleCollapse = () => {
  collapsedRef.value = !collapsedRef.value
}
const isSelected = (node: Node) =>
  props.selectedNode && props.selectedNode.name === node.name

const selectNode = (node: Node) => {
  emit('select', node)
}

const onChildSelect = (node: Node) => {
  emit('select', node)
}
</script>

<style lang="postcss" scoped></style>
