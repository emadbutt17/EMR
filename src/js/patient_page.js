var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

// On Load
let header = document.getElementById('page-header');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

patientDb.get(id)
.then(function(doc) {
    header.innerText = doc.name;
})
.catch(function(err) {
    console.log(err);
});

// Button Actions
let patientHistoryButton = document.getElementById('patient-history-button');
patientHistoryButton.addEventListener("click", function() {
    document.location.href = "./patient_history.html?id=" + id;
});

let patientDiagnosesButton = document.getElementById('patient-diagnoses-button');
patientDiagnosesButton.addEventListener('click', function() {
    document.location.href = './patient_diagnoses_flex.html?id=' + id;
});

let patientPrescriptionsButton = document.getElementById('patient-prescriptions-button');
patientPrescriptionsButton.addEventListener('click', function() {
    document.location.href = './patient_prescriptions.html?id=' + id;
});

let patientCheckupsButton = document.getElementById('new-checkup-button');
patientCheckupsButton.addEventListener('click', function() {
    document.location.href = './Diagnostics_Notes.html?id=' + id;
});