let factors;
let nodes;
let H_Matrix = [];
let E_Matrix = [];
let S_Matrix = [];
let lock = false;
let index;
let repeat;
function initialFlow() {
    if (lock == true) {
        alert("Warning! This will erase all the shifts and reconstruct the graph and matrix as inputed above! If you are sure, please press Run again");
        lock = false;
        return false;
    }
    cleanGraph();
    cleanValues();
    repeat = document.getElementById("repeat-pattern").value;
    if(H_MatrixExists == false) {
        alert("No file has been provided!");
        return false;
    }
    if (!getHMatrix(H_MatrixContent)) {
        alert("Incorrect data provided!");
        return false;
    }
    displayMatrix(factors, nodes, H_Matrix);
    if (repeat > 1) {
        getExtendedMatrix(factors, nodes, H_Matrix, repeat);
        displayExtendedMatrix(factors*repeat, nodes*repeat, E_Matrix);
    }
    document.getElementById("matrix-container").style.overflowX = 'auto';
    document.body.style.overflowX = 'auto'; 
    if (repeat > 1) {
        drawGraph(factors, nodes, E_Matrix, 0);
        addExportOption(0);
    } else {
        drawCircle(nodes, 1, 0);
        drawSquare(factors, 1, 0);
        for (let i = 0; i < factors; i++) {
            for (let j = 0; j < nodes; j++) {
                if(H_Matrix[i][j] == 1) {
                    drawLine(j, i, "black");
                    addBond(j, i);
                    //console.log("Draw between circle " + (j) + " and square " + (i));
                }
            }
        }
    }
    document.getElementById("shift-panel").style.display = 'block';
    index = 0;
}
function initiateShift() {
    lock = true;
    repeat = document.getElementById("repeat-pattern").value;
    hideEMatrix = document.getElementById("hide-e-matrix").checked;
    hideSMatrix = document.getElementById("hide-s-matrix").checked;
    let node_shift = parseInt(document.getElementById("x-shift").value) - 1;
    let factor_shift = parseInt(document.getElementById("y-shift").value) - 1;
    let steps_shift = parseInt(document.getElementById("steps-shift").value);
    if (checkShift(factors, nodes, index) == true) {
        displayShiftedMatrixOne(factors*repeat, nodes*repeat, S_Matrix, index, hideSMatrix);
        index++;
        getShiftedMatrix(factors, nodes, S_Matrix, factor_shift, node_shift, steps_shift*factors, repeat, index);
        addExportOption(index);
        displayShiftedMatrixTwo(factors*repeat, nodes*repeat, S_Matrix, index, hideSMatrix);
        drawGraph(factors, nodes, S_Matrix, index);
    }
}