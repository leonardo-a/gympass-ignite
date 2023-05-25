import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
