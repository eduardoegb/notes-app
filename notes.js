// node dependencies
const fs = require('fs');
// node_modules dependencies
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.filter(note => note.title === title);

  if (duplicate.length === 0) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green.bold('Note added!!!'));
  } else {
    console.log(chalk.red.bold('Title already exists!'));
  };
};

const removeNote = title => {
  const notes = loadNotes();

  const notesModified = notes.filter(note => note.title!==title);

  if (notesModified.length === notes.length) {
    console.log(chalk.red.bold('Note does not exist!'));
  } else {
    saveNotes(notesModified);
    console.log(chalk.yellow.bold('Note deleted!'));
  };
};

const listNotes = () => {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.red.bold('List is empty!'));
  } else {
    console.log(chalk.blue.bold('Your notes:'));
    notes.forEach(note => console.log('- ' + note.title));
  };
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.blue.underline(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.bold('Note not found! Please check the list.'));
  };
};

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync('notes.json');
    const notesJSON = notesBuffer.toString();

    return JSON.parse(notesJSON);
  } catch (error) {
    return [];
  };
};

const saveNotes = notes => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};