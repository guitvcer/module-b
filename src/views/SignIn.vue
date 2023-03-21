<template>
  <main class="flex justify-center items-center pt-48">
    <section
        class="bg-white dark:bg-zinc-800
               rounded border dark:border-0
               py-16 w-full max-w-lg
               flex flex-col items-center
               m-1">
      <logo />
      <form class="flex flex-col w-full px-2 pt-12" @submit.prevent="signIn">
        <label for="username" class="hidden">Username</label>
        <input type="text" name="username" placeholder="Username" required
               class="rounded border py-2 px-4 my-0.5 dark:bg-zinc-900 dark:border-zinc-700">
        <label for="password" class="hidden">Password</label>
        <input type="password" name="password" placeholder="Password" required
               class="rounded border py-2 px-4 my-0.5 dark:bg-zinc-900 dark:border-zinc-700">
        <button type="Submit"
                class="bg-slate-600 hover:bg-slate-700 dark:bg-zinc-900 hover:bg-black
                     text-slate-100 dark:border dark:border-zinc-700
                     rounded py-2 px-4 mt-8"
        >Sign In</button>
      </form>
    </section>
  </main>
</template>

<script>
import router from '@/router.js'
import api from '@/api'
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo
  },
  methods: {
    async signIn(event) {
      const form = event.target
      const username = form.username.value
      const password = form.password.value
      form.reset()

      let refreshToken, accessToken
      try {
        refreshToken = await api.auth.signIn(username, password)
        accessToken = await api.auth.refresh(refreshToken)
      } catch (error) {
        this.$root.$refs.alert.showAlert('error', error.message, error.name)
        return
      }

      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accessToken', accessToken)

      this.$root.$refs.alert.showAlert('success', 'You are signed in.', 'Success')
      await router.push({ name: 'home' })
    }
  }
}
</script>
