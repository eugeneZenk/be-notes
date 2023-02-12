import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
});

export default mongoose.model('Notes', NotesSchema);