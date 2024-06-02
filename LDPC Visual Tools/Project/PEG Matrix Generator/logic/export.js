function exportMatrixFile () {
    let fileContent = "";
    let file_name = document.getElementById("export-name").value;
    if (file_name.length >= 32) {
        alert("File name is too large");
        return false;
    }
    if (file_name.length < 1) {
        alert("File name is too short");
        return false;
    }
    fileContent = factors_array.length + " " + nodes_array.length + '\n' + 
    exportMatrix(factors_array.length, nodes_array.length, Matrix);
    let blob = new Blob([fileContent], { type: 'text/plain' });
    let url = window.URL.createObjectURL(blob);
    
    // Create a link element
    let link = document.createElement('a');
    link.href = url;
    link.download = file_name + '.txt'; // Set the name of the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function exportMatrix(factors, nodes, Matrix) {
    let content = "";
    for (let i = 0; i < factors; i++) {
        for (let j = 0; j < nodes; j++) {
            if (j > 0) {
                content += " ";
            }
            if (Matrix[i][j] == 1) {
                content += "1";
            } else if (Matrix[i][j] == 0) {
                content += "0";
            } else {
                content += "FILE ERROR";
                return false;
            }
        }
        content += '\n';
    }
    return content;
}