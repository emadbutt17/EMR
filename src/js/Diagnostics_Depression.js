const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let depressionButton = document.getElementById('depressionButton');
depressionButton.onclick = addDepression;

function addDepression() {
    patientDb.get(id)
        .then(function(patient) {
            PHQ_9 = document.getElementById('PHQ-9').value;
            currentMedication = document.getElementById('currentMedication').value;
            sideEffects = document.getElementById('sideEffects').value;
            symptoms = document.getElementById('symptoms').value;
            notes = document.getElementById('notes').value;
            
            let depression = {
                _id: uuidv4(),
                type: 'Depression',
                PHQ_9: PHQ_9,
                currentMedication: currentMedication,
                sideEffects: sideEffects,
                symptoms: symptoms,
                notes: notes,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.diagnoses) {
                patient.diagnoses.push(depression);
            } else {
                patient.diagnoses = [depression];
            }
            patientDb.put(patient)
                .then((res) => {
                    document.location.href = './patient_page.html?id=' + id;
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch(function(e) {
            console.log(e);
        });
    
}