var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');
const uuidv4 = require('uuid/v4');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

patientDb.get(id)
.then(function(doc) {
    const diagnoses = doc.diagnoses;
    const checkups = doc.checkups;

    let diagnosisTableBody = document.getElementById('diagnosis-table-body');
    diagnosisTableBody.innerHTML = "";
    if (diagnoses) {
        diagnoses.sort((a,b) => { return b.date - a.date});
    }
    for (let i = 0; i < diagnoses.length; i++) {
        const diagnosis = diagnoses[i];
        let row = document.createElement('tr');
        const type = getEnglishType(diagnosis.type);
        const link = type + '_view' + '.html?diagnosisId=' + diagnosis._id + '&patientId=' + id;

        let nameLink = document.createElement('a');
        nameLink.setAttribute('href', link);
        nameLink.innerText = doc.name;

        let conditionLink = document.createElement('a');
        conditionLink.setAttribute('href', link);
        conditionLink.innerText = type[0].toUpperCase() + type.substr(1);

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

        diagnosisTableBody.appendChild(row);
    }

    let checkupTableBody = document.getElementById('checkup-table-body');
    checkupTableBody.innerHTML = "";
    for (let i = 0; i < checkups.length; i++) {
        const checkup = checkups[i];
        let row = document.createElement('tr');
        // TODO: fix this, it should figure out what sort of eval to go to based on checkup date
        // and patient date i.e. age & gender
        const link = './Evaluations_Men_20-59.html?patientId=' + id + '&checkupId=' + checkup._id
    
        let dateLink = document.createElement('a');
        dateLink.setAttribute('href', link);
        dateLink.innerText = checkup.date;

        let notesLink = document.createElement('a');
        notesLink.setAttribute('href', link);
        notesLink.innerText = checkup.notes;

        let dateCell = document.createElement('td');
        let notesCell = document.createElement('td');
        
        notesCell.setAttribute('class', 'wide-table-column');

        dateCell.appendChild(dateLink);
        notesCell.appendChild(notesLink);

        row.appendChild(dateCell);
        row.appendChild(notesCell);

        checkupTableBody.appendChild(row);
    }

})
.catch(function(err) {
    console.log(err);
});

var getEnglishType = (type) => {
    const english_types = ['asthma', 'depression', 'diabetes', 'pregnancy', 'epilepsy', 'hypertension'];
    const spanish_types = ['asma', 'depresión', 'diabetes', 'embarazada', 'epilepsia', 'hipertensión'];

    for (let i = 0; i < spanish_types.length; i++) {
        if (type.toLowerCase() === spanish_types[i]) {
            return english_types[i];
        }
    }
    return type;
};