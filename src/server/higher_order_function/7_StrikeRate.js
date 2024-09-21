// Find the strike rate of a batsman for each season

import matches from '../../data/matches.json' assert {type : 'json'};
import deliveries from  '../../data/deliveries.json' assert {type : 'json'};

function strike_Rate_BatsMan_Each_Season(){

    let matchIdPerSeason = {};
    matches.forEach(({season , id}) => {
        matchIdPerSeason[id] = season;
    })
    // console.log(matchIdPerSeason);

    let batsmanStats = deliveries.reduce((acc , {match_id, batsman, batsman_runs}) => {
        let season = matchIdPerSeason[match_id];
        acc[season] = acc[season] || {};
        let runs = Number(batsman_runs);
        acc[season][batsman] = acc[season][batsman] || {};
        acc[season][batsman]['totalRuns'] = (acc[season][batsman]['totalRuns'] || 0) + runs;
        acc[season][batsman]['totalBall'] = (acc[season][batsman]['totalBall'] || 0) + 1;
        return acc;
    },{});

    // console.log(batsmanStats);


    let batsman_strike_rate = Object.entries(batsmanStats).reduce((strike_rate, [season, batsman_Stats]) => {
        strike_rate[season] = {};
        Object.entries(batsman_Stats).forEach(([batsman, batsman_state]) => {
            const { totalRuns, totalBall} = batsman_state;
            let strike = (totalRuns / totalBall) * 100;
            strike_rate[season][batsman] = strike;
        });
        return strike_rate;
    }, {});

    console.log(batsman_strike_rate);
}

    // console.log(Object.keys(batsmanStats))
    // console.log(batsman_strike_rate);




strike_Rate_BatsMan_Each_Season();

