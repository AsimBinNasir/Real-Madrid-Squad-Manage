console.log("hello world")
import { players } from './data/player.js';

// Access the goalkeeper array
const goalkeepers = players.goalkeeper;
const defenders = players.defender;
const midfielders = players.midfielder;
// Example: log the entire defender array
console.log(midfielders);
// Example: log all goalkeeper names
goalkeepers.forEach(gk => {
  console.log(gk.name);
});