import { players } from '../data/player.js';
import { positions } from '../data/positions.js';

function countByPosition(selectedPlayers, position) {
  return selectedPlayers.filter(p => p.position === position).length;
}

export function renderPlayers(position, selectedPlayers, onSelectChange) {
  const grid = document.getElementById("player-grid");
  grid.innerHTML = "";
  const key = position.toLowerCase();
  if (players[key]) {
    players[key].forEach((player, idx) => {
      const card = document.createElement("div");
      card.className = "relative border border-slate-400 p-4 flex flex-col items-center w-full";

      const numberDiv = document.createElement("div");
      numberDiv.className = "absolute top-2 left-2 font-bold text-7xl sm:text-7xl md:text-7xl lg:text-5xl text-violet-600";
      numberDiv.textContent = player.jerseyNumber;
      card.appendChild(numberDiv);

      const img = document.createElement("img");
      img.src = player.image;
      img.alt = player.name;
      img.className = "mx-auto";
      card.appendChild(img);

      const nameSpan = document.createElement("span");
      nameSpan.className = "mt-4 text-5xl sm:text-5xl md:text-5xl lg:text-3xl font-semibold text-center block";
      nameSpan.innerHTML = player.name;
      card.appendChild(nameSpan);

      const posSpan = document.createElement("span");
      posSpan.className = "text-3xl sm:text-2xl md:text-2xl lg:text-2xl text-gray-600 text-center block";
      posSpan.textContent = player.position;
      card.appendChild(posSpan);

      const btn = document.createElement("button");
      btn.className = "mt-4 bg-violet-500 hover:bg-violet-600 px-6 py-2 block mx-auto rounded text-white";
      btn.id = `select-btn-${idx + 1}`;
      btn.textContent = selectedPlayers.includes(player) ? "Remove" : "Select";

      btn.onclick = () => {
        const positionCount = countByPosition(selectedPlayers, player.position);

        // Only 5 players total
        if (!selectedPlayers.includes(player) && selectedPlayers.length >= 5) {
          alert("You can only select 5 players.");
          return;
        }

        // Only 1 goalkeeper
        if (
          player.position === "Goalkeeper" &&
          !selectedPlayers.includes(player) &&
          countByPosition(selectedPlayers, "Goalkeeper") >= 1
        ) {
          alert("Only one goalkeeper can be selected.");
          return;
        }

        // No more than 2 from any position
        if (
          !selectedPlayers.includes(player) &&
          positionCount >= 2
        ) {
          alert("No more than 2 players can be selected from this position.");
          return;
        }

        // If 2 from one position, only 1 from others
        const counts = positions.map(pos => countByPosition(selectedPlayers, pos));
        if (
          !selectedPlayers.includes(player) &&
          counts.some(c => c === 2) &&
          positionCount >= 1 &&
          counts.filter(c => c === 2).length === 1 &&
          player.position !== positions[counts.indexOf(2)]
        ) {
          alert("If 2 players are selected from one position, only 1 can be selected from each other position.");
          return;
        }

        // Add or remove player
        let newSelected;
        if (selectedPlayers.includes(player)) {
          newSelected = selectedPlayers.filter(p => p !== player);
        } else {
          newSelected = [...selectedPlayers, player];
        }
        onSelectChange(position, newSelected); // Pass position as first argument!
      };
      card.appendChild(btn);

      grid.appendChild(card);
    });
  }
}