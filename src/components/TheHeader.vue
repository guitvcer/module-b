<template>
  <header class="px-4 py-2
                 flex justify-between items-center
                 border-b dark:border-zinc-700">
    <logo />
    <div>
      <a href="#" class="px-2 hover:underline">
        Sign Up
      </a>
      <router-link :to="{name: 'signIn'}" class="px-2 hover:underline">
        Sign In
      </router-link>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
