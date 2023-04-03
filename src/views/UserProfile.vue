<template>
  <main-page-wrapper>
    <main v-if="user" class="p-4">
      <h2 class="underline text-2xl my-4">{{ user.username }}</h2>
      <section v-if="user.authoredGames.length > 0" class="my-2">
        <h3 class="text-xl">Authored Games</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-0 sm:gap-y-4 py-4">
          <games-list-item
            v-for="game of user.authoredGames"
            :key="game.id"
            :game="game"
          />
        </div>
      </section>

      <section class="my-2">
        <h3 class="text-xl">Highscores per Game</h3>
        <table :class="['w-full mt-4', tableClass]">
          <tr>
            <th :class="['font-medium bg-slate-200 dark:bg-zinc-700', tableClass]">Game Title</th>
            <th :class="['font-medium bg-slate-200 dark:bg-zinc-700', tableClass]">Score</th>
          </tr>
          <tr v-for="score of user.highscores">
            <td :class="tableClass">{{ score.game.title }}</td>
            <td :class="tableClass">{{ score.score }}</td>
          </tr>
        </table>
      </section>
    </main>
  </main-page-wrapper>
</template>

<script>
import api from '@/api'
import router from '@/router'
import MainPageWrapper from '@/components/MainPageWrapper.vue'
import GamesListItem from '@/components/GamesListItem.vue'

export default {
  data() {
    return {
      user: null,
      username: router.currentRoute.value.params.username,
      tableClass: 'border border-collapse border-slate-400 dark:border-zinc-600 py-1 px-2'
    }
  },
  components: {
    MainPageWrapper,
    GamesListItem
  },
  async mounted() {
    await this.loadUser()
  },
  created() {
    this.$watch(
      () => this.$route.params, async (toParams, previousParams) => {
        this.username = toParams.username
        await this.loadUser()
      }
    )
  },
  methods: {
    async loadUser() {
      this.user = await api.users.get(this.username)
    }
  }
}
</script>
