const profiling = require("../model/profilingModel");
const mongoose = require("mongoose");

//Create

//create department
const createDepartment = async (req, res) => {
  try {
    const addministration = await profiling.Department.create(req.body);
    if (!addministration) {
      res.status(401).json({ message: "Failed to create addministration" });
    }
    res.status(200).json(addministration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create course
const createCourse = async (req, res) => {
  try {
    const course = await profiling.Course.create(req.body);
    if (!course) {
      res.status(401).json({ message: "Failed to create course" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create student
const createStudent = async (req, res) => {
  try {
    const student = await profiling.Student.create(req.body);
    if (!student) {
      res.status(401).json({ message: "Failed to create student" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create instructor
const createInstructor = async (req, res) => {
  try {
    const instructor = await profiling.Instructor.create(req.body);
    if (!instructor) {
      res.status(401).json({ message: "Failed to create student" });
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create subject
const createSubject = async (req, res) => {
  try {
    const subject = await profiling.Subject.create(req.body);
    if (!subject) {
      res.status(401).json({ message: "Failed to create student" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create schedule
const createSchedule = async (req, res) => {
  try {
    const schedule = await profiling.Schedule.create(req.body);
    if (!schedule) {
      res.status(401).json({ message: "Failed to create student" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create student schedule
const creaetStudentSchedule = async (req, res) => {
  try {
    const studentSchedule = await profiling.StudenSchedule.create(req.body);
    if (!studentSchedule) {
      res.status(401).json({ message: "Failed to create student" });
    }
    res.status(200).json(studentSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetch

//get student
const getStudent = async (req, res) => {
  try {
    const student = await profiling.Student.find().populate("course");
    if (!student) {
      res.status(401).json({ message: "No Student Found!" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get studentbyId
const getStudentById = async (req, res) => {
  const userId = req.params.userId; // Access userId directly
  try {
    const student = await profiling.Student.findById(userId);
    if (!student) {
      return res.status(401).json({ message: "No Student Found!" });
    }
    return res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get subject
const getSubject = async (req, res) => {
  try {
    const subject = await profiling.Subject.find().populate([
      "course",
      "instructor",
    ]);
    if (!subject) {
      res.status(401).json({ message: "No Student Found!" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get specific subject
const getSubjectById = async (req, res) => {
  const id = req.params.id;
  try {
    const subject = await profiling.Subject.findById(id).populate([
      "course",
      "instructor",
    ]);
    if (!subject) {
      res.status(401).json({ message: "No Student Found!" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get subject assigned
const getSubjectByInstructor = async (req, res) => {
  const userId = req.params.userId;

  try {
    const Subject = await profiling.Subject.aggregate([
      {
        $lookup: {
          from: "courses", // Replace with your actual subject collection name
          localField: "course",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $unwind: "$courseInfo",
      },
      {
        $lookup: {
          from: "instructors", // Replace with your actual instructor collection name
          localField: "instructor",
          foreignField: "_id",
          as: "instructorInfo",
        },
      },
      {
        $unwind: "$instructorInfo",
      },
      {
        $match: {
          "instructorInfo._id": new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId type if using Mongoose
        },
      },
    ]);

    if (!Subject || Subject.length === 0) {
      return res
        .status(401)
        .json({ message: "No Subject Found for this Instructor!" });
    }

    res.status(200).json(Subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get schedule
const getSchedule = async (req, res) => {
  try {
    const schedule = await profiling.Schedule.find().populate({
      path: "subject",
      populate: ["instructor", "course"],
    });
    if (!schedule) {
      res.status(401).json({ message: "No Student Found!" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get schedule by instructor id
const getScheduleByInstructor = async (req, res) => {
  const userId = req.params.userId;

  try {
    const schedule = await profiling.Schedule.aggregate([
      {
        $lookup: {
          from: "subjects", // Replace with your actual subject collection name
          localField: "subject",
          foreignField: "_id",
          as: "subjectInfo",
        },
      },
      {
        $unwind: "$subjectInfo",
      },
      {
        $lookup: {
          from: "instructors", // Replace with your actual instructor collection name
          localField: "subjectInfo.instructor",
          foreignField: "_id",
          as: "instructorInfo",
        },
      },
      {
        $unwind: "$instructorInfo",
      },
      {
        $match: {
          "instructorInfo._id": new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId type if using Mongoose
        },
      },
    ]);

    if (!schedule || schedule.length === 0) {
      return res
        .status(401)
        .json({ message: "No Schedule Found for this Instructor!" });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get instructors
const getInstructor = async (req, res) => {
  try {
    const instructor = await profiling.Instructor.find().populate("department");
    if (!instructor) {
      res.status(400).json({ message: "No instructor in the database" });
    }
    return res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get student schedule
const getStudentSchedule = async (req, res) => {
  try {
    const studentSched = await profiling.StudenSchedule.find()
      .populate("student")
      .populate({ path: "schedule", populate: "subject" });
    if (!studentSched) {
      return res.status(400).json({ message: "No Student in this subject" });
    }
    return res.status(200).json(studentSched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get student schedule By Subject ID
const getStudSchedBySubId = async (req, res) => {
  const id = req.params.id;

  try {
    const studSubSched = await profiling.StudenSchedule.aggregate([
      {
        $lookup: {
          from: "students", // Replace with your actual subject collection name
          localField: "student",
          foreignField: "_id",
          as: "studentInfo",
        },
      },
      {
        $unwind: "$studentInfo",
      },
      {
        $lookup: {
          from: "schedules", // Replace with your actual instructor collection name
          localField: "schedule",
          foreignField: "_id",
          as: "scheduleInfo",
        },
      },
      {
        $unwind: "$scheduleInfo",
      },
      {
        $lookup: {
          from: "subjects", // Replace with your actual instructor collection name
          localField: "scheduleInfo.subject",
          foreignField: "_id",
          as: "subjectInfo",
        },
      },
      {
        $unwind: "$subjectInfo",
      },
      {
        $lookup: {
          from: "courses", // Replace with your actual instructor collection name
          localField: "subjectInfo.course",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $unwind: "$courseInfo",
      },
      {
        $lookup: {
          from: "instructors", // Replace with your actual instructor collection name
          localField: "subjectInfo.instructor",
          foreignField: "_id",
          as: "instructorInfo",
        },
      },
      {
        $unwind: "$instructorInfo",
      },
      {
        $match: {
          "subjectInfo._id": new mongoose.Types.ObjectId(id), // Convert userId to ObjectId type if using Mongoose
        },
      },
    ]);

    if (!studSubSched || studSubSched.length === 0) {
      return res
        .status(401)
        .json({ message: "No Schedule Found for this Instructor!" });
    }

    res.status(200).json(studSubSched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  //create
  createDepartment,
  createCourse,
  createStudent,
  createInstructor,
  createSubject,
  createSchedule,
  creaetStudentSchedule,

  //fetch
  getSubject,
  getStudent,
  getSchedule,
  getStudentById,
  getScheduleByInstructor,
  getInstructor,
  getSubjectByInstructor,
  getSubjectById,
  getStudentSchedule,
  getStudSchedBySubId,
};
