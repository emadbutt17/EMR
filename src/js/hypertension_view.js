var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const firstEquals = queryParams.indexOf("=");
const diagnosisId = queryParams.substring(firstEquals + 1, queryParams.indexOf('&'));
const patientId = queryParams.substring(queryParams.indexOf("=", firstEquals + 1) + 1);

patientDb.get(patientId)
    .then(function (doc) {

        var diagnosis;

        for (let i = 0; i < doc.diagnoses.length; i++) {
            if (doc.diagnoses[i]._id == diagnosisId) {
                diagnosis = doc.diagnoses[i];
            }
        }

        if (diagnosis) {
            let syspressure = document.getElementById('syspressure');
            let diapressure = document.getElementById('diapressure');
            let smokingalcohol = document.getElementById('smokingalcohol');
            let height = document.getElementById('height');
            let weight = document.getElementById('weight');
            let bmi = document.getElementById('bmi');
            let notes = document.getElementById('notes');

            syspressure.value = diagnosis.syspressure ? diagnosis.syspressure : '';
            diapressure.value = diagnosis.diapressure ? diagnosis.diapressure : '';
            smokingalcohol.value = diagnosis.smokingalcohol ? diagnosis.smokingalcohol : '';
            height.value = diagnosis.height ? diagnosis.height : '';
            weight.value = diagnosis.weight ? diagnosis.weight : '';
            bmi.value = diagnosis.bmi ? diagnosis.bmi : '';
            notes.value = diagnosis.notes ? diagnosis.notes : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });