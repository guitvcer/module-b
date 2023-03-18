<template>
  <div class="bg-slate-50 dark:bg-zinc-900 dark:text-zinc-100 h-screen">
    <div class="max-w-screen-lg m-auto">
      <the-header />
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
