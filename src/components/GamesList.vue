<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-0 sm:gap-y-4 py-4 sm:px-4">
    <games-list-item
      v-for="game of games.content"
      :key="game.id"
      :game="game"
    />
  </div>
</template>

<script>
import api from '@/api'
import GamesListItem from '@/components/GamesListItem.vue'

export default {
  data() {
    return {
      games: []
    }
  },
  async mounted() {
    this.games = await api.games.get()
  },
  components: {
    GamesListItem
  }
}
</script>
