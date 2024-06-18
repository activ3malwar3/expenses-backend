/**
 * Represents a data validation error. This error is thrown when data validation fails.
 */
class DataValidationError extends Error {
  details: [] | object

  /**
   * Creates a new instance of DataValidationError.
   * @param details - The details of the data validation error.
   */
  constructor(details = []) {
    super('Data validation error')
    this.name = 'DataValidationError'
    this.details = details
  }
}

/**
 * Represents an object not found error. This error is thrown when an object is not found. For example, when a user is not found.
 */
class ObjectNotFoundError extends Error {
  /**
   * Creates a new instance of ObjectNotFoundError.
   * @param message - The error message.
   */
  constructor(message?: string) {
    super(message ? message : 'Object not found error')
    this.name = 'ObjectNotFoundError'
  }
}

/**
 * Represents an error when a resource cannot be deleted.
 */
class DeleteResourceError extends Error {
  /**
   * Creates a new instance of DeleteResourceError.
   * @param message - The error message.
   */
  constructor(message?: string) {
    super(message ? message : 'Error deleting resource')
    this.name = 'DeleteResourceError'
  }
}

/**
 * Represents a dependency not found error.
 */
class DependencyNotFoundError extends Error {
  details

  /**
   * Creates a new instance of DependencyNotFoundError.
   * @param details - The details of the dependency not found error.
   */
  constructor(details: [] | object) {
    super('Dependency not found error')
    this.name = 'DegeneracyNotFoundError'
    this.details = details
  }
}

/**
 * Represents a name unique error. For example, when a user name is not unique.
 */
class NameUniqueError extends Error {
  /**
   * Creates a new instance of NameUniqueError.
   */
  constructor() {
    super('Name unique error')
    this.name = 'NameUniqueError'
  }
}

/**
 * Represents a server args error. For example, when a server argument is invalid.
 */
class ServerArgsError extends Error {
  /**
   * Creates a new instance of ServerArgsError.
   */
  constructor(message?: string) {
    super(message ? message :'Server args error')
    this.name = 'ServerArgsError'
  }
}

/**
 * Represents a file path error.
 */
class FilePathError extends Error {
  /**
   * Creates a new instance of FilePathError. For example, when a file path is invalid.
   */
  constructor() {
    super('Image path error')
    this.name = 'FilePathError'
  }
}

/**
 * Represents a duplicate object error.
 */
class DuplicateObjectError extends Error {
  /**
   * Creates a new instance of DuplicateObjectError. For example, when a user already exists.
   */
  constructor(message?: string) {
    super(message ? message : 'Object(s) already exists')
    this.name = 'DuplicateObjectError'
  }
}

/**
 * Represents an invalid request error. For example, when a request is invalid.
 */
class InvalidRequestError extends Error {
  /**
   * Creates a new instance of InvalidRequestError.
   */
  constructor(message?: string) {
    super(message ? message : 'Invalid request')
    this.name = 'InvalidRequestError'
  }
}

export {
  DataValidationError, DeleteResourceError, DependencyNotFoundError,
  DuplicateObjectError, FilePathError, InvalidRequestError,
  NameUniqueError,
  ObjectNotFoundError,
  ServerArgsError
}

