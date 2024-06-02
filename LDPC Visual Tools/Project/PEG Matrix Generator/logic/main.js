let factors;
let nodes;
let Matrix = [];
let nodes_array = [];
let nodes_copy = [];
let factors_array = [];
let factors_copy = [];
let lock = false;
function flow () {
    document.getElementById("graph-view-section").style.display = 'block';
    Matrix = [];
    nodes_array = [];
    nodes_copy = [];
    factors_array = [];
    factors_copy = [];
    lock = false;
    nodes = 0;
    factors = 0;
    getArray(FileContent);
    let sum_n = 0;
    let sum_f = 0;
    let algorithm = document.getElementById("algorithm-select").value;
    for (let i = 0; i < nodes_array.length; i++) {
        sum_n += nodes_array[i];
    }
    for (let i = 0; i < factors_array.length; i++) {
        sum_f += factors_array[i];
    }
    if (sum_f != sum_n || Math.max(...factors_array) > nodes || Math.max(...nodes_array) > factors) {
        alert("The node and factor bonds have a number discrepancy!");
        console.log("The input has a different degree count for nodes and factors");
        return false;
    } else {
        cleanGraph();
        console.clear();
        handleLargeSet(nodes);
        handleLargeSet(factors);
        getBaseMatrix(factors_array.length, nodes_array.length);
        if(algorithm == "greedy") {
            getMatrixGreedy(nodes_array, factors_array);
        } else if (algorithm == "greedy-sort-asc") {
            factors_array.sort((a, b) => a - b);
            nodes_array.sort((a, b) => a - b);
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixGreedy(nodes_array, factors_array);
        } else if (algorithm == "greedy-sort-dsc") {
            factors_array.sort((a, b) => b - a);
            nodes_array.sort((a, b) => b - a);
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixGreedy(nodes_array, factors_array);
        } else if (algorithm == "greedy-f-asc-n-dsc") {
            factors_array.sort((a, b) => a - b);
            nodes_array.sort((a, b) => b - a);
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixGreedy(nodes_array, factors_array);
        } else if (algorithm == "greedy-f-dsc-n-asc") {
            factors_array.sort((a, b) => b - a);
            nodes_array.sort((a, b) => a - b);
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixGreedy(nodes_array, factors_array);
        } else if (algorithm == "asc-sort-on-step") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixAscSortOnStep(nodes_array, factors_array);
        } else if (algorithm == "dsc-sort-on-step") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixDscSortOnStep(nodes_array, factors_array);
        } else if (algorithm == "flip-sort-on-step-asc") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixFlipSortOnStep(nodes_array, factors_array, 0);
        } else if (algorithm == "flip-sort-on-step-dsc") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixFlipSortOnStep(nodes_array, factors_array, 1);
        } else if (algorithm == "half-sort-on-step") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixHalfSortOnStep(nodes_array, factors_array);
        } else if (algorithm == "tanner-greedy") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixTannerGreedy(nodes_array, factors_array);
        } else if (algorithm == "tanner-greedy-sorted-dsc") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            factors_array.sort((a, b) => b - a);
            nodes_array.sort((a, b) => b - a);
            getMatrixTannerGreedy(nodes_array, factors_array);
        } else if (algorithm == "tanner-greedy-sorted-asc") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            factors_array.sort((a, b) => a - b);
            nodes_array.sort((a, b) => a - b);
            getMatrixTannerGreedy(nodes_array, factors_array);
        } else if (algorithm == "random") {
            factors_copy = [...factors_array];
            nodes_copy = [...nodes_array];
            getMatrixRandom(nodes_array, factors_array);
        }
        else {
            alert("ERROR");
            console.log("There was a failure choosing the algorithm from the list");
            return false;
        }
        checkOverlap(nodes_copy, factors_copy);
        displayMatrix(factors, nodes, Matrix);
        lock = true;
        if (factors < 100 && nodes < 100) {
            viewGraph();
            document.getElementById("graph-view-section").style.display = 'none';
        }
    }
}

function viewGraph() {
    if (lock == false) {
        alert("No valid matrix has been provided");
        console.log("No valid matrix has been provided");
        return false;
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