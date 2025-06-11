import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desceding order (newest note) 
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in fetching notes: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id });
    if (!note)
      return res.status(404).json({ message: "No note found by that id" });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in fetching notes: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
    });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in creating notes: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id },
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updating note: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id, { new: true });
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(deletedNote);
  } catch (error) {
    console.log("Error in deleting note: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
