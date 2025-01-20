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

        const label = document.createElement("span");
        label.textContent = inputValue;

        // Add remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () { removeString(stringId, playerNumber); };

        listItem.appendChild(label);
        listItem.appendChild(removeButton);
        listElement.appendChild(listItem);

        // Add to other sections with checkboxes
        addToSection(stringId, inputValue, playerNumber);

        inputField.value = ""; // Clear input field
    } else {
        alert("Please enter a valid string.");
    }
}

function addToSection(stringId, inputValue, playerNumber) {
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    sections.forEach(section => {
        const sectionList = document.getElementById(`${section}List${playerNumber}`);
        const sectionItem = document.createElement("li");
        sectionItem.className = "string-item";
        sectionItem.id = `${stringId}-${section}`;

        const label = document.createElement("span");
        label.textContent = inputValue;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `${stringId}-${section}-checkbox`;

        sectionItem.appendChild(checkbox);
        sectionItem.appendChild(label);
        sectionList.appendChild(sectionItem);
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
