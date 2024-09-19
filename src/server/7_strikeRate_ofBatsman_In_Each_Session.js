import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }
import deliveries from '../data/deliveries.json' assert { type:'json'}


function strikeRateOfBatsman(){
    let resultData = {};
    for(let i=0; i<matches.length;i++){
        let {season,id} = matches[i];
        for(let i=0; i<deliveries.length; i++){
            let {match_id , batsman , batsman_runs: btrun} = deliveries[i];
            if(id === match_id){
                if(resultData[season]){
                   if(resultData[season][batsman]){
                    resultData[season][batsman]['totalRuns']+=Number(btrun);
                    resultData[season][batsman]['totalBall']++;
                   }
                   else{
                    resultData[season][batsman] = {}
                    resultData[season][batsman]={'totalRuns': Number(btrun) , 'totalBall':1}
                   }
                }
                else{
                    resultData[season]={};
                    resultData[season][batsman]={};
                    resultData[season][batsman]={'totalRuns': Number(btrun) , 'totalBall':1}
                }
            }
        }
    }


    let result = {};
    for(let key in resultData){
        result[key] = {};
        let value = resultData[key];
        for(let player in value){
            let totalBall = value[player]['totalBall'];
            let totalRuns = value[player]['totalRuns'];
            let strike = (totalRuns / totalBall) * 100;
            result[key][player] = strike;
        }
    }
    return result;
}

let result = strikeRateOfBatsman();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/7_strikeRate_ofBatsman_In_Each_Session.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}