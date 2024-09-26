// Find the highest number of times one player has been dismissed by another player

import deliveries from  '../../data/deliveries.json' assert {type : 'json'};

function highest_dismissed_player() {

    let dismissed_player_stats = deliveries.reduce((dismissals, { player_dismissed, bowler }) => {
        if (player_dismissed !== "") {
            dismissals[player_dismissed] = dismissals[player_dismissed] || {};
            dismissals[player_dismissed][bowler] = (dismissals[player_dismissed][bowler] || 0) + 1;
        }
        return dismissals;
    }, {});


    let highest_dismissal_player = Object.entries(dismissed_player_stats).reduce((player_dismissals, [player, bowlers]) => {
        Object.entries(bowlers).reduce((acc, [bowler, max_count]) => {
            if (player_dismissals.count < max_count) {
                player_dismissals.count = max_count;
                player_dismissals.bowler_name = bowler;
                player_dismissals.player_name = player;
            }
            return acc;
        });
        return player_dismissals;
    }, { player_name: "", bowler_name: "", count: 0 });

    return highest_dismissal_player;
}


console.log(highest_dismissed_player());

