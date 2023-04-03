<template>
  <div class="bg-slate-50 dark:bg-zinc-900 dark:text-zinc-100 min-h-screen">
    <router-view />
    <vue-basic-alert
      :closeIn="3000"
      ref="alert"
    />
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
