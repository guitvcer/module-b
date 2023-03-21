import { api_url } from '@/settings'
import api from '.'
import { isAuthenticated } from '@/utils'

const getHeaders = () => {
  const headers = {}
  if (isAuthenticated()) {
    headers.Authorization = `Bearer ${localStorage.accessToken}`
  }

  return headers
}

const get = async (sortBy, sortDir) => {
  const params = new URLSearchParams({
    sortBy, sortDir
  })
  const url = `${api_url}/games?${params}`
  const headers = getHeaders()
  const response = await fetch(url, {headers})
  if (response.status === 401) {
    const accessToken = await api.auth.refresh(localStorage.refreshToken)
    localStorage.setItem('accessToken', accessToken)
    return await get(sortBy, sortDir)
  }

  return await response.json()
}

export default {
  get
}
