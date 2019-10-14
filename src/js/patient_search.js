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

function getPatientsByName() {
    let patientName = document.getElementById('searchByNameText').value;

    patientDb.find({
        selector: { name: patientName },
        fields: ['_id', 'name'],
        sort: ['name']
    }, function (err, result) {
        if (err) {
            console.log(err);
            return null;
        }

        console.log(result);
        return result;
    });
}

function searchForPatientByName() {
    let patients = getPatientsByName();
    if (patients != null) {
        // display the patients on the page and reformat all the html
    }
};

var searchByNameButton = document.getElementById('searchByNameButton');
var searchByIdButton = document.getElementById('searchByIdButton');

searchByNameButton.onclick = searchForPatientByName;