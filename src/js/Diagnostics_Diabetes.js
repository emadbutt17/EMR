const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let diabetesButton = document.getElementById('diabetesButton');
diabetesButton.onclick = addDiabetes;

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

function addDiabetes(){
    patientDb.get(id)
        .then((patient) => {
            let diet = document.getElementById('diet').value;
            let vision = document.getElementById('vision').value;
            let bloodTop = document.getElementById('bloodTop').value;
            let bloodBottom = document.getElementById('bloodBottom').value;
            let bloodSugar = document.getElementById('bloodSugar').value;
            let hemoglobin = document.getElementById('hemoglobin').value;
            let insulin = document.getElementById('insulin').value;
            let ifYes = document.getElementById('ifYes').value;
            let notes = document.getElementById('notes').value;
            
            let diabetes = {
                _id: uuidv4(),
                type: 'diabetes',
                diet: diet,
                vision: vision,
                bloodTop: bloodTop,
                bloodBottom: bloodBottom,
                bloodSugar: bloodSugar,
                hemoglobin: hemoglobin,
                insulin: insulin,
                ifYes: ifYes,
                notes: notes,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.diagnoses) {
                patient.diagnoses.push(diabetes);
            } else {
                patient.diagnoses = [diabetes];
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