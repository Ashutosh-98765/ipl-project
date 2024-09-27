// Find the strike rate of a batsman for each season

import matches from '../data/matches.json' assert { type: 'json' }
import deliveries from '../data/deliveries.json' assert { type:'json'}

export function strikeRateOfBatsmanInEachSeason(){
    let  batsmanDataInEachSeason= {};
    try{
    for(let i=0; i<matches.length;i++){
        let {season,id} = matches[i];
        for(let i=0; i<deliveries.length; i++){
            let {match_id , batsman , batsman_runs: btrun} = deliveries[i];
            if(id === match_id){
                if(batsmanDataInEachSeason[season]){
                   if(batsmanDataInEachSeason[season][batsman]){
                    batsmanDataInEachSeason[season][batsman]['totalRuns']+=Number(btrun);
                    batsmanDataInEachSeason[season][batsman]['totalBall']++;
                   }
                   else{
                    batsmanDataInEachSeason[season][batsman]={'totalRuns': Number(btrun) , 'totalBall':1}
                   }
                }
                else{
                    batsmanDataInEachSeason[season]={};
                    batsmanDataInEachSeason[season][batsman]={'totalRuns': Number(btrun) , 'totalBall':1}
                }
            }
        }
    }


    let strikeRateOfBatsmanEachSeason = {};
    for(let key in batsmanDataInEachSeason){
        strikeRateOfBatsmanEachSeason[key] = {};
        let value = batsmanDataInEachSeason[key];
        for(let player in value){
            let totalBall = value[player]['totalBall'];
            let totalRuns = value[player]['totalRuns'];
            let strike = (totalRuns / totalBall) * 100;
            strikeRateOfBatsmanEachSeason[key][player] = strike;
        }
    }
    return strikeRateOfBatsmanEachSeason;
}

catch (error) {
    console.error("Error calculating strike rates: ", error);
    return {};
}
}
