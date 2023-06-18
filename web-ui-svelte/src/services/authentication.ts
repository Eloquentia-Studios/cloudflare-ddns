/**
 * Check authentication status.
 *
 * @returns True if the client is authenticated, false otherwise.
 */
export const checkAuthentication = async () => {
  const authHeaders = getAuthenticationHeaders()
  if (!authHeaders.Authorization) return false

  const response = await fetch('/api/authentication/check', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authHeaders }
  })

  return response.status === 200
}

/**
 * Login to the backend with the given password,
 * returns true if the login was successful, false otherwise.
 *
 * @param password User provided password.
 * @returns True if the login was successful, false otherwise.
 */
export const login = async (password: string) => {
  const response = await fetch('/api/authentication/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })

  if (response.status === 200) {
    const { token } = await response.json()
    return saveToken(token)
  }

  return false
}

/**
 * Save token to local storage.
 *
 * @param token Token to save.
 * @returns True if the token was saved, false otherwise.
 */
const saveToken = (token: string) => {
  localStorage.setItem('token', token)
  return true
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
 * Get authentication headers.
 *
 * @returns Authentication headers.
 */
export const getAuthenticationHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
