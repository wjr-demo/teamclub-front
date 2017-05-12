/**
 * Error that is thrown when attempting to attach a snack bar that is already attached.
 * @docs-private
 */
export class MdError extends Error {
  constructor(value: string) {
    super();
    this.message = value;
  }
}

export class MdSnackBarContentAlreadyAttached extends MdError {
  constructor() {
    super('Attempting to attach snack bar content after content is already attached');
  }
}
