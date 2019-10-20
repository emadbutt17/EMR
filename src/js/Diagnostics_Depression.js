const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

depressionButton = document.getElementById('depressionButton');
depressionButton.onclick = addDepression;

function addDepression(patient) {
    PHQ-9 = document.getElementById('PHQ-9').value;
    currentMedication = document.getElementById('currentMedication').value;
    sideEffects = document.getElementById('sideEffects').value;
    symptoms = document.getElementById('symptoms').value;
    
    let depression = {
        _id: uuidv4();
        type: 'depression'
        PHQ_9: PHQ-9,
        currentMedication: currentMedication,
        sideEffects: sideEffects,
        symptoms: symptoms,
        
    }:
    patient.diagnosis.append(depression);
    patientDb.put(patient);
}