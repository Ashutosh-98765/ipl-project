// 2. Number of matches won per team per year in IPL.

import matches from '../data/matches.json' assert {type : 'json'};

function matches_Won_Per_TeamPerYear(){
    let matchesWonTeamPerYear = matches.reduce((acc , {season , winner}) => {
        acc[season] = acc[season] || {};
        acc[season][winner] = (acc[season][winner] || 0) + 1;
        return acc;
    },{});
    console.log(matchesWonTeamPerYear);
}

matches_Won_Per_TeamPerYear();




