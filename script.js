const payMatrixData = [];
const promotionDateInput = document.getElementById("promotionDate");
const fixationOptionSelect = document.getElementById("fixationOption");
const currentLevelSelect = document.getElementById("currentLevel");
const currentCellSelect = document.getElementById("currentCell");
const promotedLevelSelect = document.getElementById("promotedLevel");
const calculateButton = document.getElementById("calculateBtn");
const newBasicPayDoPDisplay = document.getElementById("newBasicPayDoP");
const nextIncrementDateDoPDisplay = document.getElementById("nextIncrementDateDoP");
const newBasicPayDNIDisplay = document.getElementById("newBasicPayDNI");
const nextIncrementDateDNIDisplay = document.getElementById("nextIncrementDateDNI");
const messageBox = document.getElementById("message-box");
const bestOptionDisplay = document.getElementById("bestOption");

function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = `fixed top-4 left-1/2 transform -translate-x-1/2 bg-${type === 'success' ? 'green' : 'red'}-100 text-${type === 'success' ? 'green' : 'red'}-700 border border-${type === 'success' ? 'green' : 'red'}-400 px-4 py-2 rounded shadow-md`;
    messageBox.classList.add('show');
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
}

function parseCSV(csvText) {
    const lines = csvText.trim().split("\n");
    const header = lines[0].split(",").map(cell => cell.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map(cell => cell.trim());
        const rowData = {};
        header.forEach((key, index) => {
            rowData[key] = row[index];
        });
        data.push(rowData);
    }
    return data;
}

function loadPayMatrix() {
    fetch("./pay_matrix_sikkim.csv")
        .then(response => response.text())
        .then(csvText => {
            const parsedData = parseCSV(csvText);
            // Find unique levels
            const levels = [...new Set(parsedData.map(item => parseInt(item.Level)))].sort((a, b) => a - b);  // Ensure levels are sorted
            levels.forEach(level => {
                currentLevelSelect.add(new Option(level, level));
                promotedLevelSelect.add(new Option(level, level));
            });

            // Populate cells based on the first level initially
            populateCells(currentLevelSelect.value, parsedData);
            payMatrixData.push(...parsedData); // Store the data
        })
        .catch(error => {
            showMessage(`Error loading pay matrix: ${error}`, 'error');
            console.error("Error loading CSV:", error);
        });
}

function populateCells(selectedLevel, matrixData) {
    currentCellSelect.innerHTML = ''; // Clear previous options
    const levelData = matrixData.filter(item => item.Level === selectedLevel.toString());

     if (levelData.length > 0) {
        // Get the keys of the first object in levelData (excluding 'Level')
        const keys = Object.keys(levelData[0]).filter(key => key !== 'Level');
        keys.forEach(key => {
             currentCellSelect.add(new Option(key, key));
        });
    }
}



currentLevelSelect.addEventListener("change", () => {
    populateCells(currentLevelSelect.value, payMatrixData);
});



function findPay(level, cell, matrix) {
    const row = matrix.find(row => row.Level === level.toString());
    if (row) {
        return parseInt(row[cell]);
    }
    return null;
}

function findNextCellPay(level, cell, matrix) {
    const row = matrix.find(row => row.Level === level.toString());
    if (row) {
        const cells = Object.keys(row).filter(key => key !== 'Level');
        const currentCellIndex = cells.indexOf(cell);
        if (currentCellIndex < cells.length - 1) {
            return parseInt(row[cells[currentCellIndex + 1]]);
        }
    }
    return null;
}

function findEqualOrNextHigherPay(level, pay, matrix) {
    const row = matrix.find(row => row.Level === level.toString());
    if (row) {
        const cells = Object.keys(row).filter(key => key !== 'Level');
        let found = null;
        for (let i = 0; i < cells.length; i++) {
            const cellValue = parseInt(row[cells[i]]);
            if (cellValue >= pay) {
                found = cellValue;
                break;
            }
        }
        return found;
    }
    return null;
}

function findNextIncrementDate(date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    if (month >= 1 && month <= 6) {
        return new Date(year, 6, 1);
    } else {
        return new Date(year + 1, 0, 1);
    }
}

function calculatePayFixation() {
    const promotionDate = promotionDateInput.value;
    const fixationOption = fixationOptionSelect.value;
    const currentLevel = currentLevelSelect.value;
    const currentCell = currentCellSelect.value;
    const promotedLevel = promotedLevelSelect.value;

    if (!promotionDate || !currentLevel || !currentCell || !promotedLevel) {
        showMessage("Please fill in all the required fields.", 'error');
        return;
    }

    const promotionDateObj = new Date(promotionDate);

    if (isNaN(promotionDateObj.getTime())) {
        showMessage("Invalid promotion date.", 'error');
        return;
    }

    let newBasicPayDoP = 0;
    let nextIncrementDateDoP = "";
    let newBasicPayDNI = 0;
    let nextIncrementDateDNI = "";
    const currentPay = findPay(currentLevel, currentCell, payMatrixData);

    if (currentPay === null) {
        showMessage("Invalid current level or cell selection.", 'error');
        return;
    }

    // Calculate for DoP
    let incrementedPayDoP = findNextCellPay(currentLevel, currentCell, payMatrixData);
    newBasicPayDoP = findEqualOrNextHigherPay(promotedLevel, incrementedPayDoP, payMatrixData);
    nextIncrementDateDoP = new Date(promotionDateObj.getFullYear() + 1, promotionDateObj.getMonth(), promotionDateObj.getDate());

    // Calculate for DNI
    newBasicPayDNI = findEqualOrNextHigherPay(promotedLevel, currentPay, payMatrixData);
    let nextIncrementDateDNI_temp = findNextIncrementDate(promotionDateObj);
    nextIncrementDateDNI = nextIncrementDateDNI_temp;
    let incrementedPayDNI = findNextCellPay(currentLevel, currentCell, payMatrixData);
    let doublyIncrementedPayDNI = findNextCellPay(currentLevel, incrementedPayDNI, payMatrixData);
    newBasicPayDNI = findEqualOrNextHigherPay(promotedLevel, doublyIncrementedPayDNI, payMatrixData);



    newBasicPayDoPDisplay.textContent = newBasicPayDoP ? `₹${newBasicPayDoP}` : "Not Found";
    nextIncrementDateDoPDisplay.textContent = nextIncrementDateDoP ? nextIncrementDateDoP.toLocaleDateString() : "Not Applicable";
    newBasicPayDNIDisplay.textContent = newBasicPayDNI ? `₹${newBasicPayDNI}` : "Not Found";
    nextIncrementDateDNIDisplay.textContent = nextIncrementDateDNI ? nextIncrementDateDNI.toLocaleDateString() : "Not Applicable";

    // Determine the best option
    if (newBasicPayDoP > newBasicPayDNI) {
        bestOptionDisplay.textContent = "DoP is the best option.";
    } else if (newBasicPayDNI > newBasicPayDoP) {
        bestOptionDisplay.textContent = "DNI is the best option.";
    } else {
        bestOptionDisplay.textContent = "Both options are the same.";
    }
}

// Event Listeners
calculateButton.addEventListener("click", calculatePayFixation);

// Load data and initialize
loadPayMatrix();
