<template>
  <main-page-wrapper>
    <main v-if="game" class="p-4">
      <h2 class="text-2xl p-2">{{ game.title }}</h2>
      <img src="https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg" alt="" class="w-full">
      <section class="grid md:grid-cols-2 gap-8 py-2">
        <div>
          <h3 class="text-xl py-2 underline">Top 10 Leaderboard</h3>
          <ul class="list-decimal list-inside">
            <li class="inline-flex justify-between w-full">
              <p class="block">#1. IntelligentTurtle</p>
              <p class="block">10908</p>
            </li>
            <li class="inline-flex justify-between w-full">
              <p class="block">#2. IntelligentTurtle</p>
              <p class="block">10908</p>
            </li>
            <li class="inline-flex justify-between w-full py-2">
              <p class="block font-bold">#100500. Qwerty</p>
              <p class="block">10908</p>
            </li>
          </ul>
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
import api from '@/api'
import MainPageWrapper from '@/components/MainPageWrapper.vue'
import router from '@/router'

export default {
  components: {
    MainPageWrapper
  },
  data() {
    return {
      game: null
    }
  },
  async mounted() {
    const slug = router.currentRoute.value.params.slug
    this.game = await api.games.getBySlug(slug)
  }
}
</script>
