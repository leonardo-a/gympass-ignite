export class LateCheckInValidation extends Error {
  constructor() {
    super(
      'The check-in can only be validated within 20 minutes from its creation.',
    )
  }
}
