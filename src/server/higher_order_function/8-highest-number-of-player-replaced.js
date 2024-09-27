// Find the highest number of times one player has been dismissed by another player.

import fs from "fs";
import deliveries from '../../data/deliveries.json' assert {type: 'json'};

function highestDismissedPlayer() {
    let dismissedPlayerStats = {};
    try {
        dismissedPlayerStats = deliveries.reduce((dismissals, { player_dismissed, bowler }) => {
            if (player_dismissed !== "") {
                dismissals[player_dismissed] = dismissals[player_dismissed] || {};
                dismissals[player_dismissed][bowler] = (dismissals[player_dismissed][bowler] || 0) + 1;
            }
            return dismissals;
        }, {});
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }
    // console.log(dismissedPlayerStats);

    let highestDismissalplayer = {};
    try {
        highestDismissalplayer = Object.entries(dismissedPlayerStats).reduce((playerDismissals, [player, bowlers]) => {
            Object.entries(bowlers).reduce((acc, [bowler, maxCount]) => {
                if (playerDismissals.count < maxCount) {
                    playerDismissals.count = maxCount;
                    playerDismissals.bowler_name = bowler;
                    playerDismissals.player_name = player;
                }
                return acc;
            });
            return playerDismissals;
        }, { player_name: "", bowler_name: "", count: 0 });
    }
    catch (error) {
        console.log("Error processing match data: ", error);
        return {};
    }

    return highestDismissalplayer;
}


let highestDismissalPlayer = highestDismissedPlayer();

try {
    fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/hof_output/highestDismissalCount.json', JSON.stringify(highestDismissalPlayer, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}