<template>
  <header class="px-4 py-2
                 flex justify-between items-center
                 border-b dark:border-zinc-700">
    <logo />
    <div>
      <router-link
        v-if="!isAuthenticated()"
        :to="{name: 'signUp'}"
        class="px-2 hover:underline"
      >
        Sign Up
      </router-link>
      <router-link
        v-if="!isAuthenticated()"
        :to="{name: 'signIn'}"
        class="px-2 hover:underline"
      >
        Sign In
      </router-link>
      <router-link
        v-if="isAuthenticated() && username"
        :to="{name: 'userProfile', params: {username}}"
        class="px-2 hover:underline"
      >
        <b>{{ username }}</b>
      </router-link>
      <router-link
        v-if="isAuthenticated()"
        :to="{name: 'signOut'}"
        class="px-2 hover:underline"
      >
        Sign Out
      </router-link>
    </div>
  </header>
</template>

<script>
import jwt_decode from 'jwt-decode'
import { isAuthenticated } from '@/utils'
import Logo from '@/components/Logo.vue'

export default {
  data() {
    return {
      username: null
    }
  },
  components: {
    Logo
  },
  methods: {
    isAuthenticated
  },
  mounted() {
    if (isAuthenticated()) {
      this.username = jwt_decode(localStorage.accessToken).username
    }
  }
}
</script>
