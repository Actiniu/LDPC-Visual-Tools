function drawOutline(a, b, cc, sc, type) {
    let circlesContainer = document.getElementById('circles-container');
    let squaresContainer = document.getElementById('squares-container'); 
    let outlineContainer = document.getElementById('outline-container');

    let c = Number(a+cc-1);
    let d = Number(b+sc-1);

    let circleA = circlesContainer.children[a];
    let circleB = circlesContainer.children[c];
    let squareB = squaresContainer.children[d];
    let squareA = squaresContainer.children[b];

    let topLeftCornerX = circleA.offsetLeft - circleA.offsetWidth/4;
    let topLeftCornerY = circleA.offsetTop - circleA.offsetHeight/4;

    let topRightCornerX = circleB.offsetLeft + circleB.offsetWidth*5/4;
    let topRightCornerY = circleB.offsetTop - circleB.offsetHeight/4;

    let botRightCornerX = squareB.offsetLeft + squareB.offsetWidth*5/4;
    let botRightCornerY = squareB.offsetTop + squareB.offsetHeight*5/4;

    let botLeftCornerX = squareA.offsetLeft - squareA.offsetWidth/4;
    let botLeftCornerY = squareA.offsetTop + squareA.offsetHeight*5/4;

    let angle = 90;

    //top line
    let line_a = document.createElement('div');
    line_a.className = type;
    outlineContainer.appendChild(line_a);
    line_a.style.width = Math.max((topRightCornerX - topLeftCornerX), botRightCornerX - botLeftCornerX) + 'px';
    line_a.style.left = Math.min(topLeftCornerX, botLeftCornerX) + 'px';
    line_a.style.top = topLeftCornerY + 'px';
    line_a.style.zIndex = 2;
   
    //right line
    let line_b = document.createElement('div');
    line_b.className = type;
    outlineContainer.appendChild(line_b);
    line_b.style.width = (botRightCornerY - topRightCornerY) + 'px';
    line_b.style.transform = 'rotate(' + angle + 'deg)';
    line_b.style.left = (Math.max(topRightCornerX, botRightCornerX) - (botRightCornerY - topRightCornerY)/2) + 'px';
    line_b.style.top = (botRightCornerY + topRightCornerY)/2 + 'px';
    line_b.style.zIndex = 2;

    //bot line
    let line_c = document.createElement('div');
    line_c.className = type;
    outlineContainer.appendChild(line_c);
    line_c.style.width = Math.max((topRightCornerX - topLeftCornerX), botRightCornerX - botLeftCornerX) + 'px';
    line_c.style.left = Math.min(topLeftCornerX, botLeftCornerX) + 'px';
    line_c.style.top = botLeftCornerY + 'px';
    line_c.style.zIndex = 2;

    //left line
    let line_d = document.createElement('div');
    line_d.className = type;
    outlineContainer.appendChild(line_d);
    line_d.style.width = (botRightCornerY - topRightCornerY) + 'px';
    line_d.style.transform = 'rotate(' + angle + 'deg)';
    line_d.style.left = (Math.min(topLeftCornerX, botLeftCornerX) - (botRightCornerY - topRightCornerY)/2) + 'px';
    line_d.style.top = (botRightCornerY + topRightCornerY)/2 + 'px';
    line_d.style.zIndex = 2;
}
