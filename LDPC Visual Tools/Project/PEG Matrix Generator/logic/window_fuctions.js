function handleLargeSet(x) {
    let container = document.getElementById("shapes-container");
    let row = document.getElementById("panel-container");
    let totalWidth = x*80 + container.offsetLeft;
    if (totalWidth > window.innerWidth) {
        container.style.width = 'max-content';
        row.style.width = 'max-content';
    } else {
        container.style.align = 'center';
        row.style.width = '';
    }
}
