function displayMatrix(factors, nodes, H_Matrix) {
    let m = 'H matrix (' + factors + ' ' + nodes + '):';
    m += '<br>';
    for (let i = 0; i < factors; i++) {
        for (let j = 0; j < nodes; j++) {
            if (H_Matrix[i][j] == 1) {
                m += '<span class="one">' + H_Matrix[i][j] + '</span> ';
            } else {
                m += '<span class="zero">' + H_Matrix[i][j] + '</span> ';
            }
        }
        m += '<br>';
    }
    document.getElementById("H-Matrix-display").innerHTML = m;
}

function displayExtendedMatrix(factors, nodes, E_Matrix) {
    let m = '';
    let hideEMatrix = document.getElementById("hide-e-matrix").checked;
    if (hideEMatrix == false) {
        m += 'Extended matrix: <br>';
        for (let i = 0; i < factors; i++) {
            for (let j = 0; j < nodes; j++) {
                if (E_Matrix[i][j][1] == 1) {
                    m += '<span class="one">' + E_Matrix[i][j][0] + '</span> ';
                } else if (E_Matrix[i][j][1] == 0) {
                    m += '<span class="zero">' + E_Matrix[i][j][0] + '</span> ';
                } else {
                    m += '<span class="fill-zero">' + E_Matrix[i][j][0] + '</span> ';
                }
            }
            m += '<br>';
        }
        document.getElementById("E-Matrix-display").innerHTML = m;
    } else {
        document.getElementById("E-Matrix-display").innerHTML = '';
    }
}

function displayShiftedMatrixOne(factors, nodes, S_Matrix, index) {
    let m = '';
    let hideSMatrix = document.getElementById("hide-s-matrix").checked;
    if (hideSMatrix == false) {
        m += 'Shifted matrix ' + index + ': <br>';
        for (let i = 0; i < factors; i++) {
            for (let j = 0; j < nodes; j++) {
                if (S_Matrix[i][j][2*index+1] == 1) {
                    m += '<span class="one">' + S_Matrix[i][j][2*index] + '</span> ';
                } else if (S_Matrix[i][j][2*index+1] == 0) {
                    m += '<span class="zero">' + S_Matrix[i][j][2*index] + '</span> ';
                } else {
                    m += '<span class="fill-zero">' + S_Matrix[i][j][2*index] + '</span> ';
                }
            }
            m += '<br>';
        }
        document.getElementById("S-Matrix-display-one").innerHTML = m;
    } else {
        document.getElementById("S-Matrix-display-one").innerHTML = '';
    }
}

function displayShiftedMatrixTwo(factors, nodes, S_Matrix, index) {
    let m = '';
    let hideSMatrix = document.getElementById("hide-s-matrix").checked;
    if (hideSMatrix == false) {
        m += 'Shifted matrix ' + index + ': <br>';
        for (let i = 0; i < factors; i++) {
            for (let j = 0; j < nodes; j++) {
                if (S_Matrix[i][j][2*index+1] == 1) {
                    m += '<span class="one">' + S_Matrix[i][j][2*index] + '</span> ';
                } else if (S_Matrix[i][j][2*index+1] == 0) {
                    m += '<span class="zero">' + S_Matrix[i][j][2*index] + '</span> ';
                } else {
                    m += '<span class="fill-zero">' + S_Matrix[i][j][2*index] + '</span> ';
                }
            }
            m += '<br>';
        }
        document.getElementById("S-Matrix-display-two").innerHTML = m;
    } else {
        document.getElementById("S-Matrix-display-two").innerHTML = '';
    }
}