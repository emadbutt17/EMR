var PouchDB = require('pouchdb-browser');
var drugs = new PouchDB('drugs');

var tableBody = document.getElementById('pharmacy-table-body');
var modal = document.getElementById('inventory-modal');
var closeButton = document.getElementById('modal-close');
var drugName = document.getElementById('drug-name');
var inventoryNumber = document.getElementById('inventory-number');
var inventorySaveButton = document.getElementById('inventory-save-button');

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

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
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
        // drugLink.setAttribute('href', './pharmacy_inventory.html?drug=' + doc._id);
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
