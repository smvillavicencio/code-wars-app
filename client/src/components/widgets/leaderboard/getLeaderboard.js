/* eslint-disable */ 
import { getFetch } from "utils/apiRequest";
import { baseURL } from "utils/constants";


export default async function getLeaderboard() {
  let data = await getFetch(`${baseURL}/viewLeaderboard`,);
  let currLeaderboard = [];

  data.leaderboard.map((entry) => {
    let newEntry = {};

    newEntry.rank = "";
    newEntry.id = entry._id;
    newEntry.team_name = entry.team_name;
    newEntry.score = entry.score;
    newEntry.total_points_used = entry.total_points_used;

    currLeaderboard.push(newEntry);
  })

  // sort leaderboard descending order
  currLeaderboard.sort((a, b) => {
    return b.score - a.score;
  });

  // add ranks to field values
  currLeaderboard.map((entry, index) => {
    entry.rank = index + 1;
  })

  return currLeaderboard;
}