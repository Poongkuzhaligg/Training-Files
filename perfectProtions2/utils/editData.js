// This is a code snippet for modifying the JSON data files in the project.

const foodCodes = require('../src/assets/data/items.json');
var fs = require('fs');

function normalizeString(str) {
	return str
		.trim()
		.replace(/[^0-9a-zA-Z\ ]/g, '')
		.replace(/\ {2,}/g, ' ')
		.toLowerCase();
}

const updatedCodes = foodCodes.map((code) => {
	// Do something here
	return code;
});

const updatedJson = JSON.stringify(updatedCodes, null, 2);

fs.writeFile("items.json", updatedJson, (err) => {
	console.log(err);
});

