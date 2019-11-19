const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let asthmaButton = document.getElementById('asthmaButton');
asthmaButton.onclick = addAsthma;

function addAsthma(){
    patientDb.get(id)
    .then((patient) => {
        inhaler = document.getElementById('inhalerUsage').value;
        activityLimit = document.getElementById('activityLimit').value;
        rescueMeds = document.getElementById('rescueMeds').value;
        smoke = document.getElementById('smoke').value;
        smokeFrequency = document.getElementById('smokeFrequency').value;
        smokeAmount = document.getElementById('smokeAmount').value;
        notes = document.getElementById('notes').value;
        
        let asthma = {
            _id: uuidv4(),
            type: 'asthma',
            inhaler: inhaler,
            activityLimit: activityLimit,
            rescueMeds: rescueMeds,
            smoke: smoke,
            smokeFrequency: smokeFrequency,
            smokeAmount: smokeAmount,
            notes: notes,
            date: new Date().toLocaleDateString('en-GB')
        };

        if (patient.diagnoses) {
            patient.diagnoses.push(asthma);
        } else {
            patient.diagnoses = [asthma];
        }

        patientDb.put(patient)
            .then((res) => {
                document.location.href = './patient_page.html?id=' + id;
            })
            .catch((err) => {
                console.log(err);
                // TODO: maybe need to remove asthma from local diagnoses so it isn't added twice
            })
    });
}