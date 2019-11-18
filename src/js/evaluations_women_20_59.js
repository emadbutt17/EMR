const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

var submitButton = document.getElementById('submit-button');
var tbNotes = document.getElementById('tbNotes');
var oralNotes = document.getElementById('oralNotes');
var menopauseNotes = document.getElementById('menopauseNotes');
var depressionNotes = document.getElementById('depressionNotes');
var familyViolenceNotes = document.getElementById('familyViolenceNotes');

submitButton.onclick = () => {
    let checkup = {
        _id: uuidv4(),
        tbNotes: tbNotes.value,
        oralNotes: oralNotes.value,
        menopauseNotes: menopauseNotes.value,
        depressionNotes: depressionNotes.value,
        familyViolenceNotes: familyViolenceNotes.value,
        type: 'W20-59',
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