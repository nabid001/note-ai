import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  title: { type: String, required: true },
});

const Note = models.Note || model("Note", NoteSchema);
