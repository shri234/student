const express = require("express");
const data = require("./student.model");
const electivedata = require("./elective.model");
const get_student = async (req, res) => {
  let student_data = await data.find();
  res.render("listpage", { students: student_data });
};

const create_student = async (req, res) => {
  try {
    let elective_find = await electivedata.findOne({
      Elective: req.body.Elective,
    });
    if (elective_find.Seats != 0) {
      let student_body = new data({
        Name: req.body.Name,
        RollNo: req.body.Rollno,
        Elective: req.body.Elective,
      });
      await student_body.save();

      const id = elective_find._id;
      let student_update = await electivedata.findByIdAndUpdate(id, {
        Seats: elective_find.Seats - 1,
      });

      res.redirect("get/elective");
    } else {
      res.status(500).json({
        Error: "pls check the department you have selected has seats left",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const create_elective = async (req, res) => {
  let create_elective = new electivedata({
    Elective: req.body.Elective,
    Seats: req.body.Seats,
  });
  await create_elective.save();
  res.status(200).json({
    message: "Created Successfully",
    data: create_elective,
  });
};
const get_elective = async (req, res) => {
  let get_electivedata = await electivedata.find();
  res.render("index", { electives: get_electivedata });
};
const getone_elective = async (req, res) => {
  let get_electivedata = await electivedata.find();
  let arr = [];
  for (let i = 0; i < get_electivedata.length; i++) {
    arr.push(get_electivedata[i].Elective);
  }
  res.render("index", { electivedata: arr });
};
module.exports = {
  get_student,
  create_student,
  create_elective,
  get_elective,
  getone_elective,
};
