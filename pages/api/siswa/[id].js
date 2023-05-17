import { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import { withAuth } from '@/common/middleware';
import {
  getSiswaById,
  deletesiswaById,
  updateSiswa,
} from "../../../controller/siswa";

const handler = nc({ onError });
handler.get(getSiswaById);
handler.delete(deletesiswaById);
handler.put(updateSiswa);
export default handler;