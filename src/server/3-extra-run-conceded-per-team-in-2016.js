// 3. Extra runs conceded per team in the year 2016

import matches from '../data/matches.json' assert { type: 'json' }
import deliveries from '../data/deliveries.json' assert { type: 'json'}

export function extraRunConcededPerTeamIn2016() {
    let team2016Id = [];
    let extraRunPerTeamData = {};
    try {
        for (let i = 0; i < matches.length; i++) {
            let { season, id } = matches[i];

            if (!season || !id) {
                throw new Error("Missing season or match_id");
            }

            if (season === "2016") {
                team2016Id.push(id);
            }
        }
        for (let i = 0; i < deliveries.length; i++) {
            let { match_id, bowling_team, extra_runs } = deliveries[i];

            if (!match_id || !bowling_team || extra_runs === undefined) {
                throw new Error("Missing delivery data");
            }

            if (team2016Id.includes(match_id)) {
                if (extraRunPerTeamData[bowling_team]) {
                    extraRunPerTeamData[bowling_team] += Number(extra_runs)
                }
                else {
                    extraRunPerTeamData[bowling_team] = Number(extra_runs);
                }
            }

        }
        return extraRunPerTeamData;
    }
    catch (error) {
        console.error("Error while calculating extra runs conceded: ", error);
        return {};
    }

}
