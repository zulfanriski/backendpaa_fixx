import { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import { getAccSiswa } from '@/controller/siswaacc';

const handler = nc(onError);
handler.post(getAccSiswa);
export default handler;