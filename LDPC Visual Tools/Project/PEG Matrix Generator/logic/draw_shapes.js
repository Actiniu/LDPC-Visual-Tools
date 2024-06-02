//drawing functions
function drawCircle(nodes) {
    for (let i = 0; i < nodes; i++) {
        let circle = document.createElement('div');
        circle.className = 'circle_a';
        document.getElementById('circles-container').appendChild(circle);
    }
}

function drawSquare(factors) {
    for (let i = 0; i < factors; i++) {
        let square = document.createElement('div');
        square.className = 'square_a';
        document.getElementById('squares-container').appendChild(square);
    }
}