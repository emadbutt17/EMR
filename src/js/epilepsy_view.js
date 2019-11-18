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
            episodenum = document.getElementById('episodenum');
            seizurelen = document.getElementById('seizurelen');
            unmovements = document.getElementById('unmovements');
            episodeyear = document.getElementById('episodeyear');
            episodered = document.getElementById('episodered');

            episodenum.value = diagnosis.episodenum ? diagnosis.episodenum : '';
            seizurelen.value = diagnosis.seizurelen ? diagnosis.seizurelen : '';
            unmovements.value = diagnosis.unmovements ? diagnosis.unmovements : '';
            episodeyear.value = diagnosis.episodeyear ? diagnosis.episodeyear : '';
            episodered.value = diagnosis.episodered ? diagnosis.episodered : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });