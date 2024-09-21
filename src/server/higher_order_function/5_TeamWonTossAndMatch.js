// 5. Find the number of times each team won the toss and also 
// won the match

import matches from '../../data/matches.json' assert {type : 'json'};

function teamWonTossAndMatch(){

    let result = matches.reduce((acc , {toss_winner, winner}) => {
        if(toss_winner === winner){
            acc[winner] = (acc[winner] || 0) + 1;
        }
        return acc;
    },{});

    console.log(result);
}

teamWonTossAndMatch();