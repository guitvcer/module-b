import { api_url } from '@/settings'

export default {
  async signIn(username, password) {
    return fetch(
      `${api_url}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    ).then(response => response.json())
  },
  async refresh(refreshToken) {
    return fetch(
      `${api_url}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      }
    ).then(response => response.json())
  }
}
