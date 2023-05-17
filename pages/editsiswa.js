import { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Updatesiswa.module.css";
function Editsiswa({ siswaUpdateData }) {
  console.log("siswaid", siswaUpdateData);
  const router = useRouter();
  const [Addsiswa, setsiswa] = useState({
    Nama: "",
    Nomer_induk: "",
    Kelas: "",
    status: "",
  });
  useEffect(() => {
    setsiswa(siswaUpdateData[0]);
  }, [siswaUpdateData]);
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      `http://localhost:3000/api/siswa/${siswaUpdateData[0].id}`,
      Addsiswa
    );
    if (data.data) router.push('/utama');
    setsiswa({
        Nama : "",
        Nomer_induk: "",
        Kelas: "",
        status: "",
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setsiswa({ ...Addsiswa, [e.target.name]: value });
  };
  return (
    <>
      <div className={styles.addform}>
        <h1>ADD Siswa</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="Nama"
              placeholder="Enter Name"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.Nama}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="Nomer_induk"
              placeholder="Enter induk"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.Nomer_induk}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="Kelas"
              placeholder="Enter kelas"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.Kelas}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="status"
              placeholder="Enter status"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.status}
            />
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/utama`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Editsiswa;