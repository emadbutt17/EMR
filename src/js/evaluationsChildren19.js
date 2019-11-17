const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let children9Button = document.getElementById('children19Button');
children19Button.onclick = addChildren19;

function addChildren19() {
    patientDb.get(id)
        .then(function(patient) {
            audioVisualAcuity19 = document.getElementById('audioVisualAcuity19').value;
            physExam19 = document.getElementById('physExam19').value;
            sexHealth = document.getElementById('sexHealth').value;
            contraceptives = document.getElementById('contraceptives').value;
            highRisk = document.getElementById('highRisk').value;
            vaxSchedule19 = document.getElementById('vaxSchedule19').value;
            nutritionGiude19 = document.getElementById('nutritionGiude19').value;
            activityAccidents19 = document.getElementById('activityAccidents19').value;
            preventTB19 = document.getElementById('preventTB19').value;
            aids = document.getElementById('aids').value;
            violence19 = document.getElementById('violence19').value;
            ondrugs = document.getElementById('ondrugs').value;
            cancer = document.getElementById('cancer').value;
            riskTB = document.getElementById('riskTB').value;
        
            let children19 = {
                _id: uuidv4(),
                type: 'evaluationsChildren19',
                audioVisualAcuity19: audioVisualAcuity19,
                physExam19: physExam19,
                sexHealth: sexHealth,
                contraceptives: contraceptives,
                highRisk: highRisk,
                vaxSchedule19: vaxSchedule19,
                nutritionGiude19: nutritionGiude19,
                activityAccidents19: activityAccidents19,
                preventTB19: preventTB19,
                aids: aids,
                violence19: violence19,
                ondrugs: ondrugs,
                cancer: cancer,
                riskTB: riskTB,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.evaluations) {
                patient.evaluations.push(children19);
            } else {
                patient.evaluations = [children19];
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