import jsonminify from "jsonminify";
import {promises as fs} from 'fs';
async function JSONFromFile(path, options){
	let orgin_jsonstr = await fs.readFile(path, options);
	// console.log(orgin_jsonstr);
	let jsonstr = jsonminify(orgin_jsonstr).replace(/,]/g,"]").replace(/,}/g,"}");
	// console.log(jsonstr);
	return JSON.parse(jsonstr);
}
export {JSONFromFile};