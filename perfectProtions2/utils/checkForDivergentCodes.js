// This is a utility for checking the food code data set for code mismatches

const foodCodes = require('../src/assets/data/items.json');
var fs = require('fs');

const codeDict = {};
const divergentCodes = [];

foodCodes.forEach((code) => {
	if (codeDict.hasOwnProperty(code.code)) {
		if (codeDict[code.code].name.slice(0,5) !== code.name.slice(0,5)) {
			divergentCodes.push({
				first: codeDict[code.code],
				mismatch: code
			})
		}
	} else {
		codeDict[code.code] = code;
	}
})

console.log(divergentCodes.map((obj) => `${obj.first.code}: ${obj.first.name} ---- ${obj.mismatch.name}`));
console.log(`Count: ${divergentCodes.length}` );
