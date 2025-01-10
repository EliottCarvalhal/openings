<template>
  <NuxtLayout>
    <v-app>
      <v-navigation-drawer permanent width="60" color="#170034">
        <v-list density="compact" nav>
          <NuxtLink to="/home">
            <v-list-item
              prepend-icon="mdi-view-dashboard-outline"
              :active="route.fullPath === '/home'" />
          </NuxtLink>
          <NuxtLink to="/lines">
            <v-list-item
              prepend-icon="mdi-heart-outline"
              :active="route.fullPath === '/lines'" />
          </NuxtLink>
        </v-list>
      </v-navigation-drawer>

      <v-sheet class="pb-12 pr-4 pl-12 pt-3" color="#100025" height="100%">
        <NuxtPage keepalive />
      </v-sheet>
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
