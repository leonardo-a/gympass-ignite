import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GymsRepository } from '@/repositories/interfaces/gyms-repository'
import { FetchNeabryGyms } from './fetch-nearby-gyms'

let gymsRepository: GymsRepository
let sut: FetchNeabryGyms

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNeabryGyms(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.3988617,
      longitude: -46.4304419,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -23.7331331,
      longitude: -46.5850046,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.4001794,
      userLongitude: -46.4294568,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
