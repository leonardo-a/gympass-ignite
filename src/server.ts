import 'dotenv/config'
import { app } from './app'
import { env } from './env'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 Server running on port ${env.PORT}`)
  })
