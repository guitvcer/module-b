export const isAuthenticated = () => {
  return Boolean(localStorage.accessToken)
}
