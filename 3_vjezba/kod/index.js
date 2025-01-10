const fs = require('fs').promises;
const path = require('path');

const PATH = path.dirname(__dirname);

function lengthOfWords(words)
{
	const wordslengthcount = {}
	for (const word of words)
	{
		const key = word.length;
		wordslengthcount[key] = (wordslengthcount[key] ?? 0) + 1;
	}
	return wordslengthcount;
}

async function getFiles(path){
	const filesData = []
	let textCombined='';
	try {
		const listofitems = await fs.readdir(path)
		for (const item of listofitems)
		{
			if (item.endsWith(".txt")){
				try {
					const text = await fs.readFile(`${path}\\${item}`, "utf8");
					const wordsSplit = text.split(/\s+/);
					const numberofwords = lengthOfWords(wordsSplit)
					filesData.push({
						"imeDadoteke" : item,
						"ukupanBrojRijeci" : wordsSplit.length, 
						"brojRijeciSaIstimBrojevimaSlova" : numberofwords,
					});
					textCombined += text.replace(/\s+/g,'');
				} catch (err)
				{
					console.log("Error while reading file: ",err);
				}
			}
			else if (!item.includes("."))
			{
				try {
					const subData = await getFiles(`${path}\\${item}`);
					filesData.push(...subData);
				} 
				catch(err) {
					console.log("Error in getting subfolder: ", err);
				}
			}
		}
	}
	catch(err)
	{
		console.log("Error while getting files: ", err);
	}

	try {
		if (textCombined)
			await fs.writeFile('textoutput.txt', textCombined, 'utf8');
		}
	catch (error)
	{
		console.log("Error while writing file: ",error);
	}

	return filesData;
}

async function vasaFunkcija () {
	try{
		const result = await getFiles(PATH);
		return result;
	}
	catch (err)
	{
		console.log("Error: ",err);
	}
}

module.exports = {
	vasaFunkcija,
}
