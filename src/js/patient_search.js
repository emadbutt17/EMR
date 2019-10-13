var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

// Create an index on patient name so we can search for them easily
// Does nothing if index already exists
patientDb.createIndex({
  index: {
      fields: ['name']
  }
}, function(err, result) {
  if (err) {
      return console.log(err);
  }

  // TODO: handle results
  console.log(result);
});

function searchForPatientByName() {
  let patientName = document.getElementById('searchByNameText').value;

  patientDb.find({
      selector: {name: patientName},
      fields: ['_id', 'name'],
      sort: ['name']
  }, function(err, result) {
      if (err) { console.log(err); }
      // handle result
      console.log('we did it: ')
      console.log(result);
  });
};

var searchByNameButton = document.getElementById('searchByNameButton');
var searchByIdButton = document.getElementById('searchByIdButton');

searchByNameButton.onclick = searchForPatientByName;