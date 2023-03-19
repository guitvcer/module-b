<template>
  <div class="bg-slate-50 dark:bg-zinc-900 dark:text-zinc-100 h-screen">
    <div class="max-w-screen-lg m-auto bg-white dark:bg-zinc-800">
      <the-header />
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>
