const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

epilepsyButton = document.getElementById('epilepsyButton');
epilepsyButton.onclick = addEpilepsy();

function addEpilepsy(patient) {
    episodenum = document.getElementById('Episode_Number').value;
    seizurelen = document.getElementById('Seizure_Length').value;
    unmovements = document.getElementById('Uncontrollable_Movements').value;
    episodeyear = document.getElementById('Episodes_Year').value;
    episodered = document.getElementById('Episode_Reduction').value;
    
    let epilepsy = {
        _id: uuidv4(),
        episodenum: episodenum,
        seizurelen: seizurelen,
        unmovements: unmovements,
        episodeyear: episodeyear,
        episodered: episodered
        
    }:
    patient.diagnosis.append(epilepsy);
    patientDb.put(patient);
}

