//Find a player who has won the highest number of Player of the Match awards for each season

import fs from 'fs';
import matches from '../../data/matches.json' assert {type: 'json'};

function highestPOTMPerSeason() {
    let perSeasonPOTM = {};
    try {
        perSeasonPOTM = matches.reduce((acc, { season, player_of_match }) => {
            acc[season] = acc[season] || {};
            acc[season][player_of_match] = (acc[season][player_of_match] || 0) + 1;
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }
    //    console.log(perSeasonPOTM);

    let highestPOTMEachSeason = {};
    try {
        highestPOTMEachSeason = Object.entries(perSeasonPOTM).reduce((acc, [key, value]) => {
            let max = 0
            let batsman = "";
            Object.entries(value).forEach(([key, value]) => {
                if (value > max) {
                    max = value;
                    batsman = key;
                }
            });
            acc[key] = acc[key] || {};
            acc[key][batsman] = max;
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }
    //    console.log(Object.entries(perSeasonPOTM))
    return highestPOTMEachSeason;
}

let highestPOTMEachSeason = highestPOTMPerSeason();

try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/highestPotmPerSeason.json', JSON.stringify(highestPOTMEachSeason, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}