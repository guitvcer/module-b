import api from "@/api";

export const isAuthenticated = () => {
  return Boolean(localStorage.accessToken)
}

export const sendRequest = async (url) => {
  const headers = getHeaders()
  const response = await fetch(url, {headers})

  if (response.status === 401) {
    const accessToken = await api.auth.refresh(localStorage.refreshToken)
    localStorage.setItem('accessToken', accessToken)
    return await sendRequest(url)
  }

  return await response.json()
}

const getHeaders = () => {
  const headers = {}
  if (isAuthenticated()) {
    headers.Authorization = `Bearer ${localStorage.accessToken}`
  }

  return headers
}
