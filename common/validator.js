import Joi from "joi";
import { NextApiRequest, NextApiResponse } from 'next'
const siswaValidation = (data) => {
  const siswaSchme = Joi.object({
    Nama: Joi.string().required(),
    Nomer_induk: Joi.number().required(),
    Kelas: Joi.string().required(),
    status: Joi.string().required(),
  });
  return siswaSchme.validate(data);
};


export default siswaValidation;
