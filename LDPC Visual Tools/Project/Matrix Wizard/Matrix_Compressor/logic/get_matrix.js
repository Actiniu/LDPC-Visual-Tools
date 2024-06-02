//get the content from the file matrix
let FileExists = false;
let FileContent = "";
function openUploadMatrix() {
    var Matrix_File = document.getElementById("input-matrix");
    Matrix_File.click();
    Matrix_File.addEventListener('change', function () {
        var read = new FileReader();
        read.onload = function () {
            FileContent = read.result;
            FileExists = true;
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


function getMatrix(M) {
    if(FileExists == false) {
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
        Matrix[i] = [];
        for (let j = 0; j < nodes; j++) {
            Matrix[i][j] = parseInt(rowValues[j]);
            if (Matrix[i][j] != 0 && Matrix[i][j] != 1) {
                alert("File has unexpected data!");
                return false;
            }
        }
    }
    return true;
}