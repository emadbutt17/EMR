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
    id = document.getElementById('CeSIDRegister').value;
    let obj = {
        _id: id,
        name: first + ' ' + last,
        age: age
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