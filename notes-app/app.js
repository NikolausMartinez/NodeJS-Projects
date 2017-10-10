const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

// Parses command line argument using yargs
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add new note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

// Fetches argument from user and stores it in an array;
var command = argv._[0];

var note;

if (command === 'add') {
    note = notes.addNote(argv.title, argv.body);
    if (note != null) {
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log('Printing ' + allNotes.length + ' note(s)');
    allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {
    note = notes.getNote(argv.title);
    if (note != null){
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    note = notes.removeNote(argv.title);

    var message = note ? 'Note ' + argv.title + ' was deleted' : 'Note not found';
    console.log(message);

} else {
    console.log('Command not recognized');
}
