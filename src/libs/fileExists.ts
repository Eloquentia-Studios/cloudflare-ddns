import { access } from 'fs/promises'

const fileExists = (path: string) =>
  access(path)
    .then(() => true)
    .catch(() => false)

export default fileExists
