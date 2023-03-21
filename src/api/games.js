import { api_url } from '@/settings'

const getHeaders = () => {
  const headers = {}
  if (localStorage.accessToken) {
    headers.Authorization = `Bearer ${localStorage.accessToken}`
  }

  return headers
}

export default {
  async get(sortBy, sortDir) {
    const params = new URLSearchParams({
      sortBy, sortDir
    })
    const url = `${api_url}/games?${params}`
    return fetch(url, {headers: getHeaders()}).then(response => response.json())
  }
}
