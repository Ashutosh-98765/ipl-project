// Find the highest number of times one player has been dismissed by another player

import deliveries from '../data/deliveries.json' assert { type: 'json'}

export function highestNumberOfPlayerDismissed() {

    let dismissedPlayersStats = {};
    try {
        for (let i = 0; i < deliveries.length; i++) {

            const { player_dismissed, bowler } = deliveries[i];

            if (player_dismissed !== "") {
                if (dismissedPlayersStats[player_dismissed]) {
                    if (dismissedPlayersStats[player_dismissed][bowler]) {
                        dismissedPlayersStats[player_dismissed][bowler]++;
                    }
                    else {
                        dismissedPlayersStats[player_dismissed][bowler] = 1;
                    }
                }
                else {
                    dismissedPlayersStats[player_dismissed] = {};
                    dismissedPlayersStats[player_dismissed][bowler] = 1;
                }
            }
        }
        // console.log(dismissed_player_stats)


        let highestDismissalPlayer = {};

        let playerName = "";
        let bowlerName = "";
        let maxCount = 0;

        for (let player in dismissedPlayersStats) {

            let playerStats = dismissedPlayersStats[player];

            for (let bowler in playerStats) {
                if (playerStats[bowler] >= maxCount) {
                    maxCount = playerStats[bowler];
                    bowlerName = bowler;
                    playerName = player;
                }
            }
        }

        highestDismissalPlayer[playerName] = {};
        highestDismissalPlayer[playerName][bowlerName] = maxCount;

        return highestDismissalPlayer;
    }

    catch (error) {
        console.error("Error calculating highest dismissed player: ", error);
        return {};
    }
}
