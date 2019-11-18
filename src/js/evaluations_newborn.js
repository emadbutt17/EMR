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

            let alarmSignsNotes = document.getElementById('alarmSignsNotes').value;
            let birthDefectsNotes = document.getElementById('birthDefectsNotes').value;
            let physicalNotes = document.getElementById('physicalNotes').value;
            let laborConditionNotes = document.getElementById('laborConditionNotes').value;
            let umbilicalNotes = document.getElementById('umbilicalNotes').value;
            let neonatalNotes = document.getElementById('neonatalNotes').value;
            let vaccinesNotes = document.getElementById('vaccinesNotes').value;
            let vitaminsNotes = document.getElementById('vitaminsNotes').value;
            let otherNotes = document.getElementById('otherNotes').value;
            
            let child = {
                _id: uuidv4(),
                type: 'newborn',
                alarmSignsNotes: alarmSignsNotes,
                birthDefectsNotes: birthDefectsNotes,
                laborConditionNotes: laborConditionNotes,
                physicalNotes: physicalNotes,
                umbilicalNotes: umbilicalNotes,
                neonatalNotes: neonatalNotes,
                vaccinesNotes: vaccinesNotes,
                vitaminsNotes: vitaminsNotes,
                otherNotes: otherNotes,
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