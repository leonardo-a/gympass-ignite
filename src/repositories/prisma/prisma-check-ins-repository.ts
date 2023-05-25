import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../interfaces/check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }
}
