const express = require("express");
const { executeQuery } = require("../config/db");
const port = 9000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/siswa", async (req, res) => {
  try {
    let siswaData = await executeQuery("select * from datasiswa");
    res.status(200).json(siswaData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/siswa/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let siswaData = await executeQuery(
      "select * from datasiswa where id=?",
      [id]
    );
    res.status(200).json(siswaData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/saveSiswa", async (req, res) => {
  try {
    const { nama,induk,kelas,status } = req.body;
    let employeeData = await executeQuery(
      "insert into datasiswa(Nama,Nomer_induk,Kelas,status) values(?,?,?,?)",
      [nama,induk,kelas,status]
    );
    res.status(201).json(siswaData);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/saveAcccSiswa", async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    let accsiswa = await executeQuery(
      "insert into akunsiswa(nama, email, password) values(?,?,?,?)",
      [nama, email, password]
    );
    res.status(201).json(accsiswa);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.listen(port, () => console.log(`server is running on port ${port}`));