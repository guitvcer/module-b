import api from "@/api";

export const isAuthenticated = () => {
  return Boolean(localStorage.accessToken)
}

export const sendRequest = async (url, method, body) => {
  const headers = getHeaders()
  const options = {headers}
  if (method) {
    options.method = method
  }
  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)

  if (response.status === 401) {
    const accessToken = await api.auth.refresh(localStorage.refreshToken)
    localStorage.setItem('accessToken', accessToken)
    return await sendRequest(url)
  }

  return await response.json()
}

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (isAuthenticated()) {
    headers.Authorization = `Bearer ${localStorage.accessToken}`
  }

  return headers
}
