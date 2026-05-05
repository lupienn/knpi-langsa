import { SignJWT, jwtVerify } from 'jose'

export interface JWTPayload {
  id: number
  username: string
  peran: string
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  const config = useRuntimeConfig()
  const secret = new TextEncoder().encode(config.jwtSecret)

  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  const config = useRuntimeConfig()
  const secret = new TextEncoder().encode(config.jwtSecret)

  const { payload } = await jwtVerify(token, secret)
  return payload as unknown as JWTPayload
}
