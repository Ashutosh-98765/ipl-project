import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }
import deliveries from '../data/deliveries.json' assert { type:'json'}



function extraRunConceded2016(){
    let session2016Id = [];
    let result = {};
    for(let i=0; i<matches.length; i++){
        if(matches[i]['season'] === "2016"){
            session2016Id.push(matches[i]['id'])
    
        }
    }
    for(let i=0; i<deliveries.length;i++){
        let match_id = deliveries[i]['match_id']
        if(session2016Id.includes(match_id)){
            let bowling_team = deliveries[i]['bowling_team']
            if(!result.hasOwnProperty(bowling_team)){
                result[bowling_team] =Number.parseInt(deliveries[i]['extra_runs'])
            }
            else{
                let extra_run = Number.parseInt(deliveries[i]['extra_runs'])
                let old_runs = result[bowling_team];
                let total = extra_run + old_runs
                result[bowling_team] = total
            }
        }
    }
    return result;
}

let result = extraRunConceded2016();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/3_extra_Run_Conceded_2016.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}