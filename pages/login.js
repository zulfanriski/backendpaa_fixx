import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http:localhost:3000/api/login', { email, password });
      const { data } = response;

      // Simpan token ke localStorage
      localStorage.setItem('token', data.token);

      // Redirect ke halaman utama
      router.push('/bayar');
    } catch (error) {
      setError('Email atau password salah');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      {error && <div className="error">{error}</div>}

      <div>
        <label>Nama</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit">Login</button>
    </form>
    <a1>belum punya akun?</a1>
    <a href='registersiswa'>
    <button type="submit">Register</button>
    </a>
    </>
  );
}
