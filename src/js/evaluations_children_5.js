const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let submitButton = document.getElementById('submit-button');
submitButton.onclick = addCheckup;

function addCheckup() {
    patientDb.get(id)
        .then(function(patient) {
            physicalNotes = document.getElementById('physicalNotes').value;
            familyEnvironmentNotes = document.getElementById('familyEnvironmentNotes').value;
            psychomotorNotes = document.getElementById('psychomotorNotes').value;
            postureNotes = document.getElementById('postureNotes').value;
            tbNotes = document.getElementById('tbNotes').value;
            parasiteNotes = document.getElementById('parasiteNotes').value;
            
            let child = {
                _id: uuidv4(),
                type: 'child1-4',
                familyEnvironmentNotes: familyEnvironmentNotes,
                physicalNotes: physicalNotes,
                psychomotorNotes: psychomotorNotes,
                postureNotes: postureNotes,
                tbNotes: tbNotes,
                parasiteNotes: parasiteNotes,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.checkups) {
                patient.checkups.push(child);
            } else {
                patient.checkups = [child];
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