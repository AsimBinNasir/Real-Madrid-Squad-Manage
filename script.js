import { renderPositions } from './data/positions.js';
import { renderPlayers } from './components/renderPlayers.js';
import { renderRightSidebar } from './components/renderRightSidebar.js';

let selectedPlayers = [];
let currentPosition = "Goalkeeper";

// Main UI update function
function updateUI(position = currentPosition, selected = selectedPlayers) {
  selectedPlayers = selected;
  currentPosition = position;
  renderRightSidebar(selectedPlayers);
  renderPlayers(currentPosition, selectedPlayers, updateUI);
}

// Render positions and set up click handler
renderPositions((pos) => {
  updateUI(pos, selectedPlayers);
});

// Initial render
updateUI();


// console.log("hello world")
// import { players } from './data/player.js';

// let selectedPlayers = [];

// // 1. Render position list
// const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
// const positionSection = document.getElementById("position-section");

// const ul = document.createElement("ul");
// ul.id = "position-list";
// ul.className = "flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 sm:ml-8 md:ml-16 lg:ml-32 text-base sm:text-lg md:text-xl lg:text-2xl leading-snug sm:leading-normal md:leading-7";

// positions.forEach((pos, index) => {
//   const li = document.createElement("li");
//   li.className = "cursor-pointer text-wipe";
//   li.dataset.text = pos;
//   li.textContent = pos;
//   if (index === 0) {
//     li.classList.add("text-violet-600"); // Highlight the first position
//   }
//   li.onclick = () => {
//     // Remove color from all li
//     ul.querySelectorAll("li").forEach(item => {
//       item.classList.remove("text-violet-600");
//     });
//     // Add color to the clicked li
//     li.classList.add("text-violet-600");
//     renderPlayers(pos);
//   };
//   ul.appendChild(li);

// });
// positionSection.appendChild(ul);




// // 2. Render player cards for a position using only createElement
// function renderPlayers(position) {
//   const grid = document.getElementById("player-grid");
//   grid.innerHTML = ""; // Clear previous cards
//   const key = position.toLowerCase();
//   if (players[key]) {
//     players[key].forEach((player, idx) => {
//       const card = document.createElement("div");
//       card.className = "relative border border-slate-400 p-4 flex flex-col items-center w-full";

//       // Jersey number
//       const numberDiv = document.createElement("div");
//       numberDiv.className = "absolute top-2 left-2 font-bold text-7xl sm:text-7xl md:text-7xl lg:text-5xl text-violet-600";
//       numberDiv.textContent = player.jerseyNumber;
//       card.appendChild(numberDiv);

//       // Image
//       const img = document.createElement("img");
//       img.src = player.image;
//       img.alt = player.name;
//       img.className = "mx-auto";
//       card.appendChild(img);

//       // Name
//       const nameSpan = document.createElement("span");
//       nameSpan.className = "mt-4 text-5xl sm:text-5xl md:text-5xl lg:text-3xl font-semibold text-center block";
//       nameSpan.innerHTML = player.name;
//       card.appendChild(nameSpan);

//       // Position
//       const posSpan = document.createElement("span");
//       posSpan.className = "text-3xl sm:text-2xl md:text-2xl lg:text-2xl text-gray-600 text-center block";
//       posSpan.textContent = player.position;
//       card.appendChild(posSpan);

//       // Button
//       const btn = document.createElement("button");
//       btn.className = "mt-4 bg-violet-500 hover:bg-violet-600 px-6 py-2 block mx-auto rounded text-white";
//       btn.id = `select-btn-${idx + 1}`;
//       btn.textContent = selectedPlayers.includes(player) ? "Remove" : "Select";

//       btn.onclick = () => {
//         if (selectedPlayers.includes(player)) {
//           // Remove player
//           selectedPlayers = selectedPlayers.filter(p => p !== player);
//           btn.textContent = "Select";
//         } else {
//           // Add player
//           selectedPlayers.push(player);
//           btn.textContent = "Remove";
//         }
//         renderSelectedPlayers();
//       };
//       card.appendChild(btn);

//       grid.appendChild(card);
//     });
//   }
// }

// renderPlayers("Goalkeeper");

// function renderRightSidebar() {
//   const sidebar = document.getElementById("right-sidebar");
//   sidebar.innerHTML = ""; // Clear previous content

//   // --- Selected Players Section ---
//   const selectedDiv = document.createElement("div");
//   selectedDiv.className = "border border-slate-400 p-4";

//   const selectedH2 = document.createElement("h2");
//   selectedH2.className = "text-4xl text-center";
//   selectedH2.textContent = "Selected-V";
//   selectedDiv.appendChild(selectedH2);

//   const selectedOl = document.createElement("ol");
//   selectedOl.className = "list-decimal pl-4 mt-4 py-2";
//   selectedOl.id = "best-V";
//   selectedDiv.appendChild(selectedOl);

//   // --- Budget Calculator Section ---
//   const budgetDiv = document.createElement("div");
//   budgetDiv.className = "border border-slate-400 p-4";

//   const budgetH2 = document.createElement("h2");
//   budgetH2.className = "text-4xl text-center";
//   budgetH2.textContent = "Budget";
//   budgetDiv.appendChild(budgetH2);

//   const budgetWrapper = document.createElement("div");
//   budgetWrapper.className = "mt-6 space-y-4";

//   // Per Player input
//   const perPlayerDiv = document.createElement("div");
//   perPlayerDiv.className = "grid grid-cols-2 gap-2";
//   perPlayerDiv.innerHTML = `
//     <label for="player-salary" class="font-semibold">Per Player</label>
//     <input type="text" id="player-salary" class="border border-violet-400 rounded p-1">
//   `;
//   budgetWrapper.appendChild(perPlayerDiv);

//   // Calculate button
//   const calcBtn = document.createElement("button");
//   calcBtn.id = "calculate";
//   calcBtn.className = "bg-violet-500 hover:bg-violet-600 px-8 py-2 rounded mx-auto block text-white font-semibold";
//   calcBtn.textContent = "Calculate";
//   budgetWrapper.appendChild(calcBtn);

//   // Player Expense & Manager/Coach inputs
//   const expenseDiv = document.createElement("div");
//   expenseDiv.className = "grid grid-cols-2 gap-2";
//   expenseDiv.innerHTML = `
//     <p class="font-semibold">Player Expense</p>
//     <p class="font-semibold">$<span id="player-expense">0000</span></p>
//     <label for="manager-salary" class="font-semibold">Manager</label>
//     <input type="text" id="manager-salary" class="border border-violet-400 rounded p-1">
//     <label for="coach-salary" class="font-semibold">Coach</label>
//     <input type="text" id="coach-salary" class="border border-violet-400 rounded p-1">
//   `;
//   budgetWrapper.appendChild(expenseDiv);

//   // Calculate Total button
//   const calcTotalBtn = document.createElement("button");
//   calcTotalBtn.id = "calculate-total";
//   calcTotalBtn.className = "bg-violet-500 hover:bg-violet-600 px-8 py-2 rounded mx-auto block text-white font-semibold";
//   calcTotalBtn.textContent = "Calculate Total";
//   budgetWrapper.appendChild(calcTotalBtn);

//   // Total display
//   const totalDiv = document.createElement("div");
//   totalDiv.className = "grid grid-cols-2 gap-2 mt-4 px-2";
//   totalDiv.innerHTML = `
//     <p class="font-bold">Total</p>
//     <p class="font-bold text-violet-600">$<span id="grand-total">0000</span></p>
//   `;
//   budgetWrapper.appendChild(totalDiv);

//   budgetDiv.appendChild(budgetWrapper);

//   // --- Append both sections to sidebar ---
//   sidebar.appendChild(selectedDiv);
//   sidebar.appendChild(budgetDiv);
// }

// function renderSelectedPlayers() {
//   const selectedList = document.getElementById('best-V');
//   selectedList.innerHTML = '';
//   selectedPlayers.forEach((player) => {
//     const li = document.createElement('li');
//     li.innerHTML = `${player.name} (${player.position})`;
//     li.className = 'text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 ml-4';
//     selectedList.appendChild(li);
//   });
// }

// renderRightSidebar();
