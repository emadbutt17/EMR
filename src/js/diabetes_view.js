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

        for (let i = 0; i < doc.diagnoses.length; i++) {
            if (doc.diagnoses[i]._id == diagnosisId) {
                diagnosis = doc.diagnoses[i];
            }
        }

        if (diagnosis) {
            document.getElementById('diet').value = diagnosis.diet ? diagnosis.diet : '';
            document.getElementById('vision').value = diagnosis.vision ? diagnosis.vision : '';
            document.getElementById('bloodTop').value = diagnosis.bloodTop ? diagnosis.bloodTop : '';
            document.getElementById('bloodBottom').value = diagnosis.bloodBottom ? diagnosis.bloodBottom : '';
            document.getElementById('bloodSugar').value = diagnosis.bloodSugar ? diagnosis.bloodSugar : '';
            document.getElementById('hemoglobin').value = diagnosis.hemoglobin ? diagnosis.hemoglobin : '';
            document.getElementById('insulin').value = diagnosis.insulin ? diagnosis.insulin : '';
            document.getElementById('ifYes').value = diagnosis.ifYes ? diagnosis.ifYes : '';
            document.getElementById('notes').value = diagnosis.notes ? diagnosis.notes : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });