const profiling = require("../controller/profilingController");
const express = require("express");

const router = express.Router();

// POST ROUTES
router.post("/department", profiling.createDepartment);
router.post("/course", profiling.createCourse);
router.post("/student", profiling.createStudent);
router.post("/instructor", profiling.createInstructor);
router.post("/subject", profiling.createSubject);
router.post("/schedule", profiling.createSchedule);
router.post("/student-schedule", profiling.creaetStudentSchedule);
router.post("/payment", profiling.createPayment);

//GET ROUTES
router.get("/student", profiling.getStudent);
router.get("/subject", profiling.getSubject);
router.get("/subjectPage", profiling.getSubjectWithPage);
router.get("/schedule", profiling.getSchedule);
router.get("/instructor", profiling.getInstructor);
router.get("/student-schedule", profiling.getStudentSchedule);
router.get("/course", profiling.getCourse);
router.get("/payment", profiling.getPayment);

router.get("/student/:userId", profiling.getStudentById);
router.get("/subject-detail/:id", profiling.getSubjectById);
router.get("/subject/:userId", profiling.getSubjectByInstructor);
router.get("/schedule/:userId", profiling.getScheduleByInstructor);
router.get("/student-schedule/:id", profiling.getStudSchedBySubId);
router.get("/schedule-studentId/:userId", profiling.getStudentScheduById);
router.get("/payment/:id", profiling.getPaymentById);
router.get("/student-payment/:userId", profiling.getStudentPaymentStatus);
//update routes
router.put("/update-payment/:id", profiling.updatePayment);

//delete routes
router.delete("/delete-payment/:id", profiling.deletePayment);
module.exports = router;
