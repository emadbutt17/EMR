const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

let newbornButton = document.getElementById('newbornButton');
newbornButton.onclick = addNewborn;

function addNewborn() {
    patientDb.get(id)
        .then(function(patient) {
            alarmSignsYes = document.getElementById('alarmSignsYes').value;
            physExam = document.getElementById('physExam').value;
            alarmSignsNo = document.getElementById('alarmSignsNo').value;
            cancerSignsYes = document.getElementById('cancerSignsYes').value;
            cancerSignsNo = document.getElementById('cancerSignsNo').value;
            laborConitions = document.getElementById('laborConitions').value;
            cordExam = document.getElementById('cordExam').value;
            neonatalScreen = document.getElementById('neonatalScreen').value;
            vitamins = document.getElementById('vitamins').value;
            vaccines = document.getElementById('vaccines').value;
            breastfeed = document.getElementById('breastfeed').value;
            other = document.getElementById('other').value;
        
            let newborn = {
                _id: uuidv4(),
                type: 'evaluationsNewborn',
                alarmSignsYes: alarmSignsYes,
                physExam: physExam,
                alarmSignsNo: alarmSignsNo,
                cancerSignsYes: cancerSignsYes,
                cancerSignsNo: cancerSignsNo,
                laborConitions: laborConitions,
                cordExam: cordExam,
                activityAccidents: activityAccidents,
                vitamins: vitamins,
                vaccines: vaccines,
                breastfeed: breastfeed,
                other: other,
                date: new Date().toLocaleDateString('en-GB')
            };

            if (patient.evaluations) {
                patient.evaluations.push(newborn);
            } else {
                patient.evaluations = [newborn];
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