const path = require('path');
const router = require('express').Router();
const fs = require('fs');
let nextId;
let notes;


fs.readFile('./db/db.json', function (err, data){
  if (err) throw err;  
  notes= JSON.parse(data);
  currentId= notes[notes.length-1].id
  nextId= currentId +1
  console.log(notes)
  console.log(nextId)
});

// Displays all notes
router.get("/notes", function(req, res) {
    return res.json(notes);
  });

// Displays a single character, or returns false
router.get("/notes/:id", function(req, res) {
    var chosen = req.params.id;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen == notes[i].id) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });

// Create New Characters - takes in JSON input
router.post("/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  
  newNote.id = nextId
  nextId++

  console.log(newNote);

  notes.push(newNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), function (err){
    if (err) throw err 
        
  })
  res.json(newNote);
});

router.delete("/notes/:id", function(req, res) {
  var chosen = req.params.id;

  console.log(chosen);

  for (var i = 0; i < notes.length; i++) {
    if (chosen == notes[i].id) {
      notes.splice(i, 1);
    }
  }
  fs.writeFile('./db/db.json', JSON.stringify(notes), function (err){
    if (err) throw err 
        
  })
    console.log("Deleted")
  return res.json(notes);



});

module.exports = router;
