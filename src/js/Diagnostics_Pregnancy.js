const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let pregnancyButton = document.getElementById('pregnancyButton');
pregnancyButton.onclick = addPregnancy;

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

function addPregnancy(){
    patientDb.get(id)
        .then((patient) => {
            let weeks = document.getElementById('weeks').value;
            let weight = document.getElementById('weight').value;
            let syspressure = document.getElementById('syspressure').value;
            let diapressure = document.getElementById('diapressure').value;
            let glucose = document.getElementById('glucose').value;
            let hemoglobin = document.getElementById('hemoglobin').value;
            let urtest = document.getElementById('urtest').value;
            let abdomenMeasurement = document.getElementById('abdomenMeasurement').value;
            let ultrasound = document.getElementById('ultrasound').value;
            let notes = document.getElementById('notes').value;
            
            let pregnancy = {
                _id: uuidv4(),
                weeks: weeks,
                type: 'pregnancy',
                weight: weight,
                syspressure: syspressure,
                diapressure: diapressure,
                glucose: glucose,
                hemoglobin: hemoglobin,
                urtest: urtest,
                abdomenMeasurement: abdomenMeasurement,
                ultrasound: ultrasound,
                notes: notes,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.diagnoses) {
                patient.diagnoses.push(pregnancy);
            } else {
                patient.daignoses = [pregnancy];
            }

            console.log('right before put'); 
            console.log(JSON.parse(JSON.stringify(patient)));
            patientDb.put(patient)
                .then((res) =>{ 
                    document.location.href = './patient_page.html?id=' + id;
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    
}