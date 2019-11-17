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
            diet = document.getElementById('diet').value;
            vision = document.getElementById('vision').value;
            bloodTop = document.getElementById('bloodTop').value;
            bloodBottom = document.getElementById('bloodBottom').value;
            bloodSugar = document.getElementById('bloodSugar').value;
            hemoglobin = document.getElementById('hemoglobin').value;
            insulin = document.getElementById('insulin').value;
            ifYes = document.getElementById('ifYes').value;
            
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