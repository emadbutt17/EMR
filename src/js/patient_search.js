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

    patientDb.find({
        selector: { name: patientName },
        fields: ['_id', 'name'],
        sort: ['name']
    }, function (err, patients) {
        if (err) {
            console.log(err);
            return null;
        }

        console.log(patients);
        console.log(patients.docs);

        for (let i = 0; i < patients.docs.length; i++) {
            console.log(patients.docs[i]);
            // TODO: add row to table with real data
            // let doc = patients.docs[i];
            // let info = [doc.name, doc.id, doc.DOB, doc.sex, doc.community];
            let rowArr = ["Dynamic", "Dynamic2", "Dynamic3", "Dynamic4", "Dynamic5"];

        }

        // make table visible now that every row is made
        let table = document.getElementById("search-table-element");
        table.style.visibility = "visible";
    });
}

var searchByNameButton = document.getElementById('searchByNameButton');
var searchByIdButton = document.getElementById('searchByIdButton');

searchByNameButton.onclick = getPatientsByName;
searchByIdButton.onclick = getPatientById;

// TODO: Use localstorage to pass id to next page
// TODO: or just make it a query parameter on the link ?id=038415
// TODO: upon loading of results, create a link to each patient page