var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

myButton = document.getElementById('registerButton');
myButton.onclick = addPatient;

showButton = document.getElementById('registerShowButton');
showButton.onclick = viewPatients;

function viewPatients() {
    patientDb.allDocs({include_docs: true, descending: true}, function(err, result) {
        if (!err) {
            console.log(result);
        } else {
            console.log(err);
        }
    });
}

function addPatient() {
    first = document.getElementById('firstNameRegister').value;
    last = document.getElementById('surnameRegister').value;
    age = document.getElementById('ageRegister').value;
    sex = document.getElementById('sexRegister').value;
    weight = document.getElementById('weightRegister').value;
    height = document.getElementById('heightRegister').value;
    dob = document.getElementById('dobRegister').value;
    date = document.getElementById('dateRegister').value;
    community = document.getElementById('communityRegister').value;
    income = document.getElementById('incomeRegister').value;
    previousClinics = document.getElementById('previousClinicsRegister').value;
    CeSID = document.getElementById('CeSIDRegister').value;
    migrant = document.getElementById('migrantRegister').checked;
    spss = document.getElementById('spssRegister').checked;
    indigenous = document.getElementById('indigenousRegister').checed;
    disability = document.getElementById('disabilityRegister').checked;
    
    let obj = {
        _id: new Date().toISOString(),
        name: first + ' ' + last,
        age: age,
        sex: sex,
        weight: weight,
        height: height,
        dob: dob,
        date: date,
        community: community,
        income: income,
        previousClinics: previousClinics,
        CeSID: CeSID,
        migrant: migrant,
        spss: spss,
        indigenous: indigenous,
        disability: disability
    };
    patientDb.put(obj, function callback(err,result) {
        if (!err) {
            console.log('successfully posted a patient');
            console.log('response from PouchDB: ' + result);
        }
        else {
            console.log('error occurred');
            console.log(err);
        }
    });
}

function registerPatient(patient) {
    patient._id = new Date().toISOString();
  
    patientDb.put(patient, function callback(err, res) {
      if (!err) {
        console.log('Patient Registered!');
        console.log(res);
      }
      else {
        alert(err);
      }
    });
  }