import { GymsRepository } from '@/repositories/interfaces/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNeabryGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNeabryGymsReponse {
  gyms: Gym[]
}

export class FetchNeabryGyms {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNeabryGymsRequest): Promise<FetchNeabryGymsReponse> {
    const gyms = await this.gymsRepository.fetchManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
