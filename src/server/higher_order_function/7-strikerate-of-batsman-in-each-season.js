// Find the strike rate of a batsman for each season
import fs from "fs";
import matches from '../../data/matches.json' assert {type: 'json'};
import deliveries from '../../data/deliveries.json' assert {type: 'json'};

function strikeRateOfBatsManEachSeason() {
    let matchIdPerSeason = {};
    try {
        matches.forEach(({ season, id }) => {
            matchIdPerSeason[id] = season;
        })
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }
    // console.log(matchIdPerSeason);

    let batsmanStatsInEachSeason = {};
    try {
        batsmanStatsInEachSeason = deliveries.reduce((acc, { match_id, batsman, batsman_runs }) => {
            let season = matchIdPerSeason[match_id];
            let runs = Number(batsman_runs);
            acc[season] = acc[season] || {};
            acc[season][batsman] = acc[season][batsman] || {};
            acc[season][batsman]['totalRuns'] = (acc[season][batsman]['totalRuns'] || 0) + runs;
            acc[season][batsman]['totalBall'] = (acc[season][batsman]['totalBall'] || 0) + 1;
            return acc;
        }, {});
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }
    // console.log(batsmanStatsInEachSeason);


    let strikeRateBatsmanInPerSeason = {};
    try {
        strikeRateBatsmanInPerSeason = Object.entries(batsmanStatsInEachSeason).reduce((strikeRate, [season, batsmanStats]) => {
            Object.entries(batsmanStats).forEach(([batsman, batsmanState]) => {
                const { totalRuns, totalBall } = batsmanState;
                let strike = (totalRuns / totalBall) * 100;
                strikeRate[season] = strikeRate[season] || {};
                strikeRate[season][batsman] = strike
            });
            // console.log(strikeRate);
            return strikeRate;
        }, {});
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }

    return strikeRateBatsmanInPerSeason;
}

// console.log(Object.keys(batsmanStats))

let strikeRateBatsmanInPerSeason = strikeRateOfBatsManEachSeason();


try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/batsmamStrikeRateEachSeason.json', JSON.stringify(strikeRateBatsmanInPerSeason, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}