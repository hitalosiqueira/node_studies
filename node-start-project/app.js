console.log("app.js");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

var command = process.argv[2];
var argv = yargs.argv

if(command === "add"){
    notes.addNote(argv.title, argv.body);
}else if(command === "list"){
    notes.listNotes();
}else if(command === "read"){
    notes.readNote(argv.title);
}else if(command === "remove"){
    notes.removeNote(argv.title);
}else{
    console.log("not a command");
}