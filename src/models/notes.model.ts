import { Schema, model, Document } from "mongoose";
import { DATABASE_NAMES } from "../constants/databaseNames";

export interface INotesModel extends Document {
  email: String;
  title: String;
  description: String;
  importantTopics: String;
}
export const NotesSchema = new Schema({
  email: { type: String, require: true },
  title: { type: String, required: true, min: 4 },
  description: { type: String, require: true, min: 4 },
  importantTopics: { type: String, min: 4 },
});
export const Notes = model<INotesModel>(DATABASE_NAMES.NOTES, NotesSchema);
