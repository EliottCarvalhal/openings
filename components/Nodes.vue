<template>
  <div
    v-for="node in nodes"
    :key="node.name"
    class="px-7 min-w-full py-2"
    @click.stop="selectNode(node)">
    <div
      v-if="node.type === 'folder'"
      class="rounded-2xl px-2 cursor-pointer"
      :class="node.parent ? '' : 'w-full'">
      <v-icon icon="mdi-folder" class="pb-1" />
      <span :class="['py-1 px-2 rounded-xl', isSelected(node) ? 'bg-blue-500' : '']">{{
        node.name
      }}</span>
      <component
        class="cursor-pointer"
        v-if="node.children.length > 0"
        :is="node.type === 'folder' ? 'v-btn' : 'v-card'"
        @click="toggleCollapse(node)">
        <v-icon v-if="!isCollapsed(node)" icon="mdi-chevron-up" class="ml-auto" />
        <v-icon v-else icon="mdi-chevron-down" class="ml-auto" />
      </component>
      <Nodes
        v-if="!isCollapsed(node)"
        :nodes="node.children"
        variant="submit"
        @select="onChildSelect"
        :selected-node="selectedNode" />
    </div>
    <div v-else>
      <button class="rounded-2xl px-2" @click="selectNode(node)">
        <v-icon icon="mdi-chess-pawn" />
        <span :class="['py-1 px-2 rounded-xl', isSelected(node) ? 'bg-blue-500' : '']">{{
          node.name
        }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Node } from '~/models'

import Nodes from '~/components/Nodes.vue'

const props = defineProps<{
  nodes?: Node[]
  selectedNode?: Node
  variant: 'submit' | 'view'
}>()
const emit = defineEmits(['select'])

const collapsedMap = reactive<Record<string, boolean>>({})

const toggleCollapse = (node: Node) => {
  collapsedMap[node._id] =
    collapsedMap[node._id] === undefined ? false : !collapsedMap[node._id]
}

const isCollapsed = (node: Node) => {
  return collapsedMap[node._id] === undefined ? true : collapsedMap[node._id]
}

const isSelected = (node: Node) =>
  props.selectedNode && props.selectedNode._id === node._id

const selectNode = (node: Node) => {
  emit('select', node)
}

const onChildSelect = (node: Node) => {
  emit('select', node)
}
</script>

<style lang="postcss" scoped></style>
