import { api_url } from '@/settings'
import { sendRequest } from '@/utils'

export default {
  async get(username) {
    return await sendRequest(`${api_url}/users/${username}`)
  }
}
