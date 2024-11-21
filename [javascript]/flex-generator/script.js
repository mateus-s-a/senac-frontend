const MAX_BOXES = 6;

const addBoxButton = document.getElementById("add-box");
const alignItemsSelect = document.getElementById("align-items-select");
const boxColors = ['#FF0000', '#008000', '#0000FF', '#FFFF00', '#00FFFF', '#800080'];
const canvas = document.getElementById("canvas");
const copyCssButton = document.getElementById("copy-css");
const copyHtmlButton = document.getElementById("copy-html");
const cssCode = document.querySelector("#css-code pre");
const directionSelect = document.getElementById("direction-select");
const displaySelect = document.getElementById("display-select");
const flexControls = document.getElementById("flex-controls");
const gridControls = document.getElementById("grid-controls");
const gridColumnsInput = document.getElementById("grid-columns");
const gridRowsInput = document.getElementById("grid-rows");
const htmlCode = document.querySelector("#html-code pre");
const justifyContentSelect = document.getElementById("justify-content-select");
const saveSnippetButton = document.getElementById("save-snippet");
const snippetsList = document.getElementById("snippets-list");
const toggleGrid = document.getElementById("toggle-grid");

// const boxes = canvas.querySelectorAll(".box");



function addBox() {
    const canvas = document.getElementById("canvas");
    const bxs = document.querySelectorAll(".box");

    if (bxs.length >= MAX_BOXES) {
        showMessage("Limite máximo de blocos atingido!");
        return;
    }

    const nextNumber = bxs.length + 1;
    console.log(nextNumber);
    console.log(typeof(nextNumber));

    const newBox = document.createElement("div");
    newBox.classList.add("box", "fade-in");
    newBox.style.backgroundColor = boxColors[(nextNumber - 1) % boxColors.length];
    newBox.textContent = nextNumber;

    const closeButton = document.createElement("span");
    closeButton.textContent = "×";
    closeButton.classList.add("close-button");
    newBox.appendChild(closeButton);

    canvas.appendChild(newBox);
    
    setTimeout(() => {
        newBox.classList.remove("fade-in");
    }, 500);

}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Código copiado para a área de transferência.");
    }).catch((err) => {
        console.error("Erro ao copiar texto: ", err);
    });
}

function removeBox(event) {
    const box = event.target.parentElement;

    box.classList.add("fade-out");

    setTimeout(() => {
        canvas.removeChild(box);
        updateBoxes();
    }, 500);
}

function showMessage(message) {
    let messageBox = document.getElementById("messa-box");
    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "message-box";
        document.body.appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

function toggleFlexControls() {
    if (displaySelect.value === "flex") {
        flexControls.style.display = "flex";
    } else {
        flexControls.style.display = "none";
        canvas.style.justifyContent = "";
        canvas.style.alignItems = "";
    }
    updateDisplay();
}

function toggleGridControls() {
    if (displaySelect.value === "grid") {
        gridControls.style.display = "flex";
    } else {
        gridControls.style.display = "none";
        canvas.style.gridTemplateColumns = "";
        canvas.style.gridTemplateRows = "";
    }
    updateDisplay();
}

function updateBoxes() {
    const bxs = document.querySelectorAll(".box");
    bxs.forEach((box, index) => {
        const newNumber = index + 1;
        console.log(index);
        box.textContent = newNumber;
        box.style.backgroundColor = boxColors[(newNumber - 1) % boxColors.length];

        const closeButton = document.createElement("span");
        closeButton.textContent = "×";
        closeButton.classList.add("close-button");
        box.appendChild(closeButton);
    });
}

function updateDisplay() {
    const displayValue = displaySelect.value;
    const justifyContent = canvas.style.justifyContent || "initial";
    const alignItems = canvas.style.alignItems || "initial";
    const gridColumns = canvas.style.gridTemplateColumns || "none";
    const gridRows = canvas.style.gridTemplateRows || "none";

    canvas.style.display = displayValue;

    cssCode.textContent = `#canvas {
    display: ${displayValue};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    grid-template-columns: ${gridColumns};
    grid-template-rows: ${gridRows};
}`;

    htmlCode.textContent = `
<section id="canvas">
    <div class="box" id="box1">1</div>
    <div class="box" id="box2">2</div>
    <div class="box" id="box3">3</div>
</section>`;
}

function updateFlexProperties() {
    if (canvas.style.display === "flex") {
        canvas.style.justifyContent = justifyContentSelect.value;
        canvas.style.alignItems = alignItemsSelect.value;

        cssCode.textContent = `#canvas {
    display: flex;
    justify-content: ${justifyContentSelect.value};
    align-items: ${alignItemsSelect.value};
}`;
    }
}

function updateGridProperties() {
    if (canvas.style.display === "grid") {
        const columns = gridColumnsInput.value.trim();
        const rows = gridRowsInput.value.trim();

        canvas.style.gridTemplateColumns = columns || "auto";
        canvas.style.gridTemplateRows = rows || "auto";

        cssCode.textContent = `#canvas {
    display: grid;
    grid-template-columns: ${columns || "auto"};
    grid-template-rows: ${rows || "auto"};
}`;
    }
}





document.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-button")) {
        removeBox(event);
    }
})


addBoxButton.addEventListener("click", addBox);


copyCssButton.addEventListener("click", () => {
    const cssCodeText = cssCode.textContent;
    copyToClipboard(cssCodeText);
});


copyHtmlButton.addEventListener("click", () => {
    const htmlCodeText = `
<section id="canvas">
    <div class="box" id="box1">1</div>
    <div class="box" id="box2">2</div>
    <div class="box" id="box3">3</div>
</section>`;
    copyToClipboard(htmlCodeText);
});


directionSelect.addEventListener("change", () => {
    const direction = directionSelect.value;
    canvas.style.flexDirection = direction;

    cssCode.textContent = `#canvas {
    display: flex;
    flex-direction: ${direction};
}`;
});


displaySelect.addEventListener("change", () => {
    toggleFlexControls();
    updateFlexProperties();
});
justifyContentSelect.addEventListener("change", updateFlexProperties);
alignItemsSelect.addEventListener("change", updateFlexProperties);


displaySelect.addEventListener("change", () => {
    toggleGridControls();
    updateGridProperties();
});
gridColumnsInput.addEventListener("input", updateGridProperties);
gridRowsInput.addEventListener("input", updateGridProperties);


saveSnippetButton.addEventListener("click", () => {
    const display = canvas.style.display || "block";
    const justifyContent = canvas.style.justifyContent || "";
    const alignItems = canvas.style.alignItems || "";
    const gridColumns = canvas.style.gridTemplateColumns || "";
    const gridRows = canvas.style.gridTemplateRows || "";

    const snippet = {
        display,
        justifyContent,
        alignItems,
        gridColumns,
        gridRows
    };

    const li = document.createElement("li");
    li.textContent = JSON.stringify(snippet, null, 2);
    snippetsList.appendChild(li);
});


toggleGrid.addEventListener("change", () => {
    if (toggleGrid.checked) {
        canvas.classList.add("grid-active");
    } else {
        canvas.classList.remove("grid-active");
    }
});



toggleFlexControls();
toggleGridControls();