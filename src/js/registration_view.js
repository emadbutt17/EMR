var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

const queryParams = window.location.search;
const userId = queryParams.substring(queryParams.indexOf('=') + 1);

patientDb.get(userId)
.then((patient) => {
    const firstName = patient.name.substring(0, patient.name.indexOf(' '));
    const surname = patient.name.substring(patient.name.indexOf(' ') + 1);

    document.getElementById('firstNameRegister').value = firstName;
    document.getElementById('surnameRegister').value = surname;
    document.getElementById('dobRegister').valueAsDate = new Date(patient.dob);
    document.getElementById('sexRegister').value = patient.sex;
    document.getElementById('weightRegister').value = patient.weight;
    document.getElementById('heightRegister').value = patient.height;
    document.getElementById('dateRegister').valueAsDate = new Date(patient.date);
    document.getElementById('communityRegister').value = patient.community;
    document.getElementById('incomeRegister').value = patient.income;
    document.getElementById('previousClinicsRegister').value = patient.previousClinics;
    document.getElementById('CeSIDRegister').value = patient._id;
    document.getElementById('migrantRegister').checked = patient.migrant;
    document.getElementById('spssRegister').checked = patient.spss;
    document.getElementById('indigenousRegister').checked = patient.indigenous;
    document.getElementById('disabilityRegister').checked = patient.disability;
});

let updatePatient = () => {

    const patient = {
        _id: document.getElementById('CeSIDRegister').value,
        name: document.getElementById('firstNameRegister').value + ' ' + document.getElementById('surnameRegister').value,
        document.getElementById('dobRegister').valueAsDate,
        document.getElementById('sexRegister').value,
        document.getElementById('weightRegister').value,
        document.getElementById('heightRegister').value,
        document.getElementById('dateRegister').valueAsDate,
        document.getElementById('communityRegister').value,
        document.getElementById('incomeRegister').value,
        document.getElementById('previousClinicsRegister').value,
        document.getElementById('migrantRegister').checked,
        document.getElementById('spssRegister').checked,
        document.getElementById('indigenousRegister').checked,
        document.getElementById('disabilityRegister').checked
    };
};