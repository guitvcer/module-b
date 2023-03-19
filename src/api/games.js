import { api_url } from '@/settings'

export default {
  async get() {
    return fetch(`${api_url}/games`)
      .then(response => response.json())
  }
}
