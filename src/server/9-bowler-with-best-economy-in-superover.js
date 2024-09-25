import fs from 'fs';

import deliveries from '../data/deliveries.json' assert { type:'json'}

function bowler_best_in_superOver(){
   

        let economy_bowlers = {};
    
        for (let i = 0; i < deliveries.length; i++) {
    
            const { is_super_over, bowler, total_runs, wide_runs, noball_runs } = deliveries[i];
    
            if (is_super_over !== "0") {
                if (economy_bowlers[bowler]) {
                    economy_bowlers[bowler]['total_runs'] += Number(total_runs);
    
                    if (wide_runs === "0" && noball_runs === "0") {
                        economy_bowlers[bowler]['total_balls']++;
                    }
                }
                else {
                    economy_bowlers[bowler] = { 'total_runs': 0, 'total_balls': 0 };
                    economy_bowlers[bowler]['total_runs'] = Number(total_runs);
    
                    if (wide_runs === "0" && noball_runs === "0") {
                        economy_bowlers[bowler]['total_balls']++;
                    }
                }
            }
        }
    
    let best_economy_bowler = {};

    let bowler = "";
    let eco = Number.MAX_VALUE;
    for(let key in economy_bowlers){
        let totalRuns = economy_bowlers[key]['total_runs']
        let totalBall = economy_bowlers[key]['total_balls']
        let economy = totalRuns/(totalBall/6);
        if(eco > economy){
            eco = economy;
            bowler = key;
        }
    }

    best_economy_bowler[bowler] = eco;
    return best_economy_bowler;
          
    
}
    

let result = bowler_best_in_superOver();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/9_bowler_With_Best_SuperOver.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}