import csvtojson from 'csvtojson';
import fs from 'fs';

const matchesCSVFile = '/home/dell/JS-IPL-DATA-PROJECT/src/data/matches.csv';
const deliveriesCSVFile = '/home/dell/JS-IPL-DATA-PROJECT/src/data/deliveries.csv';

csvtojson().fromFile(matchesCSVFile).then((jsonData) => {
    try {
        fs.writeFileSync("/home/dell/JS-IPL-DATA-PROJECT/src/data/matches.json", JSON.stringify(jsonData), "utf-8");
        console.log("matches.json file written successfully");
    } catch (err) {
        console.error("Error writing matches.json file", err);
    }
});

csvtojson().fromFile(deliveriesCSVFile).then((jsonData) => {
    try {
        fs.writeFileSync("/home/dell/JS-IPL-DATA-PROJECT/src/data/deliveries.json", JSON.stringify(jsonData), "utf-8");
        console.log("deliveries.json file written successfully");
    } catch (err) {
        console.error("Error writing deliveries.json file", err);
    }
});