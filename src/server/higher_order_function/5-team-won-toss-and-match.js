// 5. Find the number of times each team won the toss and also won the match.

import fs from 'fs';
import matches from '../../data/matches.json' assert {type: 'json'};

function teamWonTossAndMatch() {
    let teamWonTossAndMatchData = {};
    try {
        teamWonTossAndMatchData = matches.reduce((acc, { toss_winner, winner }) => {
            if (toss_winner === winner) {
                acc[winner] = (acc[winner] || 0) + 1;
            }
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }

    return teamWonTossAndMatchData;
}

let teamWonTossAndMatchData = teamWonTossAndMatch();

try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/teamWonTossAndMatch.json', JSON.stringify(teamWonTossAndMatchData, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}