function addBond(a, b) {
    let circlesContainer = document.getElementById('circles-container');
    let squaresContainer = document.getElementById('squares-container');

    let circleA = circlesContainer.children[a];
    let squareB = squaresContainer.children[b];

    circleA.addEventListener('mouseenter', () => {
        circleA.style.backgroundColor = 'magenta';
        squareB.style.backgroundColor = 'cyan';
    });

    circleA.addEventListener('mouseleave', () => {
        circleA.style.backgroundColor = ''; 
        squareB.style.backgroundColor = ''; 
    });

    squareB.addEventListener('mouseenter', () => {
        circleA.style.backgroundColor = 'magenta';
        squareB.style.backgroundColor = 'cyan';
    });

    squareB.addEventListener('mouseleave', () => {
        circleA.style.backgroundColor = ''; 
        squareB.style.backgroundColor = '';
    });
}
 