var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

// On Load
let header = document.getElementById('page-header');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);
console.log("ID: " + id);

patientDb.get(id)
.then(function(doc) {
    header.innerText = doc.name;
})
.catch(function(err) {
    console.log("in here");
    console.log(err);
    console.log("id: " + id);
});

// Button Actions
let patientHistoryButton = document.getElementById('patient-history-button');
patientHistoryButton.addEventListener("click", function() {
    console.log("changing page");
    console.log("id: " + id);
    document.location.href = "./patient_history.html?id=" + id;
});