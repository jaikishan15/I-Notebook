import { SUCCESS } from "../constants/success";
import { ERROR } from "../constants/errors";
require("dotenv").config();
import { MongoDao } from "../daolayer/mongoDao";
import { Notes } from "../models/notes.model";
import { INotesModel } from "../models/notes.model";

// const NotesDao = new MongoDao<INotesModel>(Notes);
const notesDao = new MongoDao<INotesModel>(Notes);

export const NotesController = {
  addNote: async (req: any, res: any) => {
    try {
      let addNewNote = req.body;
      await notesDao.create(addNewNote);
      res.status(SUCCESS.POST_201.code).json(SUCCESS.POST_201);
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },
  fetchUserNotes: async (req: any, res: any) => {
    try {
      let email = req.body.email;
      let notes = await notesDao.findOneByFields({ email });
      console.log(notes)
      res.status(201).json(notes);
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },

  updateNotes: async (req: any, res: any) => {
    try {
      let email = req.body.email;
      let updates = req.body.updates;
      let note = await notesDao.update({ email:email }, updates );
      res.status(201).json(note);
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },

  deleteNotes: async (req: any, res: any) => {
    try {
      let email = req.body.email;
      let data = await notesDao.delete({ email });
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404);
      }
    } catch (err: any) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send({ ...ERROR.INTERNAL_SERVER_ERROR_500, databaseError: err });
    }
  },
};
