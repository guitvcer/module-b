<template>
  <main>
    <div class="sm:flex justify-between items-center p-4">
      <h2 class="text-2xl px-0 lg:px-4 my-2 lg:my-0">{{ games.totalElements }} games available</h2>
      <games-list-filter />
    </div>
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-0 sm:gap-y-4 py-4 sm:px-4">
      <games-list-item
          v-for="game of games.content"
          :key="game.id"
          :game="game"
      />
    </section>
  </main>
</template>

<script>
import api from '@/api'
import GamesListFilter from '@/components/GamesListFilter.vue'
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
    GamesListItem,
    GamesListFilter
  }
}
</script>
