<template>
  <main-page-wrapper>
    <main v-if="game" class="p-4">
      <h2 class="text-2xl p-2">{{ game.title }}</h2>
      <iframe :src="getGameServeUrl()" class="w-full h-96 border rounded-md"></iframe>
      <section class="grid md:grid-cols-2 gap-8 py-2">
        <div>
          <h3 class="text-xl py-2 underline">Top 10 Leaderboard</h3>
          <ul class="list-decimal list-inside" v-if="scores && scores.length > 0">
            <li
              class="inline-flex justify-between w-full"
              v-for="index in 9"
            >
              <p class="block">#{{ index + 1 }}. {{ scores[index].username }}</p>
              <p class="block">{{ scores[index].score }}</p>
            </li>
          </ul>
          <p v-else class="text-sm text-zinc-700">Empty list</p>
        </div>
        <div>
          <h3 class="text-xl py-2 underline">Description</h3>
          <p>{{ game.description }}</p>
        </div>
      </section>
    </main>
  </main-page-wrapper>
</template>

<script>
import { base_url } from '@/settings'
import api from '@/api'
import MainPageWrapper from '@/components/MainPageWrapper.vue'
import router from '@/router'

export default {
  components: {
    MainPageWrapper
  },
  data() {
    return {
      game: null,
      scores: null
    }
  },
  async mounted() {
    const slug = router.currentRoute.value.params.slug
    this.game = await api.games.getBySlug(slug)

    await this.loadScores()
    setInterval(this.loadScores, 5000)
  },
  methods: {
    getGameServeUrl() {
      return `${base_url}/games/${this.game.slug}/${this.game.lastVersion}`
    },
    async loadScores() {
      this.scores = (await api.games.getScores(this.game.slug)).scores
    }
  }
}
</script>
