function addExportOption(matrix_number) {
    let option = document.createElement("option");
    option.value = matrix_number;
    option.text = "Shifted Matrix " + matrix_number;
    document.getElementById("matrix-list").appendChild(option);
}

function exportMatrixFile () {
    let file_name = document.getElementById("export-name").value;
    if (file_name.length >= 32) {
        alert("File name is too large");
        return false;
    }
    if (file_name.length < 1) {
        alert("File name is too short");
        return false;
    }
    let matrix_list = document.getElementById("matrix-list");
    // Get the selected option
    let selectedOption = matrix_list.options[matrix_list.selectedIndex];
    let matrix_export_number = selectedOption.value;
    //console.log("Selected value:", matrix_export_number);
    if (matrix_export_number < 0) {
        alert("Please select a matrix to export.");
        return false;
    }
    let archive = document.getElementById("archive-export").checked;
    let fileContent = "";
    if (archive == true) {
        fileContent = (factors*repeat) + "/" + (nodes*repeat) + "/" + archiveMatrix(matrix_export_number);
    } else {
        fileContent = (factors*repeat) + " " + (nodes*repeat) + '\n' + exportMatrix(matrix_export_number);
    }
    let blob = new Blob([fileContent], { type: 'text/plain' });
    let url = window.URL.createObjectURL(blob);
    
    // Create a link element
    let link = document.createElement('a');
    link.href = url;
    if (file_name == "Matrix_") {
        file_name += matrix_export_number;
    }
    link.download = file_name + '.txt'; // Set the name of the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function archiveMatrix (matrix_export_number) {
    let content = "";
    let counter = 0;
    let element;
    let last = S_Matrix[0][0][2*matrix_export_number];
    for (let i = 0; i < factors*repeat; i++) {
        for (let j = 0; j < nodes*repeat; j++) {
            element = S_Matrix[i][j][2*matrix_export_number];
            if (element == last) {
                counter++;
            } else {
                if (counter == 1) {
                    content += last;
                }
                if (counter == 2) {
                    content += last;
                    content += last;
                }
                if (counter > 2) {
                    if (last == 1) {
                        content += "/" + counter + "/";
                    } else if (last == 0) {
                        content += "." + counter + ".";
                    } else {
                        content += "FILE ERROR, character unkown";
                        return;
                    }
                } 
                counter = 1;
            }
            last = element;
        }
    }
    if (counter == 1) {
        content += last;
    }
    if (counter == 2) {
        content += last;
        content += last;
    }
    if (counter > 2) {
        if (last == 1) {
            content += "/" + counter + "/";
        } else if (last == 0) {
            content += "." + counter + ".";
        } else {
            content += "FILE ERROR, character unkown";
            return;
        }
    } 
    return content;
}

function exportMatrix(matrix_export_number) {
    let content = "";
    for (let i = 0; i < factors*repeat; i++) {
        for (let j = 0; j < nodes*repeat; j++) {
            if (j > 0) {
                content += " ";
            }
            if (S_Matrix[i][j][2*matrix_export_number] == 1) {
                content += "1";
            } else if (S_Matrix[i][j][2*matrix_export_number] == 0) {
                content += "0";
            } else {
                content += "FILE ERROR";
            }
        }
        content += '\n';
    }
    return content;
}