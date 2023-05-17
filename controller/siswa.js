import { NextApiRequest, NextApiResponse } from 'next'

import { executeQuery } from "../config/db";
import siswaValidation from "../common/validator";
import ErrorHandler from "../common/errorHandler";
const getAllsiswa = async (req, res) => {
  try {
    console.log("Semua siswa employees");
    let siswaData = await executeQuery("select * from datasiswa", []);
    res.send(siswaData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSiswaById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("Siswa by id");
    let siswaData = await executeQuery(
      `select * from datasiswa where id=?`,
      [id]
    );
    if (siswaData.length > 0) res.status(200).json(siswaData);
    else {
      next(new ErrorHandler(`no siswa found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletesiswaById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let siswaData = await executeQuery(
      "delete from datasiswa where id=?",
      [id]
    );
    res.status(200).json("Siswa Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveSiswa = async (req, res) => {
  try {
    const result = req.body;
    const { Nama, Nomer_induk, Kelas, status } = result;
    let { error } = siswaValidation(result);
    if (error) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request");
      let siswaData = await executeQuery(
        "insert into datasiswa(Nama,Nomer_induk,Kelas,status) values(?,?,?,?)",
        [Nama, Nomer_induk, Kelas, status]
      );
      siswaData = await executeQuery(
        `select * from datasiswa where id=${siswaData.insertId}`
      );
      res.status(201).json(siswaData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateSiswa = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { Nama, Nomer_induk, Kelas, status } = req.body;
  console.log("req.body", req.body);
  try {
    let siswaData = await executeQuery(
      "select * from datasiswa where id=?",
      [id]
    );
    if (siswaData.length > 0) {
      console.log("putrequest", siswaData);
      siswaData = await executeQuery(
        `update datasiswa set Nama=?,Nomer_induk=?,Kelas=?,status=? where id=${id}`,
        [Nama, Nomer_induk, Kelas, status]
      );
      res.status(200).json(siswaData);
    } else {
      res.status(400).json(`siswa not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllsiswa,
  getSiswaById,
  deletesiswaById,
  saveSiswa,
  updateSiswa,
};