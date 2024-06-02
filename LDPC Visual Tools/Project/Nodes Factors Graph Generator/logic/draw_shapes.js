//drawing functions
function drawCircle(nodes, repeat, F) {
    let m = Math.floor(repeat/2);
    if (F == true) {
        for (let c = 0; c < repeat; c++) {
            for (let i = 0; i < nodes; i++) {
                let circle = document.createElement('div');
                if (m == c) {
                    circle.className = 'circle_a';
                } else {
                    circle.className = 'circle_b';
                }
                document.getElementById('circles-container').appendChild(circle);
            }
        }
    } else {
        for (let c = 0; c < repeat; c++) {
            for (let i = 0; i < nodes; i++) {
                let circle = document.createElement('div');
                if (c%2 == 0) {
                    circle.className = 'circle_b';
                } else {
                    circle.className = 'circle_a';
                }
                document.getElementById('circles-container').appendChild(circle);
            }
        }
    }

}

function drawSquare(factors, repeat, F) {
    let m = Math.floor(repeat/2);
    if (F == true) {
        for (let c = 0; c < repeat; c++) {
            for (let i = 0; i < factors; i++) {
                let square = document.createElement('div');
                if (m == c) {
                    square.className = 'square_a';
                } else {
                    square.className = 'square_b';
                }
                document.getElementById('squares-container').appendChild(square);
            }
        }  
    } else {
        for (let c = 0; c < repeat; c++) {
            for (let i = 0; i < factors; i++) {
                let square = document.createElement('div');
                if (c%2 == 0) {
                    square.className = 'square_b';
                } else {
                    square.className = 'square_a';
                }
                document.getElementById('squares-container').appendChild(square);
            }
        }
    }
}