function addString(playerNumber) {
    let inputField, listElement, stringId;
    if (playerNumber === 1) {
        inputField = document.getElementById("inputString1");
        listElement = document.getElementById("stringList1");
        stringId = "string-" + listElement.children.length + "-1";
    } else {
        inputField = document.getElementById("inputString2");
        listElement = document.getElementById("stringList2");
        stringId = "string-" + listElement.children.length + "-2";
    }

    const inputValue = inputField.value.trim();

    if (inputValue) {
        // Create string item for Unit List
        const listItem = document.createElement("li");
        listItem.className = "string-item";
        listItem.id = stringId;

        // Create container for unit info
        const unitInfoContainer = document.createElement("div");
        unitInfoContainer.style.display = "flex";
        unitInfoContainer.style.alignItems = "center";
        unitInfoContainer.style.gap = "10px";
        unitInfoContainer.style.flex = "1";

        const label = document.createElement("span");
        label.textContent = inputValue;

        // Create health control container
        const healthContainer = document.createElement("div");
        healthContainer.className = "health-controls";
        healthContainer.style.display = "flex";
        healthContainer.style.alignItems = "center";
        healthContainer.style.gap = "5px";

        const healthInput = document.createElement("input");
        healthInput.type = "number";
        healthInput.value = "100";
        healthInput.min = "0";
        healthInput.max = "100";
        healthInput.style.width = "60px";
        healthInput.onchange = function() {
            updateUnitHealth(stringId, this.value);
        };

        const healthLabel = document.createElement("span");
        healthLabel.textContent = "HP";

        // Create kills counter container
        const killsContainer = document.createElement("div");
        killsContainer.className = "kills-counter";
        killsContainer.style.display = "flex";
        killsContainer.style.alignItems = "center";
        killsContainer.style.gap = "5px";

        const killsCount = document.createElement("span");
        killsCount.textContent = "0";
        killsCount.id = `${stringId}-kills`;
        killsCount.style.minWidth = "20px";
        killsCount.style.textAlign = "center";

        const killsLabel = document.createElement("span");
        killsLabel.textContent = "Kills";

        const subtractKillButton = document.createElement("button");
        subtractKillButton.textContent = "-";
        subtractKillButton.style.padding = "2px 8px";
        subtractKillButton.onclick = function() {
            decrementKills(stringId);
        };

        const addKillButton = document.createElement("button");
        addKillButton.textContent = "+";
        addKillButton.style.padding = "2px 8px";
        addKillButton.onclick = function() {
            incrementKills(stringId);
        };

        // Add remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () { removeString(stringId, playerNumber); };

        // Assemble the components
        healthContainer.appendChild(healthInput);
        healthContainer.appendChild(healthLabel);
        killsContainer.appendChild(killsLabel);
        killsContainer.appendChild(subtractKillButton);
        killsContainer.appendChild(killsCount);
        killsContainer.appendChild(addKillButton);
        
        unitInfoContainer.appendChild(label);
        unitInfoContainer.appendChild(healthContainer);
        unitInfoContainer.appendChild(killsContainer);
        
        listItem.appendChild(unitInfoContainer);
        listItem.appendChild(removeButton);
        listElement.appendChild(listItem);

        // Add to other sections with checkboxes
        addToSection(stringId, inputValue, playerNumber);

        inputField.value = ""; // Clear input field
    } else {
        alert("Please enter a valid string.");
    }
}
function decrementKills(stringId) {
    const mainKillsDisplay = document.getElementById(`${stringId}-kills`);
    let currentKills = parseInt(mainKillsDisplay.textContent);
    currentKills = Math.max(0, currentKills - 1); // Prevent negative kills
    mainKillsDisplay.textContent = currentKills;

    // Update kills in all sections
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    sections.forEach(section => {
        const killsDisplay = document.getElementById(`${stringId}-${section}-kills`);
        if (killsDisplay) {
            killsDisplay.textContent = `Kills: ${currentKills}`;
        }
    });
}
function addToSection(stringId, inputValue, playerNumber) {
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    sections.forEach(section => {
        const sectionList = document.getElementById(`${section}List${playerNumber}`);
        const sectionItem = document.createElement("li");
        sectionItem.className = "string-item";
        sectionItem.id = `${stringId}-${section}`;

        // Create container for checkbox and label
        const checkboxContainer = document.createElement("div");
        checkboxContainer.style.display = "flex";
        checkboxContainer.style.alignItems = "center";
        checkboxContainer.style.gap = "10px";
        checkboxContainer.style.flex = "1";

        const label = document.createElement("span");
        label.textContent = inputValue;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `${stringId}-${section}-checkbox`;

        // Add health display
        const healthDisplay = document.createElement("span");
        healthDisplay.className = "health-display";
        healthDisplay.textContent = "HP: 100";
        healthDisplay.id = `${stringId}-${section}-health`;

        // Add kills display
        const killsDisplay = document.createElement("span");
        killsDisplay.className = "kills-display";
        killsDisplay.textContent = "Kills: 0";
        killsDisplay.id = `${stringId}-${section}-kills`;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(healthDisplay);
        checkboxContainer.appendChild(killsDisplay);
        sectionItem.appendChild(checkboxContainer);
        sectionList.appendChild(sectionItem);
    });
}

function incrementKills(stringId) {
    const mainKillsDisplay = document.getElementById(`${stringId}-kills`);
    let currentKills = parseInt(mainKillsDisplay.textContent);
    currentKills++;
    mainKillsDisplay.textContent = currentKills;

    // Update kills in all sections
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    sections.forEach(section => {
        const killsDisplay = document.getElementById(`${stringId}-${section}-kills`);
        if (killsDisplay) {
            killsDisplay.textContent = `Kills: ${currentKills}`;
        }
    });
}

// Keep existing functions
function updateUnitHealth(stringId, newHealth) {
    const healthValue = Math.max(0, Math.min(100, parseInt(newHealth)));
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    
    sections.forEach(section => {
        const healthDisplay = document.getElementById(`${stringId}-${section}-health`);
        if (healthDisplay) {
            healthDisplay.textContent = `HP: ${healthValue}`;
        }
    });
}

function endTurn() {
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    [1, 2].forEach(playerNumber => {
        sections.forEach(section => {
            const sectionList = document.getElementById(`${section}List${playerNumber}`);
            const checkboxes = sectionList.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        });
    });
}

function removeString(stringId, playerNumber) {
    // Remove from Unit List
    const unitList = document.getElementById(`stringList${playerNumber}`);
    const unitItem = document.getElementById(stringId);
    unitList.removeChild(unitItem);

    // Remove from all sections
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    sections.forEach(section => {
        const sectionList = document.getElementById(`${section}List${playerNumber}`);
        const sectionItem = document.getElementById(`${stringId}-${section}`);
        if (sectionItem) {
            sectionList.removeChild(sectionItem);
        }
    });
}
// Collapsible button 
document.addEventListener('DOMContentLoaded', function() {
    const collapseButtons = document.querySelectorAll('.collapse-btn');
    
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.parentElement.nextElementSibling;
            const isCollapsed = content.classList.contains('collapsed');
            
            // Toggle the collapsed state
            content.classList.toggle('collapsed');
            
            // Update the button text
            this.textContent = isCollapsed ? '-' : '+';
        });
    });
});
// Keep the end turn button setup
document.addEventListener('DOMContentLoaded', () => {
    const endTurnButton = document.createElement('button');
    endTurnButton.textContent = 'End Turn';
    endTurnButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000; width: auto; padding: 15px 30px;';
    endTurnButton.onclick = endTurn;
    document.body.appendChild(endTurnButton);
});