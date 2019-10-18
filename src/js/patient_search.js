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
    let searchString = RegExp(patientName, 'i');

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

        if (patients.docs.length === 0) {
            return null;
        }

        let tableBody = document.getElementById('search-table-body');
        tableBody.innerHTML = "";
        for (let i = 0; i < patients.docs.length; i++) {

            let doc = patients.docs[i];
            let row = document.createElement('tr');

            let nameLink = document.createElement('a');
            nameLink.setAttribute('href', './patient_page.html?id=' + doc._id);
            nameLink.innerText = doc.name;

            let idLink = document.createElement('a');
            idLink.setAttribute('href', './patient_page.html?id=' + doc._id);
            idLink.innerText = doc._id;

            let dobLink = document.createElement('a');
            dobLink.setAttribute('href', './patient_page.html?id=' + doc._id);
            dobLink.innerText = doc.dob;

            let sexLink = document.createElement('a');
            sexLink.setAttribute('href', './patient_page.html?id=' + doc._id);
            sexLink.innerText = doc.sex;

            let communityLink = document.createElement('a');
            communityLink.setAttribute('href', './patient_page.html?id=' + doc._id);
            communityLink.innerText = doc.community;
            
            let nameCell = document.createElement('td');
            let idCell = document.createElement('td');
            let dobCell = document.createElement('td');
            let sexCell = document.createElement('td');
            let communityCell = document.createElement('td');

            nameCell.appendChild(nameLink);
            idCell.appendChild(idLink);
            dobCell.appendChild(dobLink);
            sexCell.appendChild(sexLink);
            communityCell.appendChild(communityLink);

            row.appendChild(nameCell);
            row.appendChild(idCell);
            row.appendChild(dobCell);
            row.appendChild(sexCell);
            row.appendChild(communityCell);

            tableBody.appendChild(row);
            
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