

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Siswa.module.css";

const LihatKas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/lihatkas");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.cols}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Nomer</th>
            <th className={styles.th}>Nama siswa</th>
            <th className={styles.th}>Nomer induk</th>
            <th className={styles.th}>Kelas</th>
            <th className={styles.th}>Nominal</th>
            <th className={styles.th}>Tanggal pembayaran</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((empData, index) => (
            <tr key={index}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{empData.nama}</td>
              <td className={styles.td}>{empData.nomer_absen}</td>
              <td className={styles.td}>{empData.kelas}</td>
              <td className={styles.td}>{empData.nominal}</td>
              <td className={styles.td}>{empData.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LihatKas;
