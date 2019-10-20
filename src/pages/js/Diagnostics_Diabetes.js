var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

diabetesButton = document.getElementById('diabetesButton');
diabetesButton.onclick = addDiabetes;

function addDiabetes(patient){
    vision = document.getElementById('vision').value;
    bloodTop = document.getElementById('bloodTop').value;
    bloodBottom = document.getElementById('bloodBottom').value;
    bloodSugar = document.getElementById('bloodSugar').value;
    hemoglobin = document.getElementById('hemoglobin').value;
    insulin = document.getElementById('insulin').value;
    ifYes = document.getElementById('ifYes').value;
    
    let diabetes = {
        type: 'diabetes',
        vision: vision,
        bloodTop: bloodTop,
        bloodBottom: bloodBottom,
        bloodSugar: bloodSugar,
        hemoglobin: hemoglobin,
        insulin: insulin,
        ifYes: ifYes
    };
    patient.diagnoses.append(diabetes);
    patientDb.put(patient);
}