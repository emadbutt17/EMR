var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');
var submitButton = document.getElementById('submit-button');
const queryParams = document.location.search;
const patientId = queryParams.substring(queryParams.indexOf("=") + 1);

patientDb.get(patientId)
.then(patient => {
    prescriptions = patient.prescriptions;
    if (prescriptions) {
        for (let i = 0; i < prescriptions.length; i++) {
            addRow(prescriptions[i]);
        }
    }
})
.catch(err => {
    console.log(err);
});

var addRow = (prescription) => {
    let tableBody = document.getElementById('search-table-body');
    let row = document.createElement('tr');

    let dateCell = document.createElement('td');
    let drugCell = document.createElement('td');
    let doseCell = document.createElement('td');
    let durationCell = document.createElement('td');
    let instructionsCell = document.createElement('td');

    dateCell.innerText = prescription._id;
    drugCell.innerText = prescription.drug;
    doseCell.innerText = prescription.dose;
    durationCell.innerText = prescription.duration;
    instructionsCell.innerText = prescription.instructions;

    row.appendChild(dateCell);
    row.appendChild(drugCell);
    row.appendChild(doseCell);
    row.appendChild(durationCell);
    row.appendChild(instructionsCell);

    tableBody.insertBefore(row, tableBody.firstChild);
};

var addPrescription = () => {
    
    let drug = document.getElementById('drugPrescription').value;
    let dose = document.getElementById('dosePrescription').value;
    let duration = document.getElementById('durationPrescription').value;
    let instructions = document.getElementById('instructionsPrescription').value;

    if (drug === '') {
        alert('Ingrese el nombre del medicamento.')
        return;
    } else if (dose === '') {
        alert('Introducir dosis');
        return;
    } else if (duration === '') {
        alert('Ingrese la duración');
        return;
    } else if (instructions === '') {
        alert('Ingrese instrucciones');
        return;
    }

    let prescription = {
        _id: new Date().toLocaleDateString('en-GB'),
        drug: drug,
        dose: dose,
        duration: duration,
        instructions: instructions
    };

    // We store prescription records in an array stored with the patient
    patientDb.get(patientId)
    .then(patient => {
        if (patient.prescriptions) {
            patient.prescriptions.push(prescription);
        } else {
            patient.prescriptions = [prescription];
        }

        patientDb.put(patient)
        .then(res => {
            addRow(prescription);
        })
        .catch(err => {
            return console.log(err);
        }); 
    })
    .catch(err => {
        return console.log(err);
    });
};

submitButton.onclick = addPrescription;