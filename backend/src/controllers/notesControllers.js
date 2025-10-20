import Note from '../models/Note.js'

export async function getAllNotes(_,res){
  try {
    const notes = await Note.find().sort({createdAt:-1}) // newest first
    res.status(200).json(notes) 
  } catch (error) {
    console.log(`Error in the getAllNotes ${error}`);
    res.status(500).json({message:`Internal server error `})    
  }
}

export async function getNoteById(req,res) {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note)
  } catch (error) {
    console.log(`Error in the getNotesById ${error}`);
    res.status(500).json({message:`Internal server error `})  
  }
  
}

export async function createNotes(req,res){
  try {
    const {title,content} = req.body   
    const note = new Note({title,content})

    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (error) {
    console.log(`Error in the createNotes ${error}`);
    res.status(500).json({message:`Internal server error `})
  }
}

export async function updateNotes(req,res){
  try {
    const {title,content} = req.body
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
      new:true
    })

    // if note not exist
    if (!updateNotes) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({
      message: 'Note updated successfully',
      updatedNote, // ✅ correct variable name here
    });
  } catch (error) {
    console.log(`Error in the updateNotes ${error}`);
    res.status(500).json({message:`Internal server error `})
  }
}

export async function deleteNotes(req,res){
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    // if note not exist
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    console.log(`Error in the deleteNotes ${error}`);
    res.status(500).json({message:`Internal server error `})
  }
}

