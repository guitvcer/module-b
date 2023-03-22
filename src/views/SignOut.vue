<template>
  <main-page-wrapper />
</template>

<script>
import MainPageWrapper from '@/components/MainPageWrapper.vue'
import router from '@/router'
import { isAuthenticated } from '@/utils'

export default {
  components: {
    MainPageWrapper
  },
  async mounted() {
    if (isAuthenticated()) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      await this.$root.$refs.alert.showAlert('success', 'You are signed out.', 'Success')
    } else {
      await this.$root.$refs.alert.showAlert('warning', 'You are not signed in.', 'Warning')
    }

    await router.push({ name: 'home' })
  }
}
</script>
