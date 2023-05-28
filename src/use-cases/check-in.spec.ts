import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GymsRepository } from '@/repositories/interfaces/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: CheckInsRepository
let gymsRepository: GymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Developers Jym',
      description: null,
      phone: null,
      latitude: -23.3988617,
      longitude: -46.4304419,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 6, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.3988617,
      userLongitude: -46.4304419,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in again in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 6, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.3988617,
      userLongitude: -46.4304419,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.3988617,
        userLongitude: -46.4304419,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in again in a different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 6, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.3988617,
      userLongitude: -46.4304419,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 6, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.3988617,
      userLongitude: -46.4304419,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 6, 0, 0))

    await gymsRepository.create({
      id: 'gym-02',
      title: 'TypeScript Gym',
      description: '',
      latitude: new Decimal(-23.3916028),
      longitude: new Decimal(-46.4296952),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.3546909,
        userLongitude: -46.4626541,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
