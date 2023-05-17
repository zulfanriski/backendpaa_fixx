const bcrypt = require('bcrypt');
const { executeQuery } = require('../../config/db');
import jwt from 'jsonwebtoken';

export default async function register(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { nama, email, password } = req.body;

  // validasi input
  if (!nama || !email || !password) {
    res.status(422).json({ message: 'Invalid input' });
    return;
  }
  // query untuk mencari user dengan email yang sama
  const findUserQuery = `SELECT * FROM akunsiswa WHERE email = '${email}'`;
  executeQuery(findUserQuery, async (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // jika user dengan email yang sama sudah terdaftar
    if (results.length > 0) {
      res.status(409).json({ message: 'Email already exists' });
      return;
    }

  
    const insertUserQuery = `INSERT INTO akunsiswa (nama, email, password) VALUES ('${nama}', '${email}', '${password}')`;
    executeQuery(insertUserQuery, async (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // buat token JWT
      const token = jwt.sign({ email }, 'chatketimbun', { expiresIn: '1h' });

      // kirim responsea
      res.status(201).json({ message: 'User registered', token });
    });
  });
}
