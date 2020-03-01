var PouchDB = require('pouchdb-browser');
PouchDB.plugin(require('pouchdb-find'));
var patientDb = new PouchDB('patients');

// Create an index on patient name so we can search for them easily
// Does nothing if index already exists
patientDb.createIndex({
    index: {
        fields: ['name']
    }
}, function (err, result) {
    if (err) {
        console.log(err);
    }
});

function getPatientById() {
    let patientId = document.getElementById('searchByIdText').value;

    patientDb.get(patientId)
    .then(function(doc) {
        console.log(doc);
        document.location.href = "./patient_page.html?id=" + patientId;
    })
    .catch(function(err) {
        console.log(err);
    });
}

function getPatientsByName() {
    let patientName = document.getElementById('searchByNameText').value;
    let searchString = RegExp(patientName + '.*', 'i');

    patientDb.find({
        selector: { name: { $regex: searchString } },
        // selector: { $regex: patientName },
        fields: ['_id', 'name', 'dob', 'sex', 'community'],
        sort: ['name']
    }, function (err, patients) {
        if (err) {
            console.log(err);
            return null;
        }
        
        let tableBody = document.getElementById('search-table-body');
        tableBody.innerHTML = "";

        if (patients.docs.length === 0) {
            let row = document.createElement('tr');
            let cell = document.createElement('td');
            cell.innerText = "ninguna paciente encontrada"
            cell.style.width = '80vw';
            row.appendChild(cell);
            tableBody.appendChild(row);
        }

        for (let i = 0; i < patients.docs.length; i++) {

            let doc = patients.docs[i];
            let row = document.createElement('tr');

            let link = document.createElement('a');
            link.setAttribute('href', './patient_page.html?id=' + doc._id);
            
            let nameCell = document.createElement('td');
            nameCell.innerText = doc.name;
            let idCell = document.createElement('td');
            idCell.innerText = doc._id;
            let dobCell = document.createElement('td');
            dobCell.innerText = doc.dob;
            let sexCell = document.createElement('td');
            sexCell.innerText = doc.sex;
            let communityCell = document.createElement('td');
            communityCell.innerText = doc.community;

            row.appendChild(nameCell);
            row.appendChild(idCell);
            row.appendChild(dobCell);
            row.appendChild(sexCell);
            row.appendChild(communityCell);

            link.appendChild(row);
            tableBody.appendChild(link);
            
        }

        table.style.visibility = "visible";
    });
}

var table = document.getElementById("search-table-element");
var searchByNameButton = document.getElementById('searchByNameButton');
var searchByIdButton = document.getElementById('searchByIdButton');
var searchByNameInput = document.getElementById('searchByNameText');
var searchByIdInput = document.getElementById('searchByIdText');

searchByNameButton.onclick = getPatientsByName;
searchByIdButton.onclick = getPatientById;

searchByNameInput.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        searchByNameButton.click();
    }
});

searchByIdInput.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        searchByIdButton.click();
    }
});