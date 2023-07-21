import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNeabryGyms } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNeabryGyms(gymsRepository)

  return useCase
}
