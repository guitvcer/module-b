<template>
  <main-page-wrapper>
    <main v-if="game" class="p-4">
      <h2 class="text-2xl p-2">{{ game.title }}</h2>
      <iframe :src="getGameServeUrl()" class="w-full h-96 border rounded-md" name="testFrame"></iframe>
      <section class="grid md:grid-cols-2 gap-8 py-2">
        <div>
          <h3 class="text-xl py-2 underline">Top 10 Leaderboard</h3>
          <ul class="list-decimal list-inside" v-if="scores && scores.length > 0">
            <li
              v-for="index in scores.length >= 10 ? 10 : scores.length"
              :class="[myScore && index === myScore.index ? 'font-bold' : '', 'inline-flex justify-between w-full']"
            >
              <p class="block">
                #{{ index }}.
                <router-link
                  :to="{name: 'userProfile', params: {username: scores[index - 1].username}}"
                  class="hover:underline"
                >
                  {{ scores[index - 1].username }}
                </router-link>
              </p>
              <p class="block">{{ scores[index - 1].score }}</p>
            </li>
            <li
              class="inline-flex justify-between w-full font-bold my-1"
              v-if="isAuthenticated() && myScore && myScore.index > 9"
            >
              <p class="block">
                #{{ +myScore.index }}.
                <router-link
                  :to="{name: 'userProfile', params: {username: myScore.username}}"
                  class="hover:underline"
                >
                  {{ myScore.username }}
                </router-link>
              </p>
              <p class="block">{{ myScore.score }}</p>
            </li>
          </ul>
          <p v-else class="text-sm text-zinc-700 dark:text-slate-300">Empty list</p>
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
import jwt_decode from 'jwt-decode'
import { base_url } from '@/settings'
import api from '@/api'
import MainPageWrapper from '@/components/MainPageWrapper.vue'
import router from '@/router'
import { isAuthenticated } from '@/utils'

export default {
  components: {
    MainPageWrapper
  },
  data() {
    return {
      game: null,
      scores: null,
      myScore: null
    }
  },
  async mounted() {
    const slug = router.currentRoute.value.params.slug
    this.game = await api.games.getBySlug(slug)

    await this.loadScores()
    setInterval(this.loadScores, 5000)

    window.addEventListener('message', async event => {
      if (event.data.event_type === 'game_run_end') {
        if (confirm('Would you like to publish your score?')) {
          await api.games.publishScore(this.game.slug, Math.round(event.data.score))
          await this.loadScores()
        }
      }
    })
  },
  methods: {
    getGameServeUrl() {
      return `${base_url}/games/${this.game.slug}/${this.game.lastVersion}`
    },
    async loadScores() {
      const currentRoute = router.currentRoute.value
      if (currentRoute.name !== 'gameDetail' || currentRoute.params.slug !== this.game.slug) {
        return
      }

      const scores = (await api.games.getScores(this.game.slug)).scores

      if (isAuthenticated()) {
        this.loadMyScore(scores)
      }

      this.scores = scores
    },
    loadMyScore(scores) {
      const username = jwt_decode(localStorage.accessToken).username
      for (let index in scores) {
        const score = scores[index]
        if (score.username === username) {
          score.index = Number(index) + 1
          this.myScore = score
          return
        }
      }
    },
    isAuthenticated
  }
}
</script>
