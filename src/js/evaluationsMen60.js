const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let Men60Button = document.getElementById('Men60Button');
Men60Button.onclick = addMen60;

function addMen60() {
    patientDb.get(id)
        .then(function(patient) {
            healthbook = document.getElementById('healthbook').value;
            identifyDeficiencies = document.getElementById('identifyDeficiencies').value;
            prostateCancer = document.getElementById('prostateCancer').value;
            diseaseCheck = document.getElementById('diseaseCheck').value;
            vaccines = document.getElementById('vaccines').value;
            verifyTB = document.getElementById('verifyTB').value;
            drugRisk = document.getElementById('drugRisk').value;
            warnSigns = document.getElementById('warnSigns').value;
            physActivity = document.getElementById('physActivity').value;
            familyViolence = document.getElementById('familyViolence').value;
            
            let Men60 = {
                _id: uuidv4(),
                type: 'evaluationsMen60',
                healthbook: healthbook,
                identifyDeficiencies: identifyDeficiencies,
                prostateCancer: prostateCancer,
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
                patient.evaluations.push(Men60);
            } else {
                patient.evaluations = [Men60];
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