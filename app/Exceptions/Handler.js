'use strict';

// const Sentry = require('@sentry/node');

const Env = use('Env');
const Youch = use('youch');
// const Config = use('Config');

const sentry = use('Sentry');

const BaseExceptionHandler = use('BaseExceptionHandler');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages);
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();
      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    /* console.log(Config.get('database.pg.host'));
    Sentry.configureScope(Config.get('services.sentry.dsn'));
    Sentry.captureMessage(error); */
    /* Sentry.init({
      dsn: 'https://e7e33ae324144d3b9615c4d866894064@sentry.io/1467975'
    });
    Sentry.captureMessage(error); */
    sentry.captureException(error);
  }
}

module.exports = ExceptionHandler;
