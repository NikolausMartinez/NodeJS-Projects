const fs = require ('fs');

var fetchNotes = () => {

    // see if the file exits your writing to. If not this will create it.
    try {
        // so notes-data.json doesn't get over written
        var notesString = fs.readFileSync('notes-data.json');

        // adds string to an array
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }

};

var saveNotes = (notes) => {

    // converts the notes object to a string and adds it to the notes-data.json file
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    // checks the notes in the notes array and if they titles match add it to duplicateNotes array
    var duplicateNotes = notes.filter((note) => note.title === title);

    // if the note isn't a duplicate add the note
    if (duplicateNotes.length === 0) {
        // adds note to the notes array
        notes.push(note);

        // converts the notes object to a string and adds it to the notes-data.json file
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));

        // Save new note
        saveNotes(notes);
        
        return note;

    } else {
        
    }

};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    // Get all notes
    var notes = fetchNotes();

    // Filter out notes, getting one with title of argument
    var filteredNotes = notes.filter((note) => note.title === title);
    
    return filteredNotes[0];

};

var removeNote = (title) => {
    // Get all the notes
    var notes = fetchNotes();

    // filter out notes, removing the one with title of argument
    var filteredNotes = notes.filter((note) => note.title !== title);

    // Save new notes
    saveNotes(filteredNotes);
    
    // return true if note was deleted
    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    console.log('---------------------');
    console.log('Title: ' + note.title);
    console.log('Body: ' + note.body);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};

