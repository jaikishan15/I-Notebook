import * as express from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import { Auth } from "../middlewares/middlewares";
import { NotesController } from "../controllers/notes.controller";

const router = express.Router();

//user wants to add data in the notes
router.post(
  "/add",
  Auth.BasicAuth,
Auth.UserAuth,
Auth.ValidateUser,
  celebrate({
    body: {
      email: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      importantTopics: Joi.string().required(),
    },
  }),
  NotesController.addNote
);

//get all the notes of the user
router.get(
  "/fetch",
  Auth.BasicAuth,
  Auth.UserAuth, 
  Auth.ValidateUser,
  celebrate({
    body: {
      email: Joi.string().required(),
    },
  }),
  NotesController.fetchUserNotes
);

//user wants to delete the notes
router.delete(
  "/delete",
  Auth.BasicAuth,
  // Auth.UserAuth,
  // Auth.ValidateUser,
  celebrate({
    body: {
      email: Joi.string().required(),
    },
  }),
  NotesController.deleteNotes
);

//user wants to update the notes
router.put(
  "/update",
  Auth.BasicAuth,
  Auth.UserAuth,
  Auth.ValidateUser,
  celebrate({
    body: {
      email: Joi.string().required(),
      updates: Joi.object().required(),
    },
  }),
  NotesController.updateNotes
);
router.use(errors());

module.exports = router;
