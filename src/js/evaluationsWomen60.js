const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let Women60Button = document.getElementById('Women60Button');
Women60Button.onclick = addWomen60;

function addWomen60() {
    patientDb.get(id)
        .then(function(patient) {
            healthbook = document.getElementById('healthbook').value;
            identifyDeficiencies = document.getElementById('identifyDeficiencies').value;
            cervCancer = document.getElementById('cervCancer').value;
            breastCancer = document.getElementById('breastCancer').value;
            diseaseCheck = document.getElementById('diseaseCheck').value;
            vaccines = document.getElementById('vaccines').value;
            verifyTB = document.getElementById('verifyTB').value;
            drugRisk = document.getElementById('drugRisk').value;
            warnSigns = document.getElementById('warnSigns').value;
            physActivity = document.getElementById('physActivity').value;
            familyViolence = document.getElementById('familyViolence').value;
            
            let Women60 = {
                _id: uuidv4(),
                type: 'evaluationsWomen60',
                healthbook: healthbook,
                identifyDeficiencies: identifyDeficiencies,
                cervCancer: cervCancer,
                breastCancer: breastCancer,
                diseaseCheck: diseaseCheck,
                vaccines: vaccines,
                verifyTB: verifyTB,
                drugRisk: drugRisk,
                warnSigns: warnSigns,
                physActivity: physActivity,
                familyViolence: familyViolence,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.evaluations) {
                patient.evaluations.push(Women60);
            } else {
                patient.evaluations = [Women60];
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