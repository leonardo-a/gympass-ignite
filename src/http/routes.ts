import { FastifyInstance } from 'fastify'
import { register } from './controllers/registerUser'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
