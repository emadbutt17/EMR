var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

// TODO: remove
const diagnosis1 = {
    _id: '382961979023',
    date: 'January 1, 2018',
    type: 'Asthma'
};

const diagnosis2 = {
    _id: '692750871',
    date: 'August 23, 2018',
    type: 'Depression'
};

var diagnoses = [diagnosis1, diagnosis2];

patientDb.get(id)
.then(function(doc) {
    let name = doc.name;
    // let diagnoses = doc.diagnoses;

    let tableBody = document.getElementById('search-table-body');
    tableBody.innerHTML = "";
    for (let i = 0; i < diagnoses.length; i++) {
        const diagnosis = diagnoses[i];
        let row = document.createElement('tr');
        const link = './diagnostics_' + diagnosis.type + '.html?diagnosisId=' + diagnosis._id + '&patientId=' + id;

        let nameLink = document.createElement('a');
        nameLink.setAttribute('href', link);
        nameLink.innerText = doc.name;

        let conditionLink = document.createElement('a');
        conditionLink.setAttribute('href', link);
        conditionLink.innerText = diagnosis.type;

        let dateLink = document.createElement('a');
        dateLink.setAttribute('href', link);
        dateLink.innerText = diagnosis.date;

        let nameCell = document.createElement('td');
        let conditionCell = document.createElement('td');
        let dateCell = document.createElement('td');

        nameCell.appendChild(nameLink);
        conditionCell.appendChild(conditionLink);
        dateCell.appendChild(dateLink);

        row.appendChild(nameCell);
        row.appendChild(conditionCell);
        row.appendChild(dateCell);

        tableBody.appendChild(row);
    }

})
.catch(function(err) {
    console.log(err);
});