const uuidv4 = require('uuid/v4');
var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

myButton = document.getElementById('registerButton');
myButton.onclick = addPatient;

function addPatient() {
    first = document.getElementById('firstNameRegister').value;
    last = document.getElementById('surnameRegister').value;
    sex = document.getElementById('sexRegister').value;
    weight = document.getElementById('weightRegister').value;
    height = document.getElementById('heightRegister').value;
    dob = document.getElementById('dobRegister').value;
    date = document.getElementById('dateRegister').value;
    community = document.getElementById('communityRegister').value;
    income = document.getElementById('incomeRegister').value;
    previousClinics = document.getElementById('previousClinicsRegister').value;
    migrant = document.getElementById('migrantRegister').checked;
    spss = document.getElementById('spssRegister').checked;
    indigenous = document.getElementById('indigenousRegister').checked;
    disability = document.getElementById('disabilityRegister').checked;
    
    let id = uuidv4();
    let patient = {
        _id: id,
        name: first + ' ' + last,
        sex: sex,
        weight: weight,
        height: height,
        dob: dob,
        date: date,
        community: community,
        income: income,
        previousClinics: previousClinics,
        migrant: migrant,
        spss: spss,
        indigenous: indigenous,
        disability: disability
    };
    patientDb.put(patient)
        .then((res) => {
            document.location.href="./patient_page.html?id=" + id;
        })
        .catch((err) => {
            console.log(err);
        });
}