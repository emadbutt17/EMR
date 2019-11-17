var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');
const uuidv4 = require('uuid/v4');

let queryParams = document.location.search;
const firstEquals = queryParams.indexOf("=");
const diagnosisId = queryParams.substring(firstEquals + 1, queryParams.indexOf('&'));
const patientId = queryParams.substring(queryParams.indexOf("=", firstEquals + 1) + 1);

patientDb.get(patientId)
    .then(function (doc) {
        var diagnosis;
        console.log(doc.diagnoses);

        for (let i = 0; i < doc.diagnoses.length; i++) {
            if (doc.diagnoses[i]._id == diagnosisId) {
                diagnosis = doc.diagnoses[i];
            }
        }

        if (diagnosis) {
            document.getElementById('PHQ-9').value = diagnosis.PHQ_9 ? diagnosis.PHQ_9 : '';
            document.getElementById('currentMedication').value = diagnosis.currentMedication ? diagnosis.currentMedication : '';
            document.getElementById('sideEffects').value = diagnosis.sideEffects ? diagnosis.sideEffects : '';
            document.getElementById('symptoms').value = diagnosis.symptoms ? diagnosis.symptoms : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });