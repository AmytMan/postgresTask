const { Note, patient } = require("../models/NoteModel.js");

const userNoteController = async (req, res) => {
  try {
    const patientinfo = await patient.findAll({
      include: {
        model: Note,
      },
    });
    res.status(200).json(patientinfo);
  } catch (error) {
    res.send("An error occurred");
  }
};

const addNoteController = async (req, res) => {
  try {
    const { patientName, visitDate, ...rest } = req.body;
    const note = await Note.create(rest);
    const patients = await patient.create({ patientName, visitDate });
    await patients.setNote(note);
    res
      .status(201)
      .json({ msg: "note added successfully", success: true, note, patients });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateNoteController = async (req, res) => {
  const id = req.query.id;
  try {
    const patientInfo = await patient.findByPk(id, {
      include: Note,
    });

    if (!patientInfo) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    const updatedNote = await patient.update(
      {
        patientName: req.body.patientName || patientInfo.patientName,
        visitDate: req.body.visitDate || patientInfo.visitDate,
      },
      {
        where: { patientId: id },
      }
    );
    if (patientInfo.Note) {
      await patientInfo.Note.update({
        doctorName: req.body.doctorName || patientInfo.Note.doctorName,
        noteDescription:
          req.body.noteDescription || patientInfo.Note.noteDescription,
        doctorSpeciality:
          req.body.doctorSpeciality || patientInfo.Note.doctorSpeciality,
      });
    }
    res
      .status(200)
      .json({
        success: true,
        msg: "Note updated successfully",
        note: updatedNote,
      });
  } catch (error) {
    res.status(400).json({ msg: "Error updating note", error });
  }
};


const deleteNoteController = async (req, res) => {
  const id = req.query.id;

  try {
    const patientInfo = await patient.findByPk(id);
    const docinfo = await Note.findByPk(id);
    if (!patientInfo) {
      return res.status(404).json({ msg: "patient not found" });
    }
    await patientInfo.destroy();
    await docinfo.destroy();
    res.status(200).json({ msg: "deleted successfully", success: docinfo });
  } catch (error) {
    res.status(400).json({ msg: "Error deleting ", error });
  }
};
const getNoteByNoteID = async (req, res) => {
  try {
    const id = req.query.id;
    const singlePatient = await patient.findByPk(id, {
      include: Note,
    });
    res.status(200).json({ msg: singlePatient });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const createPatient = async (req, res) => {
  try {
    const id = req.query.id;
    const note = await Note.findByPk(id);
    const cp = await patient.create(req.body);
    await cp.setNote(note);
    res.status(200).json({ msg: cp });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  userNoteController,
  addNoteController,
  updateNoteController,
  deleteNoteController,
  getNoteByNoteID,
  createPatient,
};
