import { api_url } from '@/settings'
import { sendRequest } from '@/utils'


const get = async (sortBy, sortDir, page) => {
  const params = new URLSearchParams({
    sortBy, sortDir, page
  })
  const url = `${api_url}/games?${params}`
  return await sendRequest(url)
}

const getBySlug = async (slug) => {
  const url = `${api_url}/games/${slug}`
  return await sendRequest(url)
}

const serve = async (slug, version) => {
  const url = `${api_url}/games/${slug}/${version}`
  return await sendRequest(url)
}

const update = async (slug, title, description) => {
  const url = `${api_url}/games/${slug}`
  return await sendRequest(url, 'PUT', {title, description})
}

const getScores = async (slug) => {
  const url = `${api_url}/games/${slug}/scores`
  return await sendRequest(url)
}

const publishScore = async (slug, score) => {
  const url = `${api_url}/games/${slug}/scores`
  return await sendRequest(url, 'POST', {score})
}

export default {
  get,
  getBySlug,
  serve,
  update,
  getScores,
  publishScore
}
