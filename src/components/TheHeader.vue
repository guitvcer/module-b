<template>
  <header class="px-4 py-2
                 flex justify-between items-center
                 border-b dark:border-zinc-700">
    <logo />
    <div>
      <a
        v-if="!isAuthenticated()"
        href="#"
        class="px-2 hover:underline"
      >
        Sign Up
      </a>
      <router-link
        v-if="!isAuthenticated()"
        :to="{name: 'signIn'}"
        class="px-2 hover:underline"
      >
        Sign In
      </router-link>
      <a
        v-if="isAuthenticated()"
        href="#"
        class="px-2 hover:underline"
      >
        Sign Out
      </a>
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo
  },
  methods: {
    isAuthenticated() {
      return Boolean(localStorage.accessToken)
    }
  }
}
</script>
