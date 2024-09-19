import fs from 'fs';

import deliveries from '../data/deliveries.json' assert { type:'json'}

function bowlerWithBestInSuperOver(){
   

        let economyBowlers = {};
    
        for (let i = 0; i < deliveries.length; i++) {
    
            const { is_super_over, bowler, total_runs, wide_runs, noball_runs } = deliveries[i];
    
            if (is_super_over !== "0") {
                if (economyBowlers[bowler]) {
                    economyBowlers[bowler]['total_runs'] += Number(total_runs);
    
                    if (wide_runs === "0" && noball_runs === "0") {
                        economyBowlers[bowler]['total_balls']++;
                    }
                }
                else {
                    economyBowlers[bowler] = { 'total_runs': 0, 'total_balls': 0 };
                    economyBowlers[bowler]['total_runs'] = Number(total_runs);
    
                    if (wide_runs === "0" && noball_runs === "0") {
                        economyBowlers[bowler]['total_balls']++;
                    }
                }
            }
        }
    
    let bestEconomyBowler = {};

    let bowler = "";
    let eco = Number.MAX_VALUE;
    for(let key in economyBowlers){
        let totalRuns = economyBowlers[key]['total_runs']
        let totalBall = economyBowlers[key]['total_balls']
        let economy = totalRuns/(totalBall/6);
        if(eco > economy){
            eco = economy;
            bowler = key;
        }
    }

    bestEconomyBowler[bowler] = eco;
    return bestEconomyBowler;
          
    
}
    

let result = bowlerWithBestInSuperOver();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/9_bowler_With_Best_SuperOver.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}