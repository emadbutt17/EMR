var PouchDB = require('pouchdb-browser');
var drugs = new PouchDB('drugs');

var modal = document.getElementById('inventory-modal');
var closeButton = document.getElementById('modal-close');
var drugName = document.getElementById('drug-name');
var inventoryNumber = document.getElementById('inventory-number');

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
    let tableBody = document.getElementById('pharmacy-table-body');

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
            inventoryNumber.value = doc.inventory;
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
