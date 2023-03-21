import { api_url } from '@/settings'

export default {
  async signIn(username, password) {
    const response = await fetch(
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
    )
    const responseJson = await response.json()

    if (response.status === 401) {
      let status
      status = responseJson.status
      status = status.charAt(0).toUpperCase() + status.slice(1)

      const error = new Error(responseJson.message)
      error.name = status

      throw error
    } else if (!response.ok) {
      throw new Error('An error has occured.')
    }

    return responseJson.token
  },
  async refresh(refreshToken) {
    const response = await fetch(
      `${api_url}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      }
    )
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error('An error has occured.')
    }

    return responseJson.access
  }
}
