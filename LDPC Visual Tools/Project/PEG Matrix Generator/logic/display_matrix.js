function displayMatrix(factors, nodes, Matrix) {
    let m = '';
    m += 'Matrix: ' + factors + ' ' + nodes + '<br>';
    for (let i = 0; i < factors; i++) {
        for (let j = 0; j < nodes; j++) {
            if (Matrix[i][j] == 1) {
                m += '<span class="one">' + Matrix[i][j] + '</span> ';
            } else if (Matrix[i][j] == 0) {
                m += '<span class="zero">' + Matrix[i][j] + '</span> ';
            }
        }
        m += '<br>';
    }
    document.getElementById("Matrix-display").innerHTML = m;
}