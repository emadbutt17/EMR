var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

asthmaButton = document.getElementById('asthmaButton');
asthmaButton.onclick = addAsthma;

function addAsthma(patient){
    inhaler = document.getElementById('inhalerUsage').value;
    activityLimit = document.getElementById('activityLimit').value;
    rescueMeds = document.getElementById('rescueMeds').value;
    smoke = document.getElementById('rescueMeds').value;
    smokeFrequency = document.getElementById('smokeFrequency').value;
    smokeAmount = document.getElementById('smokeAmount').value;
    
    let asthma = {
        type: 'asthma',
        inhaler: inhaler,
        activityLimit: activityLimit,
        rescueMeds: rescueMeds,
        smoke: smoke,
        smokeFrequency: smokeFrequency,
        smokeAmount: smokeAmount
    };
    patient.diagnoses.append(asthma);
    patientDb.put(patient);
}