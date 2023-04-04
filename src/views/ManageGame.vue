<template>
  <main-page-wrapper>
    <main v-if="game" class="p-4">
      <form :action="getUploadGameUrl()" method="POST" @submit.prevent="submit">
        <input type="text" name="title" :value="game.title" minlength="3" maxlength="60" required placeholder="Title"
               class="border rounded w-full p-2 dark:bg-zinc-900 dark:border-zinc-700">
        <small class="text-red-700 px-2 pb-2" v-if="errors.title">{{ errors.title }}</small>
        <div class="md:flex mt-2 mb-4">
          <img :src="`${base_url}${game.thumbnail}`"
               :alt="`${game.title} thumbnail`"
               class="w-full md:max-w-sm mb-2 md:mb-0 md:mr-1"
          >
          <div class="w-full">
            <textarea name="description" cols="30" rows="10" :value="game.description" maxlength="200" placeholder="Description" required
                      class="border rounded w-full p-2 dark:bg-zinc-900 dark:border-zinc-700 md:ml-1">
            </textarea>
            <br>
            <small class="text-red-700 px-2 pb-2" v-if="errors.description">{{ errors.description }}</small>
          </div>
        </div>
        <div>
          <input id="zipfile" name="zipfile" type="file" class="hidden" @change="onChange">
          <label class="border border-slate-700 rounded
                        dark:border-zinc-700
                        bg-slate-700 hover:bg-slate-800
                        dark:bg-zinc-800 hover:dark:bg-zinc-900
                        text-slate-100
                        px-4 py-2 mr-1 cursor-pointer h-full"
                 id="zipfileLabel" for="zipfile"
          >Upload</label>

          <button class="border border-slate-700 rounded
                         dark:border-zinc-700
                         hover:bg-slate-800 hover:text-slate-100
                         dark:bg-zinc-800 hover:dark:bg-zinc-900
                         px-4 py-2 mr-1"
                  type="submit"
          >Submit</button>
        </div>
      </form>
    </main>
  </main-page-wrapper>
</template>

<script>
import { base_url, api_version } from '@/settings'
import api from '@/api'
import MainPageWrapper from '@/components/MainPageWrapper.vue'

export default {
  components: {
    MainPageWrapper
  },
  data() {
    return {
      game: null,
      slug: this.$router.currentRoute.value.params.slug,
      base_url,
      errors: {
        title: null,
        description: null
      }
    }
  },
  async mounted() {
    this.game = await api.games.getBySlug(this.slug)
  },
  methods: {
    getUploadGameUrl() {
      return `${base_url}/api/v${api_version}/games/${this.slug}/upload`
    },
    onChange(event) {
      document.querySelector('#zipfileLabel').innerHTML = event.target.files[0].name
    },
    async submit(event) {
      this.errors.title = null
      this.errors.description = null

      const target = event.target
      let successUpdate = true
      let successUpload = true

      try {
        const response = await api.games.update(this.slug, target.title.value, target.description.value)

        if (response.status === 'invalid') {
          successUpdate = false
          this.$root.$refs.alert.showAlert('error', response.message, response.status)

          if (response.violations.title) {
            this.errors.title = response.violations.title.message
          }
          if (response.violations.description) {
            this.errors.description = response.violations.description.message
          }
        }
      } catch (error) {
        this.$root.$refs.alert.showAlert('error', error.message, error.name)
        successUpdate = false
      }

      if (successUpdate) {
        this.$root.$refs.alert.showAlert('success', 'You are successfully updated the game.', 'Success')
      }

      if (target.zipfile.value !== '') {
        const formData = new FormData(target)
        formData.delete('title')
        formData.delete('description')
        formData.append('token', localStorage.getItem('accessToken'))

        const xhr = new XMLHttpRequest()

        xhr.addEventListener('load', event => {
          if (event.target.status === 201) {
            this.$root.$refs.alert.showAlert('success', 'You are successfully uploaded new version.', 'Success')
          } else if (event.target.status === 400) {
            const response = JSON.parse(event.target.response)
            this.$root.$refs.alert.showAlert('error', response.violations.nonFieldErrors.message, response.status)
            successUpload = false
          } else {
            this.$root.$refs.alert.showAlert('error', 'Error', 'An error has occured.')
            successUpload = false
          }

          if (successUpdate && successUpload) {
            this.$router.push({name: 'home'})
          }
        })

        xhr.open(target.method, target.action)
        xhr.send(formData)
      }
    }
  }
}
</script>
