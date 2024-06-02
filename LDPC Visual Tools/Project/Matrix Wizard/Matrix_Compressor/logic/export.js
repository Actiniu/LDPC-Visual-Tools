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
    fileContent = (factors) + "/" + (nodes) + "/" + archiveMatrix();
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

function archiveMatrix () {
    let content = "";
    let counter = 0;
    let element;
    let last = Matrix[0][0];
    for (let i = 0; i < factors; i++) {
        for (let j = 0; j < nodes; j++) {
            element = Matrix[i][j];
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