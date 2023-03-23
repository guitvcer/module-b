<template>
  <main-page-wrapper>
    <main v-if="user" class="p-4">
      <h2 class="underline text-2xl my-4">{{ user.username }}</h2>
      <section>
        <h3 class="text-xl">Authored Games</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-0 sm:gap-y-4 py-4">
          <games-list-item
            v-for="game of user.authoredGames"
            :key="game.id"
            :game="game"
          />
        </div>
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
      user: null
    }
  },
  components: {
    MainPageWrapper,
    GamesListItem
  },
  async mounted() {
    this.user = await api.users.get(router.currentRoute.value.params.username)
  }
}
</script>
