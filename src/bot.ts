import { env } from './env'
import cron from 'node-cron'
import twilio from 'twilio'

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)

function bot() {
  const whatsAppReceivers = env.TO_WHATSAPP.split(',')

  return whatsAppReceivers.map(async (whatsApp) => {
    try {
      const message = await client.messages.create({
        from: env.FROM_WHATSAPP,
        to: `whatsapp:+5519${whatsApp}`,
        mediaUrl: ['https://pbs.twimg.com/media/DtE-6PmXQAEwLQR.jpg'],
        body: 'Testing bot',
      })
      console.log(`Message send: ${message.sid}`)
    } catch (err) {
      return console.error(err)
    }
  })
}

setTimeout(bot, 1000)

// cron.schedule('0 0 * * 3', () => {
//   console.log('Running the scheduled task to send an image...')
//   bot()
// })
