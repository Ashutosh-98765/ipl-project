// 1.Number of matches played per year for all the years in IPL.

import fs from 'fs';
import matches from '../../data/matches.json' assert {type: 'json'};

function matchesPerYear() {
    let matchesPerYearData = {};
    try {
        matchesPerYearData = matches.reduce((acc, { season }) => {
            acc[season] = (acc[season] || 0) + 1;
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }

    return matchesPerYearData;
}
let matchesPerYearData = matchesPerYear();

try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/matchesPerYear.json', JSON.stringify(matchesPerYearData, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);

}

