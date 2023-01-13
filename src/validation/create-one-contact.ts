import Joi from "joi";

export const createOneContactSchema = Joi.object({
	name: Joi.string()
		.pattern(new RegExp("^[a-zA-Z]{2,50}$"))
		.max(50)
		.min(2)
		.required(),
});
