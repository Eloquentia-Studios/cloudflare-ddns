import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '../../../src/routers/appRouter'
import { getAuthenticationHeaders } from './authentication'

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
      async headers() {
        return getAuthenticationHeaders()
      }
    })
  ]
})

export default trpc

export type RouterOutput = inferRouterOutputs<AppRouter>
