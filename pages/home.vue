<template>
  <div class="p-5 pl-10">
    <h1 class="text-3xl pb-10">Explorer</h1>

    <div class="w-full h-full bg-[#170034] rounded-xl p-5">
      <div class="flex pb-5">
        <pre class="leading-5">{{ formatHeader() }}</pre>
        <v-text-field
          label="Enter PGN"
          v-model="pgn"
          variant="outlined"
          @click:append="loadPosition()" />
      </div>
      <div class="flex">
        <pre><code class="text-3xl ">{{ replaceChessPieces(chess.ascii()) }}
        <div class="flex gap-x-3 justify-center ">
      <v-btn icon="mdi-arrow-left"  @click="prevMove()" />
      <v-btn icon="mdi-arrow-right"  @click="nextMove()"/>
        </div></code></pre>
        <!-- Save line -->
        <div class="flex flex-col mx-auto my-auto">
          <v-btn icon="mdi-plus-circle-outline" color="green" @click="dialog = true" />
          <span class="text-center font-semibold text-lg"> Save </span>
          <v-dialog v-model="dialog" location="top center" max-width="450">
            <v-card title="Save line">
              <v-card-text>
                <v-text-field label="Name" v-model="node.name" />
                <v-text-field label="Description" v-model="node.description" />
              </v-card-text>
              <Nodes
                :nodes="nodes"
                @select="selectNode"
                :selectedNode="selectedNode"
                variant="submit" />
              <!-- Actions -->
              <v-card-actions>
                <v-btn @click="dialog = false">Cancel</v-btn>
                <v-btn color="primary" @click="onSave()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chess } from 'chess.js'
import * as api from '@/api'
import type { Node } from '~/models'
import Nodes from '~/components/Nodes.vue'

/* State */
const chess = ref(new Chess())
const history = ref<string[]>([''])
const currMoveIdx = ref<number>(-1)
const route = useRoute()

const pgn = ref()
const dialog = ref(false)
const selectedNode = ref<Node>()
const selectNode = (node: Node) => {
  if (node.type !== 'folder') return
  selectedNode.value = node
}

const node = ref<Node>({
  _id: '',
  name: '',
  type: 'opening',
  description: '',
  pgn: pgn.value,
  children: [],
  parent: undefined,
})

const nodes = ref<Node[]>()

onMounted(async () => {
  if (route.query.pgn) {
    pgn.value = route.query.pgn as string
    loadPosition()
  }
  nodes.value = await api.getNodes()
})

/* Watch for changes in the PGN query parameter */
watch(
  () => route.query.pgn,
  (newPGN) => {
    if (newPGN) {
      pgn.value = newPGN as string
      loadPosition()
    }
  }
)


/* Ascii piece conversion */
const pieceMap: { [key: string]: string } = {
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  p: '♟',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
  P: '♙',
  '.': '∘',
}

watch(
  () => pgn.value,
  newVal => {
    if (!newVal) return

    chess.value.loadPgn(newVal)
    loadPosition()
  }
)

const replaceChessPieces = (ascii: string) => {
  return ascii
    .split('')
    .map(char => pieceMap[char] || char)
    .join('')
}

/* Header formatting */

const formatHeader = () => {
  const header = chess.value.header()
  return Object.keys(header)
    .map(key => `${key}: ${header[key]}`)
    .join('\n')
}

const loadPosition = () => {
  chess.value.loadPgn(pgn.value)
  history.value = chess.value.history()
  currMoveIdx.value = history.value.length - 1
  document.addEventListener('keydown', handleKeyPress)
}

/* Move parser */

// compare current game length to full game length and get next move if ok
const nextMove = () => {
  if (currMoveIdx.value >= history.value.length - 1) return

  currMoveIdx.value++
  const next = history.value[currMoveIdx.value]
  chess.value.move(next)
}

const prevMove = () => {
  if (currMoveIdx.value < 0) return

  chess.value.undo()
  currMoveIdx.value--
}

/* Key presses */
const handleKeyPress = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowRight':
      nextMove()
      break
    case 'ArrowLeft':
      prevMove()
      break
    case 'ArrowDown':
      //TODO : header gets removed when this happens
      chess.value.reset()
      formatHeader()
      currMoveIdx.value = -1
      break
    case 'ArrowUp':
      // room for optimization here
      while (currMoveIdx.value < history.value.length - 1) {
        nextMove()
      }
      break
  }
}

const onSave = async () => {
  if (!selectedNode.value) return
  node.value.pgn = pgn.value
  node.value.parent = selectedNode.value._id

  await api.postNode(node.value)

  nodes.value = await api.getNodes()

  dialog.value = false
}
</script>

<style lang="postcss" scoped></style>
