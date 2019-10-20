var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

hypertensionButton = document.getElementById('hypertensionButton');
hypertensionButton.onclick = addHypertension;

function addHypertension(patient) {
    syspressure = document.getElementById('Systolic_Pressure').value;
    diapressure = document.getElementById('Diastolic_Pressure').value;
    smokingalcohol = document.getElementById('Smoking/Alcohol').value;
    height = document.getElementById('Height').value;
    weight = document.getElementById('Weight').value;
    bmi = document.getElementById('BMI').value;
    
    let hypertension = {
        type: 'hypertension'
        syspressure: syspressure,
        diapressure: diapressure,
        smokingalcohol: smokingalcohol,
        height: height,
        weight: weight,
        bmi: bmi
    }:
    patient.diagnosis.append(hypertension);
    patientDb.put(patient);
}