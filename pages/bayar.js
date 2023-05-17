import { useState } from 'react';
import nookies from 'nookies';


//cek apakah user punya token
export async function getServerSideProps(ctx) {
  const res = await fetch("http://localhost:3000/api/bayarkas");
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


export default function kas() {
  const [nama, setName] = useState('');
  const [kelas, setKelas] = useState('');
  const [nominal, setNominal] = useState('');
  const [nomer_absen, setAbsen] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/bayarkas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, kelas, nominal, nomer_absen, tanggal }),
    });

    const data = await res.json();

    if (res.ok) {
      // redirect ke halaman sukses jika berhasil
      window.location.href ='';
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div>
      <h1>Bayar Kas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={nama} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Kelas:
          <input type="text" value={kelas} onChange={(e) => setKelas(e.target.value)} />
        </label>
        <label>
          Nomer Induk:
          <input type="text" value={nomer_absen} onChange={(e) => setAbsen(e.target.value)} />
        </label>
        <label>
          Nominal:
          <input type="text" value={nominal} onChange={(e) => setNominal(e.target.value)} />
        </label>
        <label>
          Tanggal:
          <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
</label>
{errorMessage && <p>{errorMessage}</p>}
</form>
<a href='berhasil'>
<button type="submit">Bayar</button>
</a>
</div>
);
}


