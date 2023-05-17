import React from 'react';
import Image from 'next/image';

export default function index() {
  return (
    <>
    <h1>
      Pilih Role anda!
    </h1>

    <div className='box1'>
    <a href='loginAdmin'>admin</a>
    </div>

    <div className='box2'>
    <a href='login'>siswa</a>
    </div>
    
    
    </>
  )
}
