const Joi = require('joi');

function validateTodo(todo) {
	const schema = {
		text: Joi.string().min(1).max(400).required(),
		completed: Joi.boolean(),
		added: Joi.string().min(1),
		userID: Joi.string().min(3),
		_id: Joi.string(),
		__v: Joi.number(),
	};
	const result = Joi.validate(todo, schema);
	return result;
}

module.exports =  validateTodo;
