var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

pregnancyButton = document.getElementById('pregnancyButton');
pregnancyButton.onclick = addPregnancy;

function addPregnancy(patient){
    vision = document.getElementById('vision').value;
    bloodTop = document.getElementById('bloodTop').value;
    bloodBottom = document.getElementById('bloodBottom').value;
    bloodSugar = document.getElementById('bloodSugar').value;
    hemoglobin = document.getElementById('hemoglobin').value;
    insulin = document.getElementById('insulin').value;
    ifYes = document.getElementById('ifYes').value;
    
    let pregnancy = {
        type: 'pregnancy'
        vision: vision,
        bloodTop: bloodTop,
        bloodBottom: bloodBottom,
        bloodSugar: bloodSugar,
        hemoglobin: hemoglobin,
        insulin: insulin,
        ifYes: ifYes
    };
    patient.diagnoses.append(pregnancy);
    patientDb.put(patient);
}