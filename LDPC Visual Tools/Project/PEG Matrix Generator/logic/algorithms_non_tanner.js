
function getBaseMatrix(factors, nodes) {
    for (let i = 0; i < factors; i++) {
        Matrix[i] = [];
        for (let j = 0; j < nodes; j++) {
            Matrix[i][j] = 0;
        }
    }
}

function checkOverlap (nodes_copy, factors_copy) {
    let sum_fact = [];
    let sum_node = [];
    for (let i = 0; i < nodes_copy.length; i++) {
        sum_node[i] = 0;
    }
    for (let i = 0; i < factors_copy.length; i++) {
        sum_fact[i] = 0;
        for (let j = 0; j < nodes_copy.length; j++) {
            sum_fact[i] += Matrix[i][j];
            sum_node[j] += Matrix[i][j];
        }
    }
    for (let i = 0; i < factors_copy.length; i++) {
        if (sum_fact[i] != factors_copy[i]) {
            console.log("ALERT at factor " + (i+1) + ": bond could not be assigned!");
        }
    }
    for (let i = 0; i < nodes_copy.length; i++) {
        if (sum_node[i] != nodes_copy[i]) {
            console.log("ALERT at node " + (i+1) + ": bond could not be assigned!");
        }
    }
}

function getMaxValueIndex(array, x) {
    let indices = array.reduce(function(acc, _, index) {
        if (array[index] > 0) {
            acc.push(index);
        }
        return acc;
    }, []);
    indices.sort(function(a, b) {return array[b] - array[a];});
    let topXIndices = indices.slice(0, x);
    return topXIndices;
}

function getMinValueIndex(array, x) {
    let indices = array.reduce(function(acc, _, index) {
        if (array[index] > 0) {
            acc.push(index);
        }
        return acc;
    }, []);
    let ascendingIndices = indices.slice().sort(function(a, b) {return array[a] - array[b];});
    let botXIndices = ascendingIndices.slice(0, x);
    return botXIndices;
}

function getMixedIndex(array, x, y) {
    let nonZeroIndices = array.reduce(function(acc, _, index) {
        if (array[index] > 0) {
            acc.push(index);
        }
        return acc;
    }, []);
    let descendingIndices = nonZeroIndices.slice().sort(function(a, b) {return array[b] - array[a];});
    let topXIndices = descendingIndices.slice(0, x);
    let remainingIndices = descendingIndices.filter(index => !topXIndices.includes(index));
    let bottomYIndices = remainingIndices.slice(0, y);
    let mixedIndices = topXIndices.concat(bottomYIndices);
    return mixedIndices;
}

function getMixedIndex(array, x, y) {
    let nonZeroIndices = array.reduce(function(acc, _, index) {
        if (array[index] > 0) {
            acc.push(index);
        }
        return acc;
    }, []);
    let sortedAscIndices = nonZeroIndices.slice().sort(function(a, b) {return array[a] - array[b];});
    let sortedDescIndices = nonZeroIndices.slice().sort(function(a, b) {return array[b] - array[a];});
    let mixedIndices = [];
    for (let i = 0; i < x && i < sortedDescIndices.length; i++) {
        mixedIndices.push(sortedDescIndices[i]);
    }
    for (let i = 0; i < sortedAscIndices.length && mixedIndices.length < x + y; i++) {
        if (!mixedIndices.includes(sortedAscIndices[i])) {
            mixedIndices.push(sortedAscIndices[i]);
        }
    }
    return mixedIndices.slice(0, x + y);
}

function getRandomIndex(array, x) {
    let nonZeroIndices = array.reduce(function(acc, _, index) {
        if (array[index] !== 0) {
            acc.push(index);
        }
        return acc;
    }, []);
    for (let i = nonZeroIndices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [nonZeroIndices[i], nonZeroIndices[j]] = [nonZeroIndices[j], nonZeroIndices[i]];
    }
    let randomIndices = nonZeroIndices.slice(0, Math.min(x, nonZeroIndices.length));
    return randomIndices;
}

//algorithm functions
function getMatrixGreedy(nodes_array, factors_array) {
    for (let i = 0; i < factors_array.length; i++) {
        for (let j = 0; j < nodes_array.length; j++) {
            if (nodes_array[j] > 0 && factors_array[i] > 0) {
                Matrix[i][j] = 1;
                factors_array[i]--;
                nodes_array[j]--;
            }
        }
    }
    //console.log(Matrix);
}

function getMatrixAscSortOnStep (nodes_array, factors_array) {
    let buffer = [];
    for (let i = 0; i < factors_array.length; i++) {
        buffer = getMaxValueIndex(nodes_array, factors_array[i]);
        for (let j = 0; j < buffer.length; j++) {
            Matrix[i][buffer[j]] = 1;
            factors_array[i]--;
            nodes_array[buffer[j]]--;
        }
    }
}

function getMatrixDscSortOnStep (nodes_array, factors_array) {
    let buffer = [];
    for (let i = 0; i < factors_array.length; i++) {
        buffer = getMinValueIndex(nodes_array, factors_array[i]);
        for (let j = 0; j < buffer.length; j++) {
            Matrix[i][buffer[j]] = 1;
            factors_array[i]--;
            nodes_array[buffer[j]]--;
        }
    }
}

function getMatrixFlipSortOnStep(nodes_array, factors_array, param) {
    let buffer = [];
    for (let i = 0; i < factors_array.length; i++) {
        if (i%2 == param) {
            buffer = getMaxValueIndex(nodes_array, factors_array[i]);
        } else {
            buffer = getMinValueIndex(nodes_array, factors_array[i]);
        }
        for (let j = 0; j < buffer.length; j++) {
            Matrix[i][buffer[j]] = 1;
            factors_array[i]--;
            nodes_array[buffer[j]]--;
        }
    }
}

function getMatrixHalfSortOnStep(nodes_array, factors_array) {
    let buffer = [];
    for (let i = 0; i < factors_array.length; i++) {
        buffer = getMixedIndex(nodes_array, Math.floor(factors_array[i]/2), factors_array[i]-Math.floor(factors_array[i]/2));
        for (let j = 0; j < buffer.length; j++) {
            Matrix[i][buffer[j]] = 1;
            factors_array[i]--;
            nodes_array[buffer[j]]--;
        }
    }
}

function getMatrixRandom(nodes_array, factors_array) {
    let buffer = [];
    for (let i = 0; i < factors_array.length; i++) {
        buffer = getRandomIndex(nodes_array, factors_array[i]);
        for (let j = 0; j < buffer.length; j++) {
            Matrix[i][buffer[j]] = 1;
            factors_array[i]--;
            nodes_array[buffer[j]]--;
        }
    }
}
