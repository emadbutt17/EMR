const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let children9Button = document.getElementById('children9Button');
children9Button.onclick = addChildren9;

function addChildren9() {
    patientDb.get(id)
        .then(function(patient) {
            audioVisualAcuity = document.getElementById('audioVisualAcuity').value;
            physExam9 = document.getElementById('physExam9').value;
            disibilities = document.getElementById('disibilities').value;
            posture9 = document.getElementById('posture9').value;
            oral9 = document.getElementById('oral9').value;
            vaxSchedule9 = document.getElementById('vaxSchedule9').value;
            nutritionGiude = document.getElementById('nutritionGiude').value;
            activityAccidents = document.getElementById('activityAccidents').value;
            preventTB9 = document.getElementById('preventTB9').value;
            hygiene = document.getElementById('hygiene').value;
            violence = document.getElementById('violence').value;
            drugs = document.getElementById('drugs').value;
        
            let children9 = {
                _id: uuidv4(),
                type: 'evaluationsChildren9',
                audioVisualAcuity: audioVisualAcuity,
                physExam9: physExam9,
                disibilities: disibilities,
                posture9: posture9,
                oral9: oral9,
                vaxSchedule9: vaxSchedule9,
                nutritionGiude: nutritionGiude,
                activityAccidents: activityAccidents,
                preventTB9: preventTB9,
                hygiene: hygiene,
                violence: violence,
                drugs: drugs,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.evaluations) {
                patient.evaluations.push(children9);
            } else {
                patient.evaluations = [children9];
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