import { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/tambahsiswa.module.css";
import Link from 'next/link';
function Addsiswa() {
  const router = useRouter();
  const [Addsiswa, setsiswa] = useState({
    Nama: "",
    Nomer_induk: "",
    Kelas: "",
    status: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(
      'http://localhost:3000/api/siswa',
      Addsiswa
    );
    if (data.data) router.push("/utama");
    setsiswa({
      Nama: "",
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
        <h1>ADD SISWA</h1>
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
              placeholder="Enter Induk Number"
              onChange={handleChange}
              value={Addsiswa && Addsiswa.Nomer_induk}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="Kelas"
              placeholder="Enter Kelas"
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
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addsiswa;