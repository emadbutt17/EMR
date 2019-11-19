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
            document.getElementById('inhalerUsage').value = diagnosis.inhaler ? diagnosis.inhaler : '';
            document.getElementById('activityLimit').value = diagnosis.activityLimit ? diagnosis.activityLimit : '';
            document.getElementById('rescueMeds').value = diagnosis.rescueMeds ? diagnosis.rescueMeds : '';
            document.getElementById('smoke').value = diagnosis.smoke ? diagnosis.smoke : '';
            document.getElementById('smokeFrequency').value = diagnosis.smokeFrequency ? diagnosis.smokeFrequency : '';
            document.getElementById('smokeAmount').value = diagnosis.smokeAmount ? diagnosis.smokeAmount : '';
            document.getElementById('notes').value = diagnosis.notes ? diagnosis.notes : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });