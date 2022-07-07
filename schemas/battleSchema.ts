import Joi from "joi";

const battleSchema = Joi.object({
    firstFighter: Joi.string().required(),
    secondFighter: Joi.string().required(),
});

export default battleSchema;
