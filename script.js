// Function to add a string to the unit list and other sections
function addString(playerNumber) {
    let inputField, listElement, stringId;

    // Determine which player's elements to target
    if (playerNumber === 1) {
        inputField = document.getElementById("inputString1");
        listElement = document.getElementById("stringList1");
        stringId = "string-" + listElement.children.length + "-1";
    } else {
        inputField = document.getElementById("inputString2");
        listElement = document.getElementById("stringList2");
        stringId = "string-" + listElement.children.length + "-2";
    }

    // Get the input value and trim whitespace
    const inputValue = inputField.value.trim();

    if (inputValue) {
        // Create a new list item for the unit list
        const listItem = document.createElement("li");
        listItem.className = "string-item"; // Apply styling class
        listItem.id = stringId; // Assign unique ID

        const label = document.createElement("span");
        label.textContent = inputValue; // Set the text of the unit

        // Create a remove button for the unit
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove"; // Button label
        removeButton.onclick = function () { removeString(stringId, playerNumber); }; // Attach click event

        // Append the label and button to the list item
        listItem.appendChild(label);
        listItem.appendChild(removeButton);
        // Add the list item to the unit list
        listElement.appendChild(listItem);

        // Add the unit to all other phase sections
        addToSection(stringId, inputValue, playerNumber);

        // Clear the input field after adding
        inputField.value = "";
    } else {
        alert("Please enter a valid string."); // Show alert if input is invalid
    }
}

// Function to add the string to different phase sections
function addToSection(stringId, inputValue, playerNumber) {
    // Define all phase sections
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    sections.forEach(section => {
        // Get the list for the specific section
        const sectionList = document.getElementById(`${section}List${playerNumber}`);
        const sectionItem = document.createElement("li"); // Create list item
        sectionItem.className = "string-item"; // Apply styling class
        sectionItem.id = `${stringId}-${section}`; // Assign unique ID for the section

        const label = document.createElement("span");
        label.textContent = inputValue; // Set the text of the unit

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"; // Create a checkbox
        checkbox.id = `${stringId}-${section}-checkbox`; // Assign unique ID for checkbox

        // Append the checkbox and label to the list item
        sectionItem.appendChild(checkbox);
        sectionItem.appendChild(label);
        // Add the list item to the section list
        sectionList.appendChild(sectionItem);
    });
}

// Function to remove a string from all lists
function removeString(stringId, playerNumber) {
    // Remove from the unit list
    const unitList = document.getElementById(`stringList${playerNumber}`);
    const unitItem = document.getElementById(stringId);
    unitList.removeChild(unitItem); // Remove the unit item

    // Remove from all phase sections
    const sections = ['command', 'movement', 'shooting', 'charge', 'fight'];
    sections.forEach(section => {
        const sectionList = document.getElementById(`${section}List${playerNumber}`);
        const sectionItem = document.getElementById(`${stringId}-${section}`);
        if (sectionItem) {
            sectionList.removeChild(sectionItem); // Remove the item from the section
        }
    });
}
