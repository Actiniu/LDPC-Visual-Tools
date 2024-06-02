function cleanGraph() {
    let circlesContainer = document.getElementById('circles-container');
    let squaresContainer = document.getElementById('squares-container');
    let linesContainer = document.getElementById('lines-container');
    let outlineContainer = document.getElementById('outline-container');
    let container = document.getElementById('shapes-container');

    while (circlesContainer.firstChild) {
        circlesContainer.removeChild(circlesContainer.firstChild);
    }
    while (squaresContainer.firstChild) {
        squaresContainer.removeChild(squaresContainer.firstChild);
    }
    while (linesContainer.firstChild) {
        linesContainer.removeChild(linesContainer.firstChild);
    }
    while (outlineContainer.firstChild) {
        outlineContainer.removeChild(outlineContainer.firstChild);
    }
    container.style.width = "100%";
}

function cleanValues () {
    let matrix_clean = document.getElementById("matrix-list");
    while (matrix_clean.options.length > 0) {
        matrix_clean.remove(0); 
    }
    factors = null;
    nodes = null;
    H_Matrix = [];
    E_Matrix = [];
    S_Matrix = [];
    index = null;
    repeat = null;
    hideEMatrix = null;
    hideSMatrix = null;
    document.getElementById("E-Matrix-display").innerHTML = '';
    document.getElementById("S-Matrix-display-one").innerHTML = '';
    document.getElementById("S-Matrix-display-two").innerHTML = '';
    document.getElementById("x-shift").value = '';
    document.getElementById("y-shift").value = '';
    document.getElementById("steps-shift").value = '';
}