import { InvalidCredentialsError } from './errors/invalid-credentials-error'

import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({ userId, gymId })

    if (!checkIn) {
      throw new InvalidCredentialsError()
    }
    return {
      checkIn,
    }
  }
}
