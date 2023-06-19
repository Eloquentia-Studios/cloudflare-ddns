import trpc from './trpc'

/**
 * Check authentication status.
 *
 * @returns True if the client is authenticated, false otherwise.
 */
export const checkAuthentication = async () => await trpc.authCheck.query()

/**
 * Login to the backend with the given password,
 * returns true if the login was successful, false otherwise.
 *
 * @param password User provided password.
 * @returns True if the login was successful, false otherwise.
 */
export const login = async (password: string) => {
  const token = await trpc.authLogin.mutate(password)
  return saveToken(token)
}

/**
 * Get authentication headers.
 *
 * @returns Authentication headers.
 */
export const getAuthenticationHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * Get token from local storage.
 *
 * @returns Token if it exists, null otherwise.
 */
const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? token : null
}

/**
 * Save token to local storage.
 *
 * @param token Token to save.
 * @returns True if the token was saved, false otherwise.
 */
const saveToken = (token: string) => {
  try {
    localStorage.setItem('token', token)
    return true
  } catch {
    return false
  }
}
