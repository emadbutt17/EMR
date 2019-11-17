const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let epilepsyButton = document.getElementById('epilepsyButton');
epilepsyButton.onclick = addEpilepsy;

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

function addEpilepsy() {
    patientDb.get(id)
        .then((patient) => {
            episodenum = document.getElementById('episodenum').value;
            seizurelen = document.getElementById('seizurelen').value;
            unmovements = document.getElementById('unmovements').value;
            episodeyear = document.getElementById('episodeyear').value;
            episodered = document.getElementById('episodered').value;
            
            let epilepsy = {
                _id: uuidv4(),
                type: 'Epilepsia',
                episodenum: episodenum,
                seizurelen: seizurelen,
                unmovements: unmovements,
                episodeyear: episodeyear,
                episodered: episodered,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.diagnoses) {
                patient.diagnoses.push(epilepsy);
            } else {
                patient.diagnoses = [epilepsy];
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

