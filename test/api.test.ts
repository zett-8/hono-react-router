// @ts-expect-error vitest pool workers provide a cloudflare:test module AT RUNTIME
// eslint-disable-next-line
import { env } from 'cloudflare:test'
import { describe, it, expect, beforeAll } from 'vitest'
import app from '../server'
import { setTestEnv } from './utils'

describe('GET /api/check', () => {
  let testEnv: ReturnType<typeof setTestEnv>

  beforeAll(() => {
    testEnv = setTestEnv(env)
  })

  it('Should return 200', async () => {
    const res = await app.request(
      '/api/check',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      testEnv
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ status: 'ok' })
  })
})
