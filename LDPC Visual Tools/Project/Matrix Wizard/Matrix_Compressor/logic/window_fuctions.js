function handleLargeSet(x) {
    let row = document.getElementById("panel-container");
    let totalWidth = x*80;
    if (totalWidth > window.innerWidth) {
        row.style.width = 'max-content';
    } else {
        row.style.width = '';
    }
}
