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
