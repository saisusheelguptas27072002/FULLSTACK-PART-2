import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addNote}>
      <p>name:<input
          value={newNote}
          onChange={handleNoteChange}
        /></p>
        <div>
        <button type="submit">add</button>
        </div>
      </form>   
      <h1>Numbers</h1>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} />
        )}
     

        
    </div>
  )
}

export default App