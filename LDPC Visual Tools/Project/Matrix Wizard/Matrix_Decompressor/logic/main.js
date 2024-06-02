let factors;
let nodes;
let Matrix = [];
let lock = false;
function flow() {
    lock = false;
    cleanGraph();
    getMatrix(FileContent);
    handleLargeSet(nodes);
    handleLargeSet(factors);
    displayMatrix(factors, nodes, Matrix);
    lock = true;
}
function viewGraph() {
    if (lock == false) {
        alert("No valid matrix has been provided");
        //return false;
    }
    cleanGraph();
    drawCircle(nodes);
    drawSquare(factors);
    for (let i = 0; i < factors; i++) {
        for (let j = 0; j < nodes; j++) {
            if(Matrix[i][j] == 1) {
                drawLine(j, i, "black");
                addBond(j, i);
            }
        }
    }
}