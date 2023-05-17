
const { executeQuery } = require('../../config/db');

export default async function register(req, res) {
  if (req.method  !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { nama, kelas, nominal, nomer_absen , tanggal } = req.body;

    const insertUserQuery = `INSERT INTO kas (nama, kelas, nomer_absen,nominal,tanggal) VALUES ('${nama}', '${kelas}', '${nomer_absen}', '${nominal}', '${tanggal}')`;
    executeQuery(insertUserQuery, async (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      else {
        res.status(201).json({ message: 'Berhasil melakukan pembayaran'});

      }
          

  });
}
