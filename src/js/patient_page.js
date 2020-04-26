var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

// On Load
let header = document.getElementById('page-header');
let asthmaButton = document.getElementById('asthma');
let depressionButton = document.getElementById('depression');
let diabetesButton = document.getElementById('diabetes');
let pregnancyButton = document.getElementById('pregnancy');
let epilepsyButton = document.getElementById('epilepsy');
let hypertensionButton = document.getElementById('hypertension');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

asthmaButton.onclick = () => {
    document.location.href = './diagnostics_asthma.html?id=' + id;
}
depressionButton.onclick = () => {
    document.location.href = './diagnostics_depression.html?id=' + id;
}
diabetesButton.onclick = () => {
    document.location.href = './Diagnostics_Diabetes.html?id=' + id;
}
pregnancyButton.onclick = () => {
    document.location.href = './Diagnostics_Pregnancy.html?id=' + id;
}
epilepsyButton.onclick = () => {
    document.location.href = './Diagnostics_Epilepsy.html?id=' + id;
}
hypertensionButton.onclick = () => {
    document.location.href = './Diagnostics_Hypertension.html?id=' + id;
}

patientDb.get(id)
.then(function(doc) {
    header.innerText = doc.name;
    document.getElementById('patient-sex').innerText = 'Sexo: ' + doc.sex;
    document.getElementById('patient-weight').innerText = 'Peso: ' + doc.weight + ' kg';
    document.getElementById('patient-height').innerText = 'Altura: ' + doc.height + ' cm';
    document.getElementById('patient-birthdate').innerText = 'Fecha de Nacimiento: ' + doc.dob;
    document.getElementById('patient-community').innerText = 'Communidad: ' + doc.community;
    checkboxStr = '';
    if (doc.migrant) {
        checkboxStr += 'Migrante, ';
    }
    if (doc.spss) {
        checkboxStr += 'SPSS, ';
    }
    if (doc.indigenous) {
        checkboxStr += 'Indígena, ';
    }
    if (doc.disability) {
        checkboxStr += 'Discapacidad';
    }
    if (checkboxStr.substr(-2) === ", ") {
        checkboxStr = checkboxStr.substr(0, checkboxStr.length - 2);
    }
    document.getElementById('patient-checkboxes').innerText = checkboxStr
})
.catch(function(err) {
    console.log(err);
});

// Button Actions
let submitButton = document.getElementById('generalNotes-button');
submitButton.onclick = addNotes;

function addNotes() {
    patientDb.get(id)
        .then(function(patient) {
            generalNotes = document.getElementById('generalNotes').value;
            
            let child = {
                _id: uuidv4(),
                type: 'child1-4',
                generalNotes: generalNotes,
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




let patientHistoryButton = document.getElementById('patient-history-button');
patientHistoryButton.addEventListener("click", function() {
    document.location.href = "./patient_diagnoses_flex.html?id=" + id;
});

let patientPrescriptionsButton = document.getElementById('patient-prescriptions-button');
patientPrescriptionsButton.addEventListener('click', function() {
    document.location.href = './patient_prescriptions.html?id=' + id;
});

let patientCheckupsButton = document.getElementById('new-checkup-button');
patientCheckupsButton.addEventListener('click', function() {

    patientDb.get(id)
        .then(function(patient) {
            let dob = patient.dob;
            let sex = patient.sex;
            let years = diff_years(new Date(), new Date(dob));
            if (years < 1) {
                document.location.href = './Evaluations_Newborn.html?id=' + id;
            } else if (years > 0 && years < 5) {
                document.location.href = './Evaluations_Children_5.html?id=' + id;
            } else if (years > 4 && years < 10) {
                document.location.href = './Evaluations_Children_9.html?id=' + id;
            } else if (years > 9 && years < 20) {
                document.location.href = './Evaluations_Children_19.html?id=' + id;
            } else if (years > 19 && years < 60) {
                if (sex === 'M' || sex === 'm' || sex === 'Male' || sex === 'male') {
                    document.location.href = './Evaluations_Men_20-59.html?id=' + id;
                } else {
                    document.location.href = './Evaluations_Women_20-59.html?id=' + id;
                }
            } else if (years > 59) {
                if (sex === 'M' || sex === 'm' || sex === 'Male' || sex === 'male') {
                    document.location.href = './Evaluations_Men_60.html?id=' + id;
                } else {
                    document.location.href = './Evaluations_Women_60.html?id=' + id;
                }
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});

let diff_years = (dt2, dt1) => {

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.floor(diff/365.25));
   
}

function addNotes(){
    patientDb.get(id)
    .then((patient) => {
        notes = document.getElementById('notes').value;
        
        let patientNotes = {
            _id: uuidv4(),
            notes: notes,
            date: new Date().toLocaleDateString('en-GB')
        };

        if (patient.diagnoses) {
            patient.diagnoses.push(patientNotes);
        } else {
            patient.diagnoses = [patientNotes];
        }

        patientDb.put(patient)
            .then((res) => {
                document.location.href = './patient_page.html?id=' + id;
            })
            .catch((err) => {
                console.log(err);
                // TODO: maybe need to remove asthma from local diagnoses so it isn't added twice
            })
    });
}