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
            let weeks = document.getElementById('weeks');
            let weight = document.getElementById('weight');
            let syspressure = document.getElementById('syspressure');
            let diapressure = document.getElementById('diapressure');
            let glucose = document.getElementById('glucose');
            let hemoglobin = document.getElementById('hemoglobin');
            let urtest = document.getElementById('urtest');
            let abdomenMeasurement = document.getElementById('abdomenMeasurement');
            let ultrasound = document.getElementById('ultrasound');
            let notes = document.getElementById('notes');

            weeks.value = diagnosis.weeks ? diagnosis.weeks : '';
            weight.value = diagnosis.weight ? diagnosis.weight : '';
            syspressure.value = diagnosis.syspressure ? diagnosis.syspressure : '';
            diapressure.value = diagnosis.diapressure ? diagnosis.diapressure : '';
            glucose.value = diagnosis.glucose ? diagnosis.glucose : '';
            hemoglobin.value = diagnosis.hemoglobin ? diagnosis.hemoglobin : '';
            urtest.value = diagnosis.urtest ? diagnosis.urtest : '';
            abdomenMeasurement.value = diagnosis.abdomenMeasurement ? diagnosis.abdomenMeasurement : '';
            ultrasound.value = diagnosis.ultrasound ? diagnosis.ultrasound : '';
            notes.value = diagnosis.notes ? diagnosis.notes : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });