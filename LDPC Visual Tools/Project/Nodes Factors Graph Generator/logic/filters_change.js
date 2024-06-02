function hideNoise() {
    drawGraph(factors, nodes, S_Matrix, index);
}
document.getElementById('hide-noise').addEventListener('change', hideNoise);

function showFocus() {
    drawGraph(factors, nodes, S_Matrix, index);
}
document.getElementById('focus-module').addEventListener('change', showFocus);

function hideEMatrix() {
    let check = document.getElementById('hide-e-matrix').checked;
    if (check == true) {
        document.getElementById('E-Matrix-display').style.display = 'none'; 
    } else {
        document.getElementById('E-Matrix-display').style.display = 'block'; 
    }
}
document.getElementById('hide-e-matrix').addEventListener('change', hideEMatrix);

function hideSMatrix() {
    let check = document.getElementById('hide-s-matrix').checked;
    if (check == true) {
        document.getElementById('S-Matrix-display-one').style.display = 'none'; 
        document.getElementById('S-Matrix-display-two').style.display = 'none'; 
    } else {
        document.getElementById('S-Matrix-display-one').style.display = 'block'; 
        document.getElementById('S-Matrix-display-two').style.display = 'block'; 
    }
}
document.getElementById('hide-s-matrix').addEventListener('change', hideSMatrix);

function showAdvanced(x) {
    if (x == 0) {
        document.getElementById('advanced-panel').style.display = 'none';
        document.getElementById('advanced-hide').style.display = 'none';
        document.getElementById('advanced-show').style.display = 'block';
        return false;
    }
    document.getElementById('advanced-panel').style.display = 'block';
    document.getElementById('advanced-show').style.display = 'none';
    document.getElementById('advanced-hide').style.display = 'block';
    return true;
}