// 4. Top 10 economical bowlers in the year 2015

import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }
import deliveries from '../data/deliveries.json' assert { type:'json'}

// function topEcoBowler2015(){
//     let matchId2015 = [];
//     let bowler = {};
//     for(let i=0; i<matches.length;i++){
        
//         if(matches[i]['season'] === "2015"){
//                 matchId2015.push(matches[i]['id']);
//          }
//     }
//     for(let i=0; i<deliveries.length;i++){
//         let match_id = deliveries[i].match_id
//         if(matchId2015.includes(match_id)){
//             let bowlerName = deliveries[i].bowler
//             if(bowler.hasOwnProperty(bowlerName)){
//                bowler[bowlerName]['totalRuns'] +=Number(deliveries[i]['total_runs'])
//                 let no_ball = Number.parseInt(deliveries[i].noball_runs)
//                 let wide_ball = Number.parseInt(deliveries[i].wide_runs)
//                 if(no_ball === 0 && wide_ball === 0){
//                     bowler[bowlerName]['totalBall']++;
//                 }
//             }
//             else{
//                 bowler[bowlerName] = {'totalRuns' : 0 , totalBall : 0}
//                 bowler[bowlerName]['totalRuns']+=Number(deliveries[i]['total_runs'])
//                 let no_ball = Number.parseInt(deliveries[i].noball_runs)
//                 let wide_ball = Number.parseInt(deliveries[i].wide_runs)
//                 if(no_ball === 0 && wide_ball === 0){
//                     bowler[bowlerName]['totalBall']++;
//                 }
//             }
//         }
//     }

//     let ecoOfBowler = [];
//     for(let key in bowler){
//         let over = bowler[key]['totalBall']/6
//         let eco = bowler[key]['totalRuns']/over;
//         ecoOfBowler.push({'bowler': key , 'eco' : eco})
//     }
//     ecoOfBowler.sort((a,b) => a.eco-b.eco)
//     return ecoOfBowler.slice(0,10)
// }


function top_10_Economy_Bowler(){
  let matchId2015 = [];
  let bowlersList = {};
  for(let i =0; i<matches.length; i++){
    let{ season , id }= matches[i];
    if(season === "2015"){
        matchId2015.push(id);
    }
  }
  for(let i=0; i<deliveries.length;i++){
    let { match_id , wide_runs, bye_runs , bowler , total_runs } = deliveries[i];
    if(matchId2015.includes(match_id)){
        if(bowlersList[bowler]){
            bowlersList[bowler]['totalRuns']+= Number(total_runs);
            if(Number(wide_runs) == 0 && Number(bye_runs) ==0){
                bowlersList[bowler]['totalBalls']++;
            }
        }
        else{
            bowlersList[bowler] = {'totalRuns' :0 , 'totalBalls' : 0}
            bowlersList[bowler]['totalRuns'] = Number(total_runs);
            if(Number(wide_runs) == 0 && Number(bye_runs) ==0){
                bowlersList[bowler]['totalBalls']++;
            }
        }

    }
  }
  
  let top10EconomialBowlers = [];
  for(let bowler in bowlersList){
    let over  = bowlersList[bowler]['totalBalls']/6;
    let totalRuns  = bowlersList[bowler]['totalRuns'];
    let eco = totalRuns/over;
    top10EconomialBowlers.push({'bowler' : bowler , 'eco' : eco})
  }
  top10EconomialBowlers.sort((a,b) => a.eco-b.eco);
  return top10EconomialBowlers.slice(0,10);
}

let result = top_10_Economy_Bowler();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/4_top_Economic_Bowler_2015.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}