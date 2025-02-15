// Namespace for the game tracker functionality
const GameTracker = {
  // Add a string/unit to the player's lists
  addString(playerNumber) {
    const inputField = document.getElementById(`inputString${playerNumber}`);
    const inputValue = inputField.value.trim();
    const stringId = `string-${Date.now()}-${playerNumber}`;
    if (!inputValue) {
      alert("Please enter a valid string.");
      return;
    }
    // Add to all sections
    this.addToSections(stringId, inputValue, playerNumber);
    // Clear input field
    inputField.value = "";
  },
  // Add the unit to all game sections
  addToSections(stringId, inputValue, playerNumber) {
    const sections = ['stringList', 'commandList', 'movementList', 'shootingList', 'chargeList', 'fightList'];
    sections.forEach(section => {
      const sectionList = document.getElementById(`${section}${playerNumber}`);
      const sectionItem = this.createSectionItem(stringId, inputValue, section, playerNumber);
      sectionList.appendChild(sectionItem);
    });
  },
  // Create an item for a game section
  createSectionItem(stringId, inputValue, section, playerNumber) {
    const item = document.createElement("li");
    item.className = "string-item";
    item.id = `${stringId}-${section}`;
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";
    container.style.flex = "1";
    const label = document.createElement("span");
    label.textContent = inputValue;
    container.appendChild(label);

    // Add specific checkboxes and fields based on section
    if (section === 'stringList') {
      const healthContainer = this.createHealthContainer(stringId);
      const killsContainer = this.createKillsContainer(stringId);
      container.appendChild(healthContainer);
      container.appendChild(killsContainer);
      // Add remove button only in the Unit List section
      const removeButton = this.createRemoveButton(stringId, playerNumber);
      container.appendChild(removeButton);
    } else if (section === 'commandList') {
      const battleshockCheckbox = this.createCheckbox(`${stringId}-battleshock`, 'Battleshock Test');
      const armyRuleCheckbox = this.createCheckbox(`${stringId}-armyrule`, 'Army Rule');
      container.appendChild(battleshockCheckbox);
      container.appendChild(armyRuleCheckbox);
    } else if (section === 'movementList') {
      const advanceCheckbox = this.createCheckbox(`${stringId}-advance`, 'Advance');
      const moveCheckbox = this.createCheckbox(`${stringId}-move`, 'Move');
      const fallbackCheckbox = this.createCheckbox(`${stringId}-fallback`, 'Fallback');
      container.appendChild(advanceCheckbox);
      container.appendChild(moveCheckbox);
      container.appendChild(fallbackCheckbox);
    } else if (section === 'shootingList') {
      const hitRollCheckbox = this.createCheckbox(`${stringId}-hitroll`, 'Hit Roll');
      const woundRollCheckbox = this.createCheckbox(`${stringId}-woundroll`, 'Wound Roll');
      container.appendChild(hitRollCheckbox);
      container.appendChild(woundRollCheckbox);
    } else if (section === 'chargeList') {
      const chargedCheckbox = this.createCheckbox(`${stringId}-charged`, 'Charged');
      container.appendChild(chargedCheckbox);
    } else if (section === 'fightList') {
      const fightCheckbox = this.createCheckbox(`${stringId}-fight`, 'Fight');
      container.appendChild(fightCheckbox);
    }

    item.appendChild(container);
    return item;
  },
  // Create a checkbox element
  createCheckbox(id, labelText) {
    const checkboxContainer = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    return checkboxContainer;
  },
  // Create health tracking container
  createHealthContainer(stringId) {
    const container = document.createElement("div");
    container.className = "health-controls";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "5px";
    const input = document.createElement("input");
    input.type = "number";
    input.value = "100";
    input.min = "0";
    input.max = "100";
    input.style.width = "60px";
    input.onchange = () => this.updateUnitHealth(stringId, input.value);
    const label = document.createElement("span");
    label.textContent = "Wounds";
    container.appendChild(input);
    container.appendChild(label);
    return container;
  },
  // Create kills tracking container
  createKillsContainer(stringId) {
    const container = document.createElement("div");
    container.className = "kills-counter";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "5px";
    const label = document.createElement("span");
    label.textContent = "Kills";
    const subtractBtn = document.createElement("button");
    subtractBtn.textContent = "-";
    subtractBtn.style.padding = "2px 8px";
    subtractBtn.onclick = () => this.decrementKills(stringId);
    const count = document.createElement("span");
    count.id = `${stringId}-kills`;
    count.textContent = "0";
    count.style.minWidth = "20px";
    count.style.textAlign = "center";
    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.style.padding = "2px 8px";
    addBtn.onclick = () => this.incrementKills(stringId);
    container.append(label, subtractBtn, count, addBtn);
    return container;
  },
  // Create remove button
  createRemoveButton(stringId, playerNumber) {
    const button = document.createElement("button");
    button.textContent = "Remove Unit";
    button.onclick = () => this.removeString(stringId, playerNumber);
    return button;
  },
  // Update unit health across all sections
  updateUnitHealth(stringId, newHealth) {
    const healthValue = Math.max(0, Math.min(100, parseInt(newHealth)));
    const sections = ['commandList', 'movementList', 'shootingList', 'chargeList', 'fightList'];
    sections.forEach(section => {
      const display = document.getElementById(`${stringId}-${section}-health`);
      if (display) {
        display.textContent = `Wounds: ${healthValue}`;
      }
    });
  },
  // Increment kills counter
  incrementKills(stringId) {
    const display = document.getElementById(`${stringId}-kills`);
    let kills = parseInt(display.textContent) + 1;
    this.updateKillsDisplays(stringId, kills);
  },
  // Decrement kills counter
  decrementKills(stringId) {
    const display = document.getElementById(`${stringId}-kills`);
    let kills = Math.max(0, parseInt(display.textContent) - 1);
    this.updateKillsDisplays(stringId, kills);
  },
  // Update kills displays across all sections
  updateKillsDisplays(stringId, kills) {
    const mainDisplay = document.getElementById(`${stringId}-kills`);
    mainDisplay.textContent = kills;
    const sections = ['commandList', 'movementList', 'shootingList', 'chargeList', 'fightList'];
    sections.forEach(section => {
      const display = document.getElementById(`${stringId}-${section}-kills`);
      if (display) {
        display.textContent = `Kills: ${kills}`;
      }
    });
  },
  // Remove a unit from all lists
  removeString(stringId, playerNumber) {
    document.getElementById(`${stringId}-stringList`)?.remove();
    const sections = ['commandList', 'movementList', 'shootingList', 'chargeList', 'fightList'];
    sections.forEach(section => {
      document.getElementById(`${stringId}-${section}`)?.remove();
    });
  },
  // End turn functionality
  endTurn(playerNumber) {
    const sections = ['commandList', 'movementList', 'shootingList', 'chargeList', 'fightList'];
    sections.forEach(section => {
      const list = document.getElementById(`${section}${playerNumber}`);
      const checkboxes = list.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);
    });
  }
};

// Initialize event listeners when the document loads
document.addEventListener('DOMContentLoaded', () => {
  // Setup collapsible sections
  document.querySelectorAll('.collapse-btn').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.parentElement.nextElementSibling;
      const isCollapsed = content.classList.toggle('collapsed');
      this.textContent = isCollapsed ? '+' : '-';
    });
  });
});