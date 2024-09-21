import fs from 'fs';

import deliveries from '../data/deliveries.json' assert { type:'json'}



function highest_dismissed_player() {

    let dismissed_player_stats = {};

    for (let i = 0; i < deliveries.length; i++) {

        const { player_dismissed, bowler } = deliveries[i];

        if (player_dismissed !== "") {
            if (dismissed_player_stats[player_dismissed]) {
                if (dismissed_player_stats[player_dismissed][bowler]) {
                    dismissed_player_stats[player_dismissed][bowler]++;
                }
                else {
                    dismissed_player_stats[player_dismissed][bowler] = 1;
                }
            }
            else {
                dismissed_player_stats[player_dismissed] = {};
                dismissed_player_stats[player_dismissed][bowler] = 1;
            }
        }
    }
// console.log(dismissed_player_stats)


    let highest_dismissal_player = {};

    let playerName = "";
    let bowlerName = "";
    let max_count = 0;

    for (let player in dismissed_player_stats) {

        let player_stats = dismissed_player_stats[player];

        for (let bowler in player_stats) {
            if (player_stats[bowler] > max_count) {
                max_count = player_stats[bowler];
                bowlerName = bowler;
                playerName = player;
            }
        }
    }

    highest_dismissal_player[playerName] = {};
    highest_dismissal_player[playerName][bowlerName] = max_count;

    return highest_dismissal_player;

}
// console.log(highest_dismissed_player());

let highest_dismissal_player = highest_dismissed_player();
const jsonData = JSON.stringify(highest_dismissal_player, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/8_highest_No_Player_Replaced.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}