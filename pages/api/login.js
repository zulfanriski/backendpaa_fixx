import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { pool } from '../../config/db';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
        
      const [user] = await pool.query('SELECT * FROM akunsiswa WHERE email = ? ', [email]);
      console.log(user.email)
      
      if (!user.email || password != user.password) {
        res.status(401).json({ message: 'Email or password is incorrect.' });
        console.log(user);
        console.log(password)
        return;
      }

      const token = jwt.sign({ id: user.id }, "ZULFAN");

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'strict',
        path: '/',
      };
      res.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));

      res.status(200).json({ message: 'Login successful.', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
