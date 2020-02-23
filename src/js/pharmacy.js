var PouchDB = require('pouchdb-browser');
var drugs = new PouchDB('drugs');

var tableBody = document.getElementById('pharmacy-table-body');
var modal = document.getElementById('inventory-modal');
var newPrescriptionModal = document.getElementById('new-prescription-modal');
var closeButton = document.getElementById('modal-close');
var closeButton2 = document.getElementById('modal-close2');
var drugName = document.getElementById('drug-name');
var inventoryNumber = document.getElementById('inventory-number');
var inventorySaveButton = document.getElementById('inventory-save-button');
var newPrescriptionButton = document.getElementById('new-prescription');
var newPrescriptionSaveButton = document.getElementById('new-prescription-save-button');

newPrescriptionButton.onclick = () => {
    newPrescriptionModal.style.display = 'block';
}

newPrescriptionSaveButton.onclick = () => {
    let newName = document.getElementById('new-prescription-name').value;
    console.log(newName)
    console.log(typeof(newName));
    let inventory = document.getElementById('inventory-number2').value;

    let drug = {
        _id: newName,
        inventory: inventory
    };
    console.log(typeof(drug));
    drugs.put(drug)
        .then((res) => {
            let doc = drug;

            let row = document.createElement('tr');

            let drugLink = document.createElement('a');
            drugLink.innerText = doc._id;

            let inventoryLink = document.createElement('a');
            // Set the link to the appropriate page
            inventoryLink.innerText = doc.inventory;

            let drugCell = document.createElement('td');
            let inventoryCell = document.createElement('td');

            drugCell.onclick = () => {
                modal.style.display = 'block';
                drugName.innerText = doc._id;
                drugs.get(doc._id)
                    .then((res) => {
                        inventoryNumber.value = res.inventory;
                    })
            }

            inventoryCell.onclick = () => {
                modal.style.display = 'block';
                drugName.innerText = doc._id;
                inventoryNumber.value = doc.inventory;
            }

            drugCell.appendChild(drugLink);
            inventoryCell.appendChild(inventoryLink);

            row.appendChild(drugCell);
            row.appendChild(inventoryCell);

            tableBody.appendChild(row);

            newPrescriptionModal.style.display = 'none';
        })
        .catch((err) => {
            console.log(err);
        });
}

inventorySaveButton.onclick = () => {
    let drugName = document.getElementById('drug-name').innerText;
    let inventory = inventoryNumber.value;
    drugs.get(drugName)
        .then((drug) => {
            let oldInventory = drug.inventory;
            drug.inventory = inventory;
            drugs.put(drug)
                .then((res) => {
                    modal.style.display = 'none';
                    // need to loop through tableBody's children and find row w/drugname matching id
                    // and change the value to be the new one
                    for (let i = 0; i < tableBody.children.length; i++) {
                        if (tableBody.children[i].children[0].innerText === drugName) {
                            tableBody.children[i].children[1].innerText = inventory;
                        }
                    }
                })
                .catch((err) => {
                    inventoryNumber.value = oldInventory;
                    console.log(err);
                });
        });
}

closeButton.onclick = () => {
    modal.style.display = 'none';
}

closeButton2.onclick = () => {
    newPrescriptionModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == newPrescriptionModal) {
        newPrescriptionModal.style.display = "none";
    }
}

drugs.allDocs({ include_docs: true }, function(err, res) {
    if (err) {
        return console.log(err);
    }

    // build the damn table
    for (let i = 0; i < res.rows.length; i++) {
        let doc = res.rows[i].doc;
        let row = document.createElement('tr');

        let drugLink = document.createElement('a');
        drugLink.innerText = doc._id;

        let inventoryLink = document.createElement('a');
        // Set the link to the appropriate page
        inventoryLink.innerText = doc.inventory;

        let drugCell = document.createElement('td');
        let inventoryCell = document.createElement('td');

        drugCell.onclick = () => {
            modal.style.display = 'block';
            drugName.innerText = doc._id;
            drugs.get(doc._id)
                .then((res) => {
                    inventoryNumber.value = res.inventory;
                })
        }

        inventoryCell.onclick = () => {
            modal.style.display = 'block';
            drugName.innerText = doc._id;
            inventoryNumber.value = doc.inventory;
        }

        drugCell.appendChild(drugLink);
        inventoryCell.appendChild(inventoryLink);

        row.appendChild(drugCell);
        row.appendChild(inventoryCell);

        tableBody.appendChild(row);
    }
});
