const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

function getNotes() {
  let notes = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
  const parsedNotes = JSON.parse(notes);
  return parsedNotes;
}


function createNewNote(note) {
  
  let all = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
  let notes = JSON.parse(all);
  const { title, text } = note;
  const newNote = { title, text, id: uuid() };
  notes.push(newNote);
  console.log("@@@@@@", notes);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify( notes, null, 2)
  );

  return newNote;

}



function deleteOldNote(id) {
  let all = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8");
  let newAll = JSON.parse(all);
  const notes = newAll.filter((note) => note.id !== id);
  console.log("######", notes);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify( notes, null, 2)
  );
}

module.exports = {
  getNotes,
  deleteOldNote,
  createNewNote,
};
