// Find the bowler with the best economy in super overs

import deliveries from '../data/deliveries.json' assert { type: 'json'}

export function bowlerBestInSuperover() {


    let economyBowlers = {};
    try {
        for (let i = 0; i < deliveries.length; i++) {

            const { is_super_over, bowler, total_runs, wide_runs, noball_runs } = deliveries[i];

            if (is_super_over !== "0") {
                if (economyBowlers[bowler]) {
                    economyBowlers[bowler]['total_runs'] += Number(total_runs);

                    if (wide_runs === "0" && noball_runs === "0") {
                        economyBowlers[bowler]['total_balls']++;
                    }
                }
                else {
                    economyBowlers[bowler] = { 'total_runs': 0, 'total_balls': 0 };
                    economyBowlers[bowler]['total_runs'] = Number(total_runs);

                    if (wide_runs === "0" && noball_runs === "0") {
                        economyBowlers[bowler]['total_balls']++;
                    }
                }
            }
        }

        let bestEconomyBowlers = {};

        let bowler = "";
        let eco = Number.MAX_VALUE;
        for (let key in economyBowlers) {
            let totalRuns = economyBowlers[key]['total_runs']
            let totalBall = economyBowlers[key]['total_balls']
            let economy = totalRuns / (totalBall / 6);
            if (eco > economy) {
                eco = economy;
                bowler = key;
            }
        }

        bestEconomyBowlers[bowler] = eco;
        return bestEconomyBowlers;
    }

    catch (error) {
        console.log("Error processing the data: ", error);
        return {};
    }
}