// Find the bowler with the best economy in super overs

import fs from "fs";
import deliveries from '../../data/deliveries.json' assert {type: 'json'};

function bowlersWithbestEconomyInSuperOver() {
    let bowlerStatsInSuperOver = {};
    try {
        bowlerStatsInSuperOver = deliveries.reduce((acc, { bowler, is_super_over, total_runs }) => {
            if (is_super_over === "1") {
                if (!acc[bowler]) {
                    acc[bowler] = { 'totalRuns': 0, 'totalBalls': 0 };
                    acc[bowler]['totalRuns'] = acc[bowler]['totalRuns'] + Number(total_runs);
                    acc[bowler]['totalBalls']++;
                }
                else {
                    acc[bowler]['totalRuns'] = acc[bowler]['totalRuns'] + Number(total_runs);
                    acc[bowler]['totalBalls']++;
                }
            }
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }
    // console.log(bowlerStatsInSuperOver);

    let economyOfBowler = {}
    try {
        economyOfBowler = Object.entries(bowlerStatsInSuperOver).reduce((acc, [bowler, bowlerStats]) => {
            let economy = bowlerStats['totalRuns'] / (bowlerStats['totalBalls'] / 6);
            acc[bowler] = economy;
            return acc;
        }, []);
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }
    // console.log(economyOfBowler);

    let sortedEconomy = {};
    try {
        sortedEconomy = Object.entries(economyOfBowler).sort(([, a], [, b]) => {
            return a - b;
        }).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }
    // return sortedEconomy;

    return Object.entries(sortedEconomy).slice(0,1);

}
let sortedEconomy = bowlersWithbestEconomyInSuperOver();

try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/topEconomicBowler2015.json', JSON.stringify(sortedEconomy, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}
