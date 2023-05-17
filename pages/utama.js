import { NextApiRequest, NextApiResponse } from 'next'
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/siswa.module.css";
import axios from "axios";
import { withAuth } from '@/common/middleware';
import nookies from 'nookies';

function Home({ data }) {
  console.log("data", data);
  const router = useRouter();
  const deletesiswa = async (id) => {
    let data = await axios.delete(`http://localhost:3000/api/siswa/${id}`);
    router.push("/utama");
  };
  return (
    <div className={styles.cols}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>IDsiswa</th>
            <th className={styles.th}>Namasiswa</th>
            <th className={styles.th}>Nomerinduk</th>
            <th className={styles.th}>Kelas</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((empData, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{empData.Nama}</td>
              <td className={styles.th}>{empData.Nomer_induk}</td>
              <td className={styles.th}>{empData.Kelas}</td>
              <td className={styles.th}>{empData.status}</td>
              <td className={styles.btn__cols}>
                <button
                  className={styles.delete}
                  onClick={() => deletesiswa(empData.id)}
                >
                  Delete
                </button>
                <button className={styles.update}>
                <Link href={`/siswa/${empData.id}`}>Update</Link>
              </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addEmployeeCenter}>
        <button className={styles.addEmployee}>
          <Link href={`/tambahsiswa`}>tambahsiswa</Link>
        </button>
      </div>
     
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch("http://localhost:3000/api/siswa");
  const data = await res.json();
  const cookies = nookies.get(ctx)
  if (!cookies.token) {
    return{
      redirect: {
        destination:'/login'
      }
    }}
    return {
    props: { data },
  };
}

export default Home;