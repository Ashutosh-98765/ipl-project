import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }
import deliveries from '../data/deliveries.json' assert { type:'json'}





function topEcoBowler2015(){
    let matchId2015 = [];
    let bowler = {};
    for(let i=0; i<matches.length;i++){
        
        if(matches[i]['season'] === "2015"){
                matchId2015.push(matches[i]['id']);
         }
    }
    for(let i=0; i<deliveries.length;i++){
        let match_id = deliveries[i].match_id
        if(matchId2015.includes(match_id)){
            let bowlerName = deliveries[i].bowler
            if(bowler.hasOwnProperty(bowlerName)){
               bowler[bowlerName]['totalRuns'] +=Number(deliveries[i]['total_runs'])
                let no_ball = Number.parseInt(deliveries[i].noball_runs)
                let wide_ball = Number.parseInt(deliveries[i].wide_runs)
                if(no_ball === 0 && wide_ball === 0){
                    bowler[bowlerName]['totalBall']++;
                }
            }
            else{
                bowler[bowlerName] = {'totalRuns' : 0 , totalBall : 0}
                bowler[bowlerName]['totalRuns']+=Number(deliveries[i]['total_runs'])
                let no_ball = Number.parseInt(deliveries[i].noball_runs)
                let wide_ball = Number.parseInt(deliveries[i].wide_runs)
                if(no_ball === 0 && wide_ball === 0){
                    bowler[bowlerName]['totalBall']++;
                }
            }
        }
    }

    let ecoOfBowler = [];
    for(let key in bowler){
        let over = bowler[key]['totalBall']/6
        let eco = bowler[key]['totalRuns']/over;
        ecoOfBowler.push({'bowler': key , 'eco' : eco})
    }
    ecoOfBowler.sort((a,b) => a.eco-b.eco)
    return ecoOfBowler.slice(0,10)

    // console.log(ecoOfBowler);
}
let result = topEcoBowler2015();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/4_top_Economic_Bowler_2015.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}