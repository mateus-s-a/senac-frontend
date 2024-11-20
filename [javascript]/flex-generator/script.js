const alignItemsSelect = document.getElementById("align-items-select");
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



function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Código copiado para a área de transferência.");
    }).catch((err) => {
        console.error("Erro ao copiar texto: ", err);
    });
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