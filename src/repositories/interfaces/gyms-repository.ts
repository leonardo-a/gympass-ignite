import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  fetchManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(title: string, page: number): Promise<Gym[]>
}
