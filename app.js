var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

function fn1() {
    console.log('fn1()');
}

myButton = document.getElementById('registerButton');
myButton.onclick = addPatient;

function addPatient() {
    first = document.getElementById('firstNameRegister').innerText;
    last = document.getElementById('surnameRegister').innerText;
    age = document.getElementById('ageRegister').innerText;
    let obj = {
        _id: new Date().toISOString(),
        name: first + ' ' + last,
        age: age
    };
    patientDb.put(obj, function callback(err,result) {
        if (!err) {
            console.log('successfully posted a patient');
        }
        else {
            console.log('error occurred');
            console.log(result);
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