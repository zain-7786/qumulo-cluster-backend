const { LogicalException } = use('@adonisjs/core/src/Exception');

class ExceptionHandler {
  async handle(error, ctx) {
    if (error instanceof LogicalException) {
      ctx.response.status(error.status).json({ message: error.message });
    } else {
      console.error(error);
      ctx.response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = ExceptionHandler;
