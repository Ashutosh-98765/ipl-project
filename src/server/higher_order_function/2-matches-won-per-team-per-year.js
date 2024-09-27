// 2. Number of matches won per team per year in IPL.

import fs from 'fs';
import matches from '../../data/matches.json' assert {type: 'json'};

function matchesWonPerTeamPerYear() {
    let matchesWonTeamData = {};
    try {
        matchesWonTeamData = matches.reduce((acc, { season, winner }) => {
            acc[season] = acc[season] || {};
            acc[season][winner] = (acc[season][winner] || 0) + 1;
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }

    return matchesWonTeamData;
}

let matchesWonTeamData = matchesWonPerTeamPerYear();


try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/matchesWonPerTeamPerYear.json', JSON.stringify(matchesWonTeamData, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}


