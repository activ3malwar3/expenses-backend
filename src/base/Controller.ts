import {
  DataValidationError,
  DeleteResourceError,
  DependencyNotFoundError,
  DuplicateObjectError,
  FilePathError,
  InvalidRequestError,
  NameUniqueError,
  ObjectNotFoundError,
  ServerArgsError,
} from './Errors'

type errorTypes =
  | DataValidationError
  | ObjectNotFoundError
  | DependencyNotFoundError
  | NameUniqueError
  | ServerArgsError
  | FilePathError
  | DuplicateObjectError
  | InvalidRequestError
  | DeleteResourceError
  | Error

export default class BaseController {
  /**
   * Format a response
   * @param status status number
   * @param successMessage success message
   * @param successResult success result
   * @param failureMessage failure message
   * @param failureResult failure result
   * @returns {object} result
   */
  static formatResponse(
    status = 200,
    successMessage = 'OK',
    successResult = {},
    failureMessage = '',
    failureResult = []
  ) {
    return {
      status,
      successMessage,
      successResult,
      failureMessage,
      failureResult,
    }
  }

  /**
   * Format response for get
   * @param result Success result
   * @returns {object} result
   */
  static formatResponseForGet(result) {
    return {
      status: 200,
      successMessage: 'OK',
      successResult: result,
      failureMessage: '',
      failureResult: [],
    }
  }

  /**
   * Format response for success create
   * @param result Success result
   * @returns {object} result
   */
  static formatResponseForSuccessCreate(result) {
    return {
      status: 201,
      successMessage: 'Successfully created',
      successResult: result,
      failureMessage: '',
      failureResult: [],
    }
  }

  /**
   * Format response for success update
   * @param successResult Success result
   * @returns {object} result
   */
  static formatResponseForSuccessUpdate(successResult) {
    return {
      status: 200,
      successMessage: 'Successfully updated',
      successResult,
      failureMessage: '',
      failureResult: [],
    }
  }

  /**
   * Format response for success delete
   * @param successResult Success result
   * @returns {object} result
   */
  static formatResponseForSuccessDelete(successResult?: unknown) {
    return {
      status: 200,
      successMessage: 'Successfully deleted',
      successResult,
      failureMessage: '',
      failureResult: [],
    }
  }

  /**
   * Format response for failure
   * @param status status code
   * @param failureMessage message
   * @param failureResult result
   * @returns {object}
   */
  static formatResponseForFailure(status = 400, failureMessage = '', failureResult = []) {
    return {
      status,
      successMessage: '',
      successResult: {},
      failureMessage,
      failureResult,
    }
  }

  // TODO: rename to handleException
  /**
   * Format exceptions
   * @param error error object
   * @returns {Object} { message, details, code }
   */
  static formatExceptions(error: errorTypes) {
    let message: string, details, code: number

    switch (error.constructor) {
      case DataValidationError:
        message = 'Data validation errors.'
        code = 422
        details = (error as DataValidationError).details
        break
      case ObjectNotFoundError:
        message = error.message
        code = 404
        break
      case DependencyNotFoundError:
        message = 'Dependency was not found.'
        code = 400
        details = (error as DependencyNotFoundError).details
        break
      case InvalidRequestError:
        message = error.message
        code = 400
        break
      case NameUniqueError:
        message = 'Name should be unique.'
        code = 409
        break
      case FilePathError:
        message = 'File at path was not found.'
        code = 404
        break
      case DuplicateObjectError:
        message = error.message
        code = 409
        break
      case DeleteResourceError:
        message = error.message
        code = 409
        break
      case ServerArgsError:
        message = error.message
        console.log(error)
        code = 500
        break
      default:
        message = 'Server error.'
        code = 500
        console.log(error)
        break
    }

    return { message, details, code }
  }
}
