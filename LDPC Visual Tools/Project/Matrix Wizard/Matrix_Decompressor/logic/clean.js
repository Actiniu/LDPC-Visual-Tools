function cleanGraph() {
    let circlesContainer = document.getElementById('circles-container');
    let squaresContainer = document.getElementById('squares-container');
    let linesContainer = document.getElementById('lines-container');
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
    container.style.width = "100%";
}
