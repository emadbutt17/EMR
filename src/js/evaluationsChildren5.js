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
            familyEnvironment = document.getElementById('familyEnvironment').value;
            physExam5 = document.getElementById('physExam5').value;
            motorDevelop = document.getElementById('motorDevelop').value;
            posture = document.getElementById('posture').value;
            oral = document.getElementById('oral').value;
            vaxSchedule = document.getElementById('vaxSchedule').value;
            vitamins = document.getElementById('vitamins').value;
            parasites = document.getElementById('parasites').value;
            preventTB = document.getElementById('preventTB').value;
            train = document.getElementById('train').value;
            misc = document.getElementById('misc').value;
            
            let children5 = {
                _id: uuidv4(),
                type: 'evaluationsChildren5',
                familyEnvironment: familyEnvironment,
                physExam5: physExam5,
                motorDevelop: motorDevelop,
                posture: posture,
                oral: oral,
                vaxSchedule: vaxSchedule,
                vitamins: vitamins,
                parasites: parasites,
                preventTB: preventTB,
                train: train,
                misc: misc,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.evaluations) {
                patient.evaluations.push(children5);
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