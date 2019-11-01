const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

pregnancyButton = document.getElementById('pregnancyButton');
pregnancyButton.onclick = addPregnancy;

function addPregnancy(patient){
    weight = document.getElementById('Weight').value;
    syspressure = document.getElementById('SystolicPressure').value;
    diapressure = document.getElementById('DiastolicPressure').value;
    glucose = document.getElementById('Glucose').value;
    hemoglobin = document.getElementById('Hemoglobin').value;
    urtest = document.getElementById('UrineTest').value;
    
    
    let pregnancy = {
        _id: uuidv4();
        type: 'pregnancy'
        weight: weight,
        syspressure: syspressure,
        diapressure: diapressure,
        glucose: glucose,
        hemoglobin: hemoglobin,
        urtest: urtest,
    };
    patient.diagnoses.append(pregnancy);
    patientDb.put(patient);
}