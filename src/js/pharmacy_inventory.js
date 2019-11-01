var PouchDB = require('pouchdb-browser');
var drugs = new PouchDB('drugs');

const queryParams = document.location.search;
const drugName = queryParams.substring(queryParams.indexOf('=') + 1);

let title = document.getElementsByClassName('page-title')[0];
title.innerText = drugName;