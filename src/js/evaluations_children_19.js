const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

var submitButton = document.getElementById('submit-button');
var physicalNotes = document.getElementById('physicalNotes');
var auditoryDeficiencyNotes = document.getElementById('auditoryDeficiencyNotes');
var visualDeficiencyNotes = document.getElementById('visualDeficiencyNotes');
var hivNotes = document.getElementById('hivNotes');
var nutritionNotes = document.getElementById('nutritionNotes');
var addictionNotes = document.getElementById('addictionNotes');

submitButton.onclick = () => {
    let checkup = {
        _id: uuidv4(),
        physicalNotes: physicalNotes.value,
        auditoryDeficiencyNotes: auditoryDeficiencyNotes.value,
        visualDeficiencyNotes: visualDeficiencyNotes.value,
        hivNotes: hivNotes.value,
        nutritionNotes: nutritionNotes.value,
        addictionNotes: addictionNotes.value,
        type: 'child10-19',
        date: new Date().toLocaleDateString('en-GB')
    };

    patientDb.get(id)
        .then((patient) => {
            if (patient.checkups) {
                patient.checkups.push(checkup);
            } else {
                patient.checkups = [checkup];
            }

            patientDb.put(patient)
                .then((res) => {
                    document.location.href = './patient_page.html?id=' + id;
                })
                .catch((err) => {
                    return console.log(err);
                })
        })
        .catch((err) => {
            return console.log(err);
        });
}