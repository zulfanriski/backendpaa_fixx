import { NextApiRequest, NextApiResponse } from 'next'

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/siswaakun/ ${params.id}`);
  const akun = await res.json();

  return {
    props: { akun },
  };
}

export default updateSiswa;