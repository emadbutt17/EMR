const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let children5Button = document.getElementById('children5Button');
children5Button.onclick = addChildren5;

function addChildren5() {
    patientDb.get(id)
        .then(function(patient) {
            physicalNotes = document.getElementById('physicalNotes').value;
            auditoryDeficiencyNotes = document.getElementById('auditoryDeficiencyNotes').value;
            visualDeficiencyNotes = document.getElementById('visualDeficiencyNotes').value;
            disabilityNotes = document.getElementById('disabilityNotes').value;
            postureNotes = document.getElementById('postureNotes').value;
            tbNotes = document.getElementById('tbNotes').value;
            nutritionNotes = document.getElementById('nutritionNotes').value;
            domesticViolenceNotes = document.getElementById('domesticViolenceNotes').value;
            
            let children5 = {
                _id: uuidv4(),
                type: 'child5-9',
                physicalNotes: physicalNotes,
                auditoryDeficiencyNotes: auditoryDeficiencyNotes,
                visualDeficiencyNotes: visualDeficiencyNotes,
                disabilityNotes: disabilityNotes,
                postureNotes: postureNotes,
                tbNotes: tbNotes,
                nutritionNotes: nutritionNotes,
                domesticViolenceNotes: domesticViolenceNotes,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.evaluations) {
                patient.evalustions.push(children5);
            } else {
                patient.evaluations = [children5];
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