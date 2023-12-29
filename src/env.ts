import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  FROM_WHATSAPP: z.string(),
  TO_WHATSAPP: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(_env.error.format())
  throw new Error('Missing environment variables')
}

export const env = _env.data
