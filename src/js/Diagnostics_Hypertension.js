const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let hypertensionButton = document.getElementById('hypertensionButton');
hypertensionButton.onclick = addHypertension;

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

function addHypertension() {
    patientDb.get(id)
        .then((patient) => {
            let syspressure = document.getElementById('syspressure').value;
            let diapressure = document.getElementById('diapressure').value;
            let smokingalcohol = document.getElementById('smokingalcohol').value;
            let height = document.getElementById('height').value;
            let weight = document.getElementById('weight').value;
            let bmi = document.getElementById('bmi').value;
            let notes = document.getElementById('notes').value;
            
            let hypertension = {
                _id: uuidv4(),
                type: 'hypertension',
                syspressure: syspressure,
                diapressure: diapressure,
                smokingalcohol: smokingalcohol,
                height: height,
                weight: weight,
                bmi: bmi,
                notes: notes,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.diagnoses) {
                patient.diagnoses.push(hypertension);
            } else {
                patient.diagnoses = [hypertension];
            }

            patientDb.put(patient)
                .then((res) => {
                    document.location.href = './patient_page.html?id=' + id;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
}