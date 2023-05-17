import { NextApiRequest, NextApiResponse } from 'next'
import Editsiswa from "../editsiswa";

function updateSiswa({ siswa }) {
  console.log("siswa", siswa);
  return <Editsiswa siswaUpdateData={siswa} />;
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/siswa/ ${params.id}`);
  const siswa = await res.json();

  return {
    props: { siswa },
  };
}

export default updateSiswa;