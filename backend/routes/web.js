const {
  userNoteController,
  addNoteController,
  updateNoteController,
  deleteNoteController,
  getNoteByNoteID,
  createPatient,
} = require("../controllers/UserControllers.js");

const express = require("express");
const router = express.Router();

router.get("/users", userNoteController);
router.get(`/user`, getNoteByNoteID);
router.post("/users", addNoteController);
router.put("/users", updateNoteController);
router.post("/patients", createPatient);
router.delete("/users", deleteNoteController);

module.exports = router;
