// 3. Extra runs conceded per team in the year 2016

import fs from 'fs';
import matches from '../../data/matches.json' assert {type: 'json'};
import deliveries from '../../data/deliveries.json' assert {type: 'json'};

function extraRunConcededPerTeamIn2016() {
    let matchId = [];
    try {
        matchId = matches.filter(({ season }) => season === "2016").map(({ id }) => id);
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }

    let extraRunsConceded = {};
    try {
        extraRunsConceded = deliveries.reduce((acc, { bowling_team, extra_runs, match_id }) => {
            if (matchId.includes(match_id)) {
                let runs = Number(extra_runs);
                acc[bowling_team] = (acc[bowling_team] || 0) + runs;
            }
            return acc;
        }, {});
    }

    catch (error) {
        console.log("Error processing deliveries data: ", error);
        return {};
    }
    return extraRunsConceded;

}
let extraRunsConceded = extraRunConcededPerTeamIn2016();

try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/extraRunsConceded2016.json', JSON.stringify(extraRunsConceded, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}


