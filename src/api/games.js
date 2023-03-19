import { api_url } from '@/settings'

export default {
  async get(sortBy, sortDir) {
    const params = new URLSearchParams({
      sortBy, sortDir
    })
    const url = `${api_url}/games?${params}`
    return fetch(url).then(response => response.json())
  }
}
