import { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
    getAllsiswa,
    saveSiswa,
} from "../../../controller/siswa";

const handler = nc(onError);
handler.get(getAllsiswa);
handler.post(saveSiswa);
export default handler;