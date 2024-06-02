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
    let regex = /^[0-9.\/]+$/;
    return regex.test(fileContent);
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
    let char = '';
    let counter = 0;
    let num = 0;;
    let freeze;
    for (let i = 0; ; i++) {
        if (M[i] == '/') {
            factors = parseInt(char);
            break;
        } else {
            char += M[i];
        }
        counter++;
    }
    counter++;
    char = '';
    for (let i = counter;;i++) {
        if (M[i] == '/') {
            nodes = parseInt(char);
            break;
        } else {
            char += M[i];
        }
        counter++;
    }
    char = '';
    counter++;
    for (let i = 0; i < factors; i++) {
        Matrix[i] = [];
        for (let j = 0; j < nodes; j++) {
            if (num == 0) {
                if (M[counter] == '.') {
                    counter++;
                    while(M[counter] != '.') {
                        char += M[counter];
                        counter++;
                    }
                    num = parseInt(char)-1;
                    char = '';
                    Matrix[i][j] = 0;
                    freeze = 0;
                    counter++;
                } else if (M[counter] == '/') {
                    counter++;
                    while(M[counter] != '/') {
                        char += M[counter];
                        counter++;
                    }
                    num = parseInt(char)-1;
                    char = '';
                    Matrix[i][j] = 1;
                    freeze = 1;
                    counter++;
                } else if (M[counter] == '1') {
                    Matrix[i][j] = 1;
                    counter++;
                } else if (M[counter] == '0') {
                    Matrix[i][j] = 0;
                    counter++;
                } else {
                    alert("Incorrect data provided!");
                    return false;
                }
            } else {
                Matrix[i][j] = freeze;
                num--;
            }
        }
    }
    //console.log(Matrix);
}