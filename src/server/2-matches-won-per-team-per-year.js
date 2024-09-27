// 2. Number of matches won per team per year in IPL.

import matches from '../data/matches.json' assert { type: 'json' }

export function matchesWonPerTeamPerYear() {
    let matchWonTeamPerYear = {};
    try {
        for (let i = 0; i < matches.length; i++) {
            let { season, winner } = matches[i];
            if (matchWonTeamPerYear[season]) {
                if (matchWonTeamPerYear[season][winner]) {
                    matchWonTeamPerYear[season][winner]++;
                }
                else {
                    if (winner === "") {
                        continue;
                    }
                    else {
                        matchWonTeamPerYear[season][winner] = 1;
                    }
                }
            }
            else {
                matchWonTeamPerYear[season] = {};
                matchWonTeamPerYear[season][winner] = 1;
            }
        }
        return matchWonTeamPerYear
    }
    catch (error) {
        console.error("Error while processing matches won per team per season data: ", error);
        return {};
    }
}
