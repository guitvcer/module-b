<template>
  <article class="hover:bg-slate-50 hover:dark:bg-zinc-800 hover:opacity-80" v-if="game">
    <img :src="getThumbnailUrl()"
         :alt="`${game.title} thumbnail`"
         class="w-full h-40"
    >
    <div class="p-2">
      <h3 class="py-1">
        <router-link
          :to="{name: 'gameDetail', params: {slug: game.slug}}"
          class="text-xl font-bold hover:underline"
        >
          {{ game.title }}
        </router-link>
      </h3>
      <p>{{ game.description }}</p>
      <p class="py-2 pb-4 sm:pb-0 text-zinc-500" v-if="game.author">
        by
        <a href="#" class="underline hover:text-zinc-400">{{ game.author }}</a>
        at {{ formatDateTime(game.uploadTimestamp) }}
      </p>
    </div>
  </article>
</template>

<script>
import { base_url } from '@/settings.js'

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    getThumbnailUrl() {
      if (this.game.thumbnail) {
        return `${base_url}${this.game.thumbnail}`
      }

      return 'https://google.com'
    },
    formatDateTime(dateTime) {
      const dateTime_ = new Date(dateTime)
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]

      const day = dateTime_.getDate()

      const monthIndex = dateTime_.getMonth()
      const monthName = monthNames[monthIndex]

      const year = dateTime_.getFullYear()

      return `${day} ${monthName} ${year}`
    }
  }
}
</script>
