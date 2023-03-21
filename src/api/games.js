import { api_url } from '@/settings'
import { sendRequest } from '@/utils'


const get = async (sortBy, sortDir) => {
  const params = new URLSearchParams({
    sortBy, sortDir
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

const getScores = async (slug) => {
  const url = `${api_url}/games/${slug}/scores`
  return await sendRequest(url)
}

export default {
  get,
  getBySlug,
  serve,
  getScores
}
