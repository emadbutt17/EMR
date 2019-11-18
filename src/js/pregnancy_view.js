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
            weeks = document.getElementById('weeks');
            weight = document.getElementById('weight');
            syspressure = document.getElementById('syspressure');
            diapressure = document.getElementById('diapressure');
            glucose = document.getElementById('glucose');
            hemoglobin = document.getElementById('hemoglobin');
            urtest = document.getElementById('urtest');
            abdomenMeasurement = document.getElementById('abdomenMeasurement');
            ultrasound = document.getElementById('ultrasound');

            weeks.value = diagnosis.weeks ? diagnosis.weeks : '';
            weight.value = diagnosis.weight ? diagnosis.weight : '';
            syspressure.value = diagnosis.syspressure ? diagnosis.syspressure : '';
            diapressure.value = diagnosis.diapressure ? diagnosis.diapressure : '';
            glucose.value = diagnosis.glucose ? diagnosis.glucose : '';
            hemoglobin.value = diagnosis.hemoglobin ? diagnosis.hemoglobin : '';
            urtest.value = diagnosis.urtest ? diagnosis.urtest : '';
            abdomenMeasurement.value = diagnosis.abdomenMeasurement ? diagnosis.abdomenMeasurement : '';
            ultrasound.value = diagnosis.ultrasound ? diagnosis.ultrasound : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });