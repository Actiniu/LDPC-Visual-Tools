function drawLine(a, b, color) {
    let circlesContainer = document.getElementById('circles-container');
    let squaresContainer = document.getElementById('squares-container');
    let linesContainer = document.getElementById('lines-container');

    let circleA = circlesContainer.children[a];
    let squareB = squaresContainer.children[b];

    let line = document.createElement('div');
    line.className = 'line';
    linesContainer.appendChild(line);

    let circleCenterX = circleA.offsetLeft + circleA.offsetWidth/2;
    let circleCenterY = circleA.offsetTop + circleA.offsetHeight/2;
    let squareCenterX = squareB.offsetLeft + squareB.offsetWidth/2;
    let squareCenterY = squareB.offsetTop + squareB.offsetHeight/2;

    let angle = (Math.atan2(circleCenterY - squareCenterY, circleCenterX - squareCenterX) * 180) / Math.PI;
    let length = Math.sqrt((circleCenterX - squareCenterX) ** 2 + (circleCenterY - squareCenterY) ** 2);

    line.style.width = length + 'px';
    line.style.transform = 'rotate(' + angle + 'deg)';
    line.style.left = (squareCenterX + circleCenterX - length)/2 + 'px';
    line.style.top = (circleCenterY + squareCenterY)/2 + 'px';
    line.style.zIndex = -1;
    line.style.borderColor = color;
}


