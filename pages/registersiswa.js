import { useState } from 'react';

export default function Register() {
  const [nama, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // redirect ke halaman sukses jika berhasil
      window.location.href = '/login';
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={nama} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
</label>
{errorMessage && <p>{errorMessage}</p>}
<button type="submit">Register</button>
</form>
</div>
);
}
