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
    let fileContent = "";
    fileContent += factors + " " + nodes + "\n";
    for (let i = 0; i < factors; i++) {
        for (let j = 0; j < nodes; j++) {
            if (Matrix[i][j] == 1) {
                fileContent += "1 ";
            } else if (Matrix[i][j] == 0) {
                fileContent += "0 ";
            } else {
                fileContent += "FILE ERROR";
                return false;
            }
        }
        fileContent += "\n";
    }
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
