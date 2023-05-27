const router = require("express").Router();
const { getNotes, createNewNote, deleteOldNote } = require("../lib/notes.js");
const fs = require("fs");
const path = require("path")

// router.get("/notes", async (req, res) => {
//   let parsedNotes = await getNotes();
//   res.json(parsedNotes.notes);
// });

router.get("/notes", (req, res) => {
  res.json(getNotes());
});
///

// router.post("/notes", async (req, res) => {
//   let notes = await createNewNote(req.body)
//   res.json(notes)
// });

router.post("/notes", ({ body }, res) => res.json(createNewNote(body)));

/* router.delete("/notes/:id", async (req, res) => {
  let notes = await deleteOldNote(req.params.id);
  res.json(notes)
}); */

// router.delete("/notes/:id", (req, res) =>
//   res.json(deleteOldNote(req.params.id))
// );

router.delete("/notes/:id", (req, res) =>{
  let all = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8");
    let newAll = JSON.parse(all);
    const notes = newAll.filter((note) => note.id !== req.params.id);
    console.log("######", notes);
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify( notes, null, 2)
    );
  res.json({message:"success"})
})


module.exports = router;
