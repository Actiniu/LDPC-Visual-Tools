let factors;
let nodes;
let Matrix = [];
let lock = false;
function flow() {
    getMatrix(FileContent);
    displayMatrix(factors, nodes, Matrix);
    handleLargeSet(nodes);
    handleLargeSet(factors);
    lock = true;
}