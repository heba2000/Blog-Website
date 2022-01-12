const fs = require ('fs');
const readMyFile = (urlPath)=>JSON.parse(fs.readFileSync(urlPath,{encoding:'utf-8'}));
const writeMyFile = (urlPath,data)=> (fs.writeFileSync(urlPath,JSON.stringify(data)));

//to export functions
module.exports = {readMyFile , writeMyFile};