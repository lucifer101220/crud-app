import { IndexedObject } from '../../utils/type';

export const isPromise = (value: any): boolean => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
};

const getErrorMessage = (errorData: IndexedObject) => {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: IndexedObject) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

export default () => (next: any) => (action: any) => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The error middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `catch`.
   * It need not run in production
   */
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    // Dispatch initial pending promise, but catch any errors
    return next(action).catch((error: any) => {
      console.error(
        `${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`,
      );
      if (error && error.response && error.response.data) {
        const message = getErrorMessage(error.response.data);
        console.error(`Actual cause: ${message}`);
      }

      return Promise.reject(error);
    });
  }

  return next(action);
};
