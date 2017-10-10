
const fs =require('fs');

var orginalNote = {
    title: 'Some title',
    body: 'Some body'
};

// takes object converts to string
var originalNoteString = JSON.stringify(orginalNote);

// Write to file
fs.writeFileSync('notes.json', originalNoteString);

// Read file
var noteString = fs.readFileSync('notes.json');

// converts string back to object
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);