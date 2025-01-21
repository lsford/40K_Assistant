// Namespace for the game tracker functionality
const GameTracker = {
    // Add a string/unit to the player's lists
    addString(playerNumber) {
        const inputField = document.getElementById(`inputString${playerNumber}`);
        const listElement = document.getElementById(`stringList${playerNumber}`);
        const inputValue = inputField.value.trim();
        const stringId = `string-${listElement.children.length}-${playerNumber}`;

        if (!inputValue) {
            alert("Please enter a valid string.");
            return;
        }

        // Create and add the main unit list item
        this.createMainListItem(stringId, inputValue, listElement, playerNumber);
        
        // Add to other sections
        this.addToSections(stringId, inputValue, playerNumber);

        // Clear input field
        inputField.value = "";
    },

    // Create the main list item with health and kills tracking
    createMainListItem(stringId, inputValue, listElement, playerNumber) {
        const listItem = document.createElement("li");
        listItem.className = "string-item";
        listItem.id = stringId;

        const unitInfoContainer = this.createUnitInfoContainer(stringId, inputValue);
        const removeButton = this.createRemoveButton(stringId, playerNumber);

        listItem.appendChild(unitInfoContainer);
        listItem.appendChild(removeButton);
        listElement.appendChild(listItem);
    },

    // Create the container for unit information
    createUnitInfoContainer(stringId, inputValue) {
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.gap = "10px";
        container.style.flex = "1";

        const label = document.createElement("span");
        label.textContent = inputValue;

        const healthContainer = this.createHealthContainer(stringId);
        const killsContainer = this.createKillsContainer(stringId);

        container.appendChild(label);
        container.appendChild(healthContainer);
        container.appendChild(killsContainer);

        return container;
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
        label.textContent = "HP";

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

    // Add the unit to all game sections
    addToSections(stringId, inputValue, playerNumber) {
        const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
        sections.forEach(section => {
            const sectionList = document.getElementById(`${section}List${playerNumber}`);
            const sectionItem = this.createSectionItem(stringId, inputValue, section);
            sectionList.appendChild(sectionItem);
        });
    },

    // Create an item for a game section
    createSectionItem(stringId, inputValue, section) {
        const item = document.createElement("li");
        item.className = "string-item";
        item.id = `${stringId}-${section}`;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.gap = "10px";
        container.style.flex = "1";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `${stringId}-${section}-checkbox`;

        const label = document.createElement("span");
        label.textContent = inputValue;

        const healthDisplay = document.createElement("span");
        healthDisplay.className = "health-display";
        healthDisplay.id = `${stringId}-${section}-health`;
        healthDisplay.textContent = "HP: 100";

        const killsDisplay = document.createElement("span");
        killsDisplay.className = "kills-display";
        killsDisplay.id = `${stringId}-${section}-kills`;
        killsDisplay.textContent = "Kills: 0";

        container.append(checkbox, label, healthDisplay, killsDisplay);
        item.appendChild(container);
        return item;
    },

    // Create remove button
    createRemoveButton(stringId, playerNumber) {
        const button = document.createElement("button");
        button.textContent = "Remove";
        button.onclick = () => this.removeString(stringId, playerNumber);
        return button;
    },

    // Update unit health across all sections
    updateUnitHealth(stringId, newHealth) {
        const healthValue = Math.max(0, Math.min(100, parseInt(newHealth)));
        const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
        sections.forEach(section => {
            const display = document.getElementById(`${stringId}-${section}-health`);
            if (display) {
                display.textContent = `HP: ${healthValue}`;
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

        const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
        sections.forEach(section => {
            const display = document.getElementById(`${stringId}-${section}-kills`);
            if (display) {
                display.textContent = `Kills: ${kills}`;
            }
        });
    },

    // Remove a unit from all lists
    removeString(stringId, playerNumber) {
        document.getElementById(stringId)?.remove();
        const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
        sections.forEach(section => {
            document.getElementById(`${stringId}-${section}`)?.remove();
        });
    },

    // End turn functionality
    endTurn() {
        [1, 2].forEach(playerNumber => {
            const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
            sections.forEach(section => {
                const list = document.getElementById(`${section}List${playerNumber}`);
                const checkboxes = list.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => checkbox.checked = false);
            });
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

    // Create and setup end turn button
    const endTurnButton = document.createElement('button');
    endTurnButton.textContent = 'End Turn';
    endTurnButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000; width: auto; padding: 15px 30px;';
    endTurnButton.onclick = () => GameTracker.endTurn();
    document.body.appendChild(endTurnButton);
});