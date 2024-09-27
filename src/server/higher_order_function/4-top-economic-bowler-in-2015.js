// Top 10 economical bowlers in the year 2015 

import fs from 'fs';
import matches from '../../data/matches.json' assert {type: 'json'};
import deliveries from '../../data/deliveries.json' assert {type: 'json'};

function economicOfBowlerIn2015() {
    let matchId = [];
    try {
        matchId = matches.filter(({ season }) => season === "2015").map(({ id }) => id);
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }

    let bowlersListIn2015 = {};
    try {
        bowlersListIn2015 = deliveries.reduce((acc, { match_id, bowler, total_runs, noball_runs, wide_runs }) => {
            if (matchId.includes(match_id)) {
                let runs = Number(total_runs);
                acc[bowler] = acc[bowler] || {};
                acc[bowler]['totalRuns'] = (acc[bowler]['totalRuns'] || 0) + runs;
                if (noball_runs === "0" && wide_runs === "0") {
                    acc[bowler]['totalBalls'] = (acc[bowler]['totalBalls'] || 0) + 1;
                }
            }
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing matches data: ", error);
        return {};
    }
    // console.log(bowlersListIn2015);

    let economyOfBowlerIn2015 = {};
    try {
        economyOfBowlerIn2015 = Object.entries(bowlersListIn2015).reduce((acc, [key, value]) => {
            let over = value['totalBalls'] / 6;
            let economy = value['totalRuns'] / over;
            acc[key] = Number(economy.toFixed(2));
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing deliveries data: ", error);
        return {};
    }

    //  console.log(Object.entries(bowlersListIn2015))
    // console.log(economyOfBowlerIn2015);

    let top10EconomyBowlerIn2015 = {};;
    try {
        top10EconomyBowlerIn2015 = Object.entries(economyOfBowlerIn2015)
            .sort(([, economy1], [, economy2]) => economy1 - economy2)
            .slice(0, 10)
            .reduce((economyObject, [bowler, economy]) => {
                economyObject[bowler] = Number(economy.toFixed(2));
                return economyObject;
            }, {});

            return top10EconomyBowlerIn2015
    }
    catch (error) {
        console.log("Error determining top economical bowlers: ", error);
        return {};
    }
   

    // console.log(Object.entries(bowlersListIn2015))
}

let top10EconomyBowlerIn2015 = economicOfBowlerIn2015();

try {
    fs.writeFileSync('src/public/hof_output/topEconomicBowler2015.json', JSON.stringify(top10EconomyBowlerIn2015, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}


