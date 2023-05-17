import Joi from "joi";


const akunSiswaValidation = (data) => {
    const akunScheme = Joi.object({
      nama: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return akunScheme.validate(data);
  };
export default akunSiswaValidation;