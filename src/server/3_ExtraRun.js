// 3. Extra runs conceded per team in the year 2016

import matches from '../data/matches.json' assert {type : 'json'};
import deliveries from '../data/deliveries.json' assert {type : 'json'};

function extraRunConcededPerTeam2016(){
    
    let match_Id = matches.filter(({season}) => season === "2016").map(({id}) => id);

    let runsConceded = deliveries.reduce((acc , {bowling_team, extra_runs, match_id}) => {
        if(match_Id.includes(match_id)){
            let runs = Number(extra_runs);
            acc[bowling_team] = (acc[bowling_team] || 0) + runs;
        }
        return acc;
    },{});

    console.log(runsConceded);

}
extraRunConcededPerTeam2016()

