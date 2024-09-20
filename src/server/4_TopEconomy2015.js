// Top 10 economical bowlers in the year 2015 

import matches from '../data/matches.json' assert {type : 'json'};
import deliveries from '../data/deliveries.json' assert {type : 'json'};

function economicBowler(){

    let match_Id = matches.filter(({season}) => season === "2015").map(({id}) => id);

    let bowlersList = deliveries.reduce((acc , {match_id, bowler, total_runs, noball_runs, wide_runs }) => {
        if(match_Id.includes(match_id)){
            let runs = Number(total_runs);
            acc[bowler] = acc[bowler] || {};
            acc[bowler]['totalRuns'] = (acc[bowler]['totalRuns'] || 0) + runs;
            if(noball_runs === "0" && wide_runs === "0"){
                acc[bowler]['totalBalls'] = (acc[bowler]['totalBalls'] || 0) + 1;
            }
        }
        return acc;
    },{});
    let economyBowler = Object.entries(bowlersList).reduce((acc , [key , value]) => {
        let over = value['totalBalls'] / 6;
        let economy = value['totalRuns'] / over;
        acc[key] = economy;
        return acc;
    },{});

    // console.log(economyBowler);

    let economyBowlerArray = Object.entries(economyBowler).sort(([,economy1],[,economy2]) => economy1 - economy2);

    console.log(economyBowlerArray.slice(0,10));
    // console.log(bowlersList);
    // console.log(Object.entries(bowlersList));
}

economicBowler();

