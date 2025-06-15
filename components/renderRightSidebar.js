// Helper to set up the budget calculator events
function setupBudgetCalculator(selectedPlayers) {
  const playerSalaryInput = document.getElementById('player-salary');
  const playerExpenseSpan = document.getElementById('player-expense');
  const managerSalaryInput = document.getElementById('manager-salary');
  const coachSalaryInput = document.getElementById('coach-salary');
  const grandTotalSpan = document.getElementById('grand-total');

  // Calculate Player Expense
  document.getElementById('calculate').onclick = () => {
    const perPlayer = parseFloat(playerSalaryInput.value) || 0;
    const total = perPlayer * selectedPlayers.length;
    playerExpenseSpan.textContent = total.toFixed(2);
  };

  // Calculate Grand Total
  document.getElementById('calculate-total').onclick = () => {
    const playerExpense = parseFloat(playerExpenseSpan.textContent) || 0;
    const manager = parseFloat(managerSalaryInput.value) || 0;
    const coach = parseFloat(coachSalaryInput.value) || 0;
    const grandTotal = playerExpense + manager + coach;
    grandTotalSpan.textContent = grandTotal.toFixed(2);
  };
}

export function renderRightSidebar(selectedPlayers) {
  // --- Preserve current input values ---
  const playerSalary = document.getElementById('player-salary')?.value || '';
  const managerSalary = document.getElementById('manager-salary')?.value || '';
  const coachSalary = document.getElementById('coach-salary')?.value || '';
  const playerExpense = document.getElementById('player-expense')?.textContent || '0000';
  const grandTotal = document.getElementById('grand-total')?.textContent || '0000';

  // --- Clear and recreate sidebar ---
  const sidebar = document.getElementById("right-sidebar");
  sidebar.innerHTML = "";

  // Selected Players
  const selectedDiv = document.createElement("div");
  selectedDiv.className = "border border-slate-400 p-4";
  const selectedH2 = document.createElement("h2");
  selectedH2.className = "text-4xl text-center";
  selectedH2.textContent = "Selected-V";
  selectedDiv.appendChild(selectedH2);

  const selectedOl = document.createElement("ol");
  selectedOl.className = "list-decimal pl-4 mt-4 py-2";
  selectedOl.id = "best-V";
  selectedPlayers.forEach(player => {
    const li = document.createElement('li');
    li.innerHTML = `${player.name} (${player.position})`;
    li.className = 'text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 ml-4';
    selectedOl.appendChild(li);
  });
  selectedDiv.appendChild(selectedOl);

  // Budget Calculator
  const budgetDiv = document.createElement("div");
  budgetDiv.className = "border border-slate-400 p-4";
  const budgetH2 = document.createElement("h2");
  budgetH2.className = "text-4xl text-center";
  budgetH2.textContent = "Budget";
  budgetDiv.appendChild(budgetH2);

  const budgetWrapper = document.createElement("div");
  budgetWrapper.className = "mt-6 space-y-4";

  const perPlayerDiv = document.createElement("div");
  perPlayerDiv.className = "grid grid-cols-2 gap-2";
  perPlayerDiv.innerHTML = `
    <label for="player-salary" class="font-semibold">Per Player</label>
    <input type="text" id="player-salary" class="border border-violet-400 rounded p-1">
  `;
  budgetWrapper.appendChild(perPlayerDiv);

  const calcBtn = document.createElement("button");
  calcBtn.id = "calculate";
  calcBtn.className = "bg-violet-500 hover:bg-violet-600 px-8 py-2 rounded mx-auto block text-white font-semibold";
  calcBtn.textContent = "Calculate";
  budgetWrapper.appendChild(calcBtn);

  const expenseDiv = document.createElement("div");
  expenseDiv.className = "grid grid-cols-2 gap-2";
  expenseDiv.innerHTML = `
    <p class="font-semibold">Player Expense</p>
    <p class="font-semibold">$<span id="player-expense">0000</span></p>
    <label for="manager-salary" class="font-semibold">Manager</label>
    <input type="text" id="manager-salary" class="border border-violet-400 rounded p-1">
    <label for="coach-salary" class="font-semibold">Coach</label>
    <input type="text" id="coach-salary" class="border border-violet-400 rounded p-1">
  `;
  budgetWrapper.appendChild(expenseDiv);

  const calcTotalBtn = document.createElement("button");
  calcTotalBtn.id = "calculate-total";
  calcTotalBtn.className = "bg-violet-500 hover:bg-violet-600 px-8 py-2 rounded mx-auto block text-white font-semibold";
  calcTotalBtn.textContent = "Calculate Total";
  budgetWrapper.appendChild(calcTotalBtn);

  const totalDiv = document.createElement("div");
  totalDiv.className = "grid grid-cols-2 gap-2 mt-4 px-2";
  totalDiv.innerHTML = `
    <p class="font-bold">Total</p>
    <p class="font-bold text-violet-600">$<span id="grand-total">0000</span></p>
  `;
  budgetWrapper.appendChild(totalDiv);

  budgetDiv.appendChild(budgetWrapper);

  sidebar.appendChild(selectedDiv);
  sidebar.appendChild(budgetDiv);

  // --- Restore input values ---
  document.getElementById('player-salary').value = playerSalary;
  document.getElementById('manager-salary').value = managerSalary;
  document.getElementById('coach-salary').value = coachSalary;
  document.getElementById('player-expense').textContent = playerExpense;
  document.getElementById('grand-total').textContent = grandTotal;

  // --- Setup calculator events ---
  setupBudgetCalculator(selectedPlayers);
}