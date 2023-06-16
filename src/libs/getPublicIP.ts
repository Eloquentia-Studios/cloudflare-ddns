import fetch from 'node-fetch'

/**
 * Get the public IP address of the machine.
 *
 * @returns {Promise<string>} The public IP address.
 */
const getPublicIP = async (): Promise<string> => {
  const response = await fetch('http://esaias.se/jsonIP.php')
  if (!response.ok) throw new Error('Failed to get public IP address.')

  return (await response.json()) as string
}

export default getPublicIP
