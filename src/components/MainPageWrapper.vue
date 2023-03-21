<template>
  <div class="max-w-screen-lg m-auto bg-white dark:bg-zinc-800">
    <the-header />
    <slot />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>
