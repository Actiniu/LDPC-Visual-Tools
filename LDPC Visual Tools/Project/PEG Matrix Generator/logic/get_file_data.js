let FileExists = false;
let FileContent = "";
function openUploadFile() {
    var File = document.getElementById("input-file");
    File.click();
    File.addEventListener('change', function () {
        var read = new FileReader();
        read.onload = function () {
            FileContent = read.result;
            FileExists = true;
        }
        read.readAsText(this.files[0]);
    });
}

function getArray(F) {
    if(FileExists == false) {
        alert("No file has been provided!");
        return false;
    }
    let counter = 0;
    let char = "";
    let n = 0;
    let f = 0;
    while(F[counter] != ':') {
        char += F[counter];
        counter++;
    }
    nodes = parseInt(char);
    char = "";
    counter++;
    for (let i = 0; i < nodes; i++) {
        if (F[counter] == '/') {
            counter++;
            break;
        }
        while(F[counter] != " ") {
            if (F[counter] == '/') {
                counter++;
                break;
            }
            char += F[counter];
            counter++;
        }
        nodes_array[n] = parseInt(char);
        n++;
        char = "";
        counter++;
    }
    char = "";
    counter--;
    while(F[counter] != ':') {
        char += F[counter];
        counter++;
    }
    factors = parseInt(char);
    char = "";
    counter++;
    for (let i = 0; i < factors; i++) {
        while(F[counter] != " ") {
            if(F[counter] == '/') {
                break;
            }
            char += F[counter];
            counter++;
        }
        factors_array[f] = parseInt(char);
        f++;
        char = "";
        counter++;
    }
    //console.log(nodes_array);
    //console.log(factors_array);
}