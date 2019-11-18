var PouchDB = require('pouchdb-browser');
var patientDb = new PouchDB('patients');

let queryParams = document.location.search;
const id = queryParams.substring(queryParams.indexOf("=") + 1);

var modal = document.getElementById('notes-modal');
var modalClose = document.getElementById("modal-close");
modalClose.onclick = () => {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

patientDb.get(id)
.then(function(doc) {
    const diagnoses = doc.diagnoses;
    const checkups = doc.checkups;

    let diagnosisTableBody = document.getElementById('diagnosis-table-body');
    diagnosisTableBody.innerHTML = "";
    if (diagnoses) {
        diagnoses.sort((a,b) => { return b.date - a.date }); // TODO: fix this
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
            conditionLink.innerText = getSpanishType(type)[0].toUpperCase() + getSpanishType(type).substr(1);

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
    }

    let checkupTableBody = document.getElementById('checkup-table-body');
    checkupTableBody.innerHTML = "";
    if (checkups) {
        for (let i = 0; i < checkups.length; i++) {
            const checkup = checkups[i];
            let row = document.createElement('tr');
            // TODO: fix this, it should figure out what sort of eval to go to based on checkup date
            // and patient date i.e. age & gender
            const link = './Evaluations_Men_20-59.html?patientId=' + id + '&checkupId=' + checkup._id
        
            let dateLink = document.createElement('a');
            // dateLink.setAttribute('href', link);
            dateLink.innerText = checkup.date;

            let notesLink = document.createElement('a');
            // notesLink.setAttribute('href', link);
            notesLink.innerText = 'Haga clic para notas'; // checkup.notes;

            let dateCell = document.createElement('td');
            let notesCell = document.createElement('td');
            
            notesCell.setAttribute('class', 'wide-table-column');
            notesCell.onclick = () => {
                let container = document.getElementById('flex-container2');
                modal.style.display = 'block';
                if (checkup.type === 'M20-59') {
                    container.innerText = 'Notes';
                    let tbNotesHeader = document.createElement('div');
                    tbNotesHeader.innerText = 'Tuberculosis Notes';
                    tbNotesHeader.setAttribute('class', 'notes-header');

                    let tbNotes = document.createElement('div');
                    tbNotes.innerText = checkup.tbNotes;
                    tbNotes.setAttribute('class', 'notes');

                    container.appendChild(tbNotesHeader);
                    container.appendChild(tbNotes);

                    let oralNotesHeader = document.createElement('div');
                    oralNotesHeader.innerText = 'Oral Health Notes';
                    oralNotesHeader.setAttribute('class', 'notes-header');

                    let oralNotes = document.createElement('div');
                    oralNotes.innerText = checkup.oralNotes;
                    oralNotes.setAttribute('class', 'notes');

                    container.appendChild(oralNotesHeader);
                    container.appendChild(oralNotes);
                } else if (checkup.type === 'W20-59') {
                    container.innerText = 'Notes';
                    let tbNotesHeader = document.createElement('div');
                    let tbNotes = document.createElement('div');
                    let oralNotesHeader = document.createElement('div');
                    let oralNotes = document.createElement('div');
                    let menopauseNotesHeader = document.createElement('div');
                    let menopauseNotes = document.createElement('div');
                    let depressionNotesHeader = document.createElement('div');
                    let depressionNotes = document.createElement('div');
                    let familyViolenceNotesHeader = document.createElement('div');
                    let familyViolenceNotes = document.createElement('div');

                    tbNotesHeader.innerText = 'Tuberculosis Notes';
                    tbNotes.innerText = checkup.tbNotes;
                    oralNotesHeader.innerText = 'Oral Health Notes';
                    oralNotes.innerText = checkup.oralNotes;
                    menopauseNotesHeader.innerText = 'Menopause Notes';
                    menopauseNotes.innerText = checkup.menopauseNotes;
                    depressionNotesHeader.innerText = 'Depression Notes';
                    depressionNotes.innerText = checkup.depressionNotes;
                    familyViolenceNotesHeader.innerText = 'Family Violence Notes';
                    familyViolenceNotes.innerText = checkup.familyViolenceNotes;

                    tbNotesHeader.setAttribute('class', 'notes-header');
                    tbNotes.setAttribute('class', 'notes');
                    oralNotesHeader.setAttribute('class', 'notes-header');
                    oralNotes.setAttribute('class', 'notes');
                    menopauseNotesHeader.setAttribute('class', 'notes-header');
                    menopauseNotes.setAttribute('class', 'notes');
                    depressionNotesHeader.setAttribute('class', 'notes-header');
                    depressionNotes.setAttribute('class', 'notes');
                    familyViolenceNotesHeader.setAttribute('class', 'notes-header');
                    familyViolenceNotes.setAttribute('class', 'notes');

                    container.appendChild(tbNotesHeader);
                    container.appendChild(tbNotes);
                    container.appendChild(oralNotesHeader);
                    container.appendChild(oralNotes);
                    container.appendChild(menopauseNotesHeader);
                    container.appendChild(menopauseNotes);
                    container.appendChild(depressionNotesHeader);
                    container.appendChild(depressionNotes);
                    container.appendChild(familyViolenceNotesHeader);
                    container.appendChild(familyViolenceNotes);
                } else if (checkup.type === 'M60+' || checkup.type === 'W60+') {
                    container.innerText = 'Notas';
                    categories = ['Auditory Deficiency', 'Visual Deficiency', 'Depression', 'Family Violence'];
                    noteCategories = ['auditoryDeficiencyNotes', 'visualDeficiencyNotes', 'depressionNotes', 'familyViolenceNotes']
                    for (let i = 0; i < categories.length; i++) {
                        nodes = createNotesNodes(categories[i], checkup[noteCategories[i]]);
                        container.appendChild(nodes[0]);
                        container.appendChild(nodes[1]);
                    }
                } else if (checkup.type === 'Child1-4') {
                    container.innerText = 'Notas';
                    categories = [];
                    noteCategories = [];
                    for (let i = 0; i < categories.length; i++) {
                        nodes = createNotesNodes(categories[i], checkup[noteCategories[i]]);
                        container.appendChild(nodes[0]);
                        container.appendChild(nodes[1]);
                    }
                } else if (checkup.type === 'child5-9') {
                    container.innerText = 'Notas';
                    categories = ['Physical', 'Auditory Deficiency', 'Visual Deficiency', 'Disabilities', 'Posture', 'Tuberculosis', 'Nutrition', 'Domestic Violence'];
                    noteCategories = ['physicalNotes', 'auditoryDeficiencyNotes', 'visualDeficiencyNotes', 'disabilityNotes', 'postureNotes', 'tbNotes', 'nutritionNotes', 'domesticViolenceNotes'];
                    for (let i = 0; i < categories.length; i++) {
                        nodes = createNotesNodes(categories[i], checkup[noteCategories[i]]);
                        container.appendChild(nodes[0]);
                        container.appendChild(nodes[1]);
                    }
                } else if (checkup.type.toLowerCase() === 'child10-19') {
                    container.innerText = 'Notas';
                    categories = ['Physical', 'Auditory Deficiency', 'Visual Deficiency', 'HIV/AIDS', 'Nutrition', 'Addiction'];
                    noteCategories = ['physicalNotes', 'auditoryDeficiencyNotes', 'visualDeficiencyNotes', 'hivNotes', 'nutritionNotes', 'addictionNotes'];
                    for (let i = 0; i < categories.length; i++) {
                        nodes = createNotesNodes(categories[i], checkup[noteCategories[i]]);
                        container.appendChild(nodes[0]);
                        container.appendChild(nodes[1]);
                    }
                } else if (checkup.type === 'newborn') {
                    container.innerText = 'Notas';
                    categories = [];
                    noteCategories = [];
                    for (let i = 0; i < categories.length; i++) {
                        nodes = createNotesNodes(categories[i], checkup[noteCategories[i]]);
                        container.appendChild(nodes[0]);
                        container.appendChild(nodes[1]);
                    }
                }
            }

            dateCell.appendChild(dateLink);
            notesCell.appendChild(notesLink);

            row.appendChild(dateCell);
            row.appendChild(notesCell);

            checkupTableBody.appendChild(row);
        }
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

var getSpanishType = (type) => {
    const english_types = ['asthma', 'depression', 'diabetes', 'pregnancy', 'epilepsy', 'hypertension'];
    const spanish_types = ['asma', 'depresión', 'diabetes', 'embarazada', 'epilepsia', 'hipertensión'];

    for (let i = 0; i < english_types.length; i++) {
        if (type.toLowerCase() === english_types[i]) {
            return spanish_types[i];
        }
    }
    return type;
}

var createNotesNodes = (type, notes) => {
    let headerNode = document.createElement('div');
    headerNode.innerText = type + ' Notas';
    headerNode.setAttribute('class', 'notes-header');

    let notesNode = document.createElement('div');
    notesNode.innerText = notes;
    notesNode.setAttribute('class', 'notes');

    return [headerNode, notesNode];
}