console.log("notes.js");
const fs = require('fs');

var addNote = (title, body) =>{
    var notes = [];
    var note = {
        title,
        body
    }

    try {
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);    
    } catch (error) {
        
    }

    var duplicateNotes = notes.filter((note) => note.title === title);
    
    if(duplicateNotes.length === 0){
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    }
}

var listNotes = () => {
    console.log("notes");
}

var readNote = (title) => {
    console.log(title);
}

var removeNote = (title) => {
    console.log(`${title} removed`);
}

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote
}