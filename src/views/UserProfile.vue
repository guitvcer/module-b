<template>
  <main-page-wrapper>
    <p></p>
  </main-page-wrapper>
</template>

<script>
import api from '@/api'
import router from '@/router'
import MainPageWrapper from '@/components/MainPageWrapper.vue'

export default {
  data() {
    return {
      user: null
    }
  },
  components: {
    MainPageWrapper
  },
  async mounted() {
    this.user = await api.users.get(router.currentRoute.value.params.username)
  }
}
</script>
