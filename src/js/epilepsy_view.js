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
            let episodenum = document.getElementById('episodenum');
            let seizurelen = document.getElementById('seizurelen');
            let unmovements = document.getElementById('unmovements');
            let episodeyear = document.getElementById('episodeyear');
            let episodered = document.getElementById('episodered');
            let notes = document.getElementById('notes');

            episodenum.value = diagnosis.episodenum ? diagnosis.episodenum : '';
            seizurelen.value = diagnosis.seizurelen ? diagnosis.seizurelen : '';
            unmovements.value = diagnosis.unmovements ? diagnosis.unmovements : '';
            episodeyear.value = diagnosis.episodeyear ? diagnosis.episodeyear : '';
            episodered.value = diagnosis.episodered ? diagnosis.episodered : '';
            notes.value = diagnosis.notes ? diagnosis.notes : '';
        }
    })
    .catch(function (err) {
        console.log(err);
    });