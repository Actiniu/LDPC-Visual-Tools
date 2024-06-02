//get the content from the file matrix
let H_MatrixExists = false;
let H_MatrixContent = "";
function openUploadHMatrix() {
    var H_matrix_File = document.getElementById("input-H-matrix");
    H_matrix_File.click();
    H_matrix_File.addEventListener('change', function () {
        var read = new FileReader();
        read.onload = function () {
            H_MatrixContent = read.result;
            //console.log(H_MatrixContent);
            H_MatrixExists = true;
        }
        read.readAsText(this.files[0]);
    });
}

function isValidFileContent(fileContent) {
    let lines = fileContent.split('\n');
    if (lines.length < 2) {
        return false;
    }
    let firstLineValues = lines[0].trim().split(' ');
    if (firstLineValues.length != 2) {
        return false;
    }
    if (!(/^\d+$/.test(firstLineValues[0])) || !(/^\d+$/.test(firstLineValues[1]))) {
        return false;
    }
    for (let i = 1; i < lines.length; i++) {
        if (!/^[\s10]*$/.test(lines[i])) {
            return false;
        }
    }
    return true;
}

//begin data extraction
function getHMatrix(M) {
    if(H_MatrixExists == false) {
        alert("No file has been provided!");
        return false;
    }
    if (isValidFileContent(M)) {
        //console.log("File content is valid.");
    } else {
        console.log("File content is invalid.");
        return false;
    }
    let rows = M.split('\n');
    let dimensions = rows[0].split(' ');
    factors = parseInt(dimensions[0]);
    nodes = parseInt(dimensions[1]);
    for (let i = 0; i < factors; i++) {
        let rowValues = rows[i+1].split(' ');
        H_Matrix[i] = [];
        for (let j = 0; j < nodes; j++) {
            H_Matrix[i][j] = parseInt(rowValues[j]);
            if (H_Matrix[i][j] != 0 && H_Matrix[i][j] != 1) {
                alert("File has unexpected data!");
                return false;
            }
        }
    }
    return true;
    //console.log(H_Matrix);
}

function getExtendedMatrix(factors, nodes, H_Matrix, repeat) {
    let  count = 0;
    let j = 0;
    let i = 0;
    for (let p = 0; p < factors*repeat; p++) {
        E_Matrix[p] = [];
        S_Matrix[p] = [];
        if (i == factors) {
            i = 0;
        }
        for (let k = 0; k < nodes*repeat; k++) {
            E_Matrix[p][k] = [];
            S_Matrix[p][k] = [];
            if (j == nodes) {
                j = 0;
            }
            if (p == count*factors+i && k == count*nodes+j) {
                E_Matrix[p][k][0] = H_Matrix[i][j];
                S_Matrix[p][k][0] = H_Matrix[i][j];
                if (H_Matrix[i][j] == 0) {
                    E_Matrix[p][k][1] = 0;
                    S_Matrix[p][k][1] = 0;
                } else {
                    E_Matrix[p][k][1] = 1;
                    S_Matrix[p][k][1] = 1;
                }
            } else {
                E_Matrix[p][k][0] = 0;
                E_Matrix[p][k][1] = -1;
                S_Matrix[p][k][0] = 0;
                S_Matrix[p][k][1] = -1;
            }
            j++;
        }
        i++;
        if (i == factors && j == nodes) {
            count++;
        }
    }
    //console.log(E_Matrix);
    return true;
}

function getShiftedMatrix(factors, nodes, P_Matrix, factor_shift, node_shift, shift, repeat, index) {
    let count = 0;
    for (let i = 0; i < factors*repeat; i++) {
        for (let j = 0; j < nodes*repeat; j++) {
            if (factor_shift+factors*count == i && node_shift+nodes*count == j) {
                S_Matrix[i][j][2*index] = 0;
                S_Matrix[i][j][2*index+1] = 0;
                count++;
            } else {
                S_Matrix[i][j][2*index] = P_Matrix[i][j][2*(index-1)];
                S_Matrix[i][j][2*index+1] = P_Matrix[i][j][2*(index-1)+1];
            }
        }
    }
    count = 0;
    for (let i = 0; i < factors*repeat; i++) {
        for (let j = 0; j < nodes*repeat; j++) {
            if (factor_shift+factors*count == i && node_shift+nodes*count == j) {
                if (i+shift >= factors*repeat) {
                    S_Matrix[i+shift-factors*repeat][j][2*index] = 1;
                    S_Matrix[i+shift-factors*repeat][j][2*index+1] = 1;
                } else {
                    S_Matrix[i+shift][j][2*index] = 1;
                    S_Matrix[i+shift][j][2*index+1] = 1;
                }
                count++;
            }
        }
    }
    //console.log(S_Matrix);
    return true;
}