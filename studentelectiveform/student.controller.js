const express = require("express");
const Controller = require("./student.service");
const router = express.Router();
router.get("/get", Controller.get_student);
router.post("/create", Controller.create_student);

router.post("/create/elective", Controller.create_elective);
router.get("/get/elective", Controller.get_elective);
router.post("/create/1", Controller.getone_elective);
module.exports = router;
