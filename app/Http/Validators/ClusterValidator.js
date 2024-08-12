const { schema, rules } = use('@adonisjs/core/src/Validator');

class ClusterValidator {
  static get rules() {
    return {
      name: 'required|string|min:3|max:255',
    };
  }

  static get messages() {
    return {
      'name.required': 'Name is required',
      'name.string': 'Name must be a string',
      'name.min': 'Name must be at least 3 characters',
      'name.max': 'Name must be at most 255 characters',
    };
  }
}

module.exports = ClusterValidator;
