const Joi = require('joi');

function validateTodo(todo) {
	const schema = {
		text: Joi.string().min(1).max(200).required(),
		completed: Joi.boolean(),
		added: Joi.string().min(1),
	};
	const result = Joi.validate(todo, schema);
	return result;
}
module.exports = validateTodo;
