var PouchDB = require('pouchdb-browser');
var drugs = new PouchDB('drugs');

drugs.allDocs({ include_docs: true }, function(err, res) {
    if (err) {
        return console.log(err);
    }

    console.log('res: ');
    console.log(res);
    let tableBody = document.getElementById('pharmacy-table-body');

    // build the damn table
    for (let i = 0; i < res.rows.length; i++) {
        let doc = res.rows[i].doc;
        let row = document.createElement('tr');

        let drugLink = document.createElement('a');
        drugLink.setAttribute('href', './pharmacy_inventory.html?drug=' + doc._id);
        drugLink.innerText = doc._id;

        let inventoryLink = document.createElement('a');
        // Set the link to the appropriate page
        inventoryLink.innerText = doc.inventory;

        let drugCell = document.createElement('td');
        let inventoryCell = document.createElement('td');

        drugCell.appendChild(drugLink);
        inventoryCell.appendChild(inventoryLink);

        row.appendChild(drugCell);
        row.appendChild(inventoryCell);

        tableBody.appendChild(row);
    }
});

// let vicodin = {
//     _id: 'Vicodin',
//     inventory: 1184
// };

// let levoxyl = {
//     _id: 'Levoxyl',
//     inventory: 837
// };

// let amoxil = {
//     _id: 'Amoxil',
//     inventory: 109
// };

// let delasone = {
//     _id: 'Delasone',
//     inventory: 473
// };

// let zofran = {
//     _id: 'Zofran',
//     inventory: 751
// };

// let ibuprofen = {
//     _id: 'Ibuprofen',
//     inventory: 2190
// };

// let lipitor = {
//     _id: 'Lipitor',
//     inventory: 343
// };

// let neurotonin = {
//     _id: 'Neurotonin',
//     inventory: 42
// };

// let glucophage = {
//     _id: 'Glucophage',
//     inventory: 230
// };

// let hydrocodone = {
//     _id: 'Hydrocodone',
//     inventory: 675
// };

// let zithromax = {
//     _id: 'Zithromax',
//     inventory: 1402
// };

// let azithromycin = {
//     _id: 'Azithromycin',
//     inventory: 477
// };

// let hydrochlorothiazide = {
//     _id: 'Hydrochlorothiazide',
//     inventory: 805
// };

// drugs.put(azithromycin, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(hydrochlorothiazide, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(zithromax, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(hydrocodone, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(glucophage, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(neurotonin, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(vicodin, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(levoxyl, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(amoxil, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(zofran, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(ibuprofen, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(delasone, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });

// drugs.put(lipitor, function(err, res) {
//     if (err) {
//         console.log('err!');
//         console.log(err);
//     }
//     else {
//         console.log('done :)');
//         console.log(res);
//     }
// });