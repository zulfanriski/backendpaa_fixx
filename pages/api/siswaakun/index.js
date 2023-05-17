import { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import { saveAccSiswa, getAccSiswa } from '@/controller/siswaacc';

const handler = nc(onError);
handler.post(saveAccSiswa);
export default handler;