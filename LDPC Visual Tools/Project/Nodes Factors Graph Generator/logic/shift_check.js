function checkShift(factors, nodes) {
    let node_shift = parseInt(document.getElementById("x-shift").value) - 1;
    let factor_shift = parseInt(document.getElementById("y-shift").value) - 1;
    let steps_shift = parseInt(document.getElementById("steps-shift").value);
    let shift_valid = false;
    if (!isNaN(factor_shift) && !isNaN(node_shift) && !isNaN(steps_shift)) {
        if (factor_shift >= factors || node_shift >= nodes || factor_shift < 0 || node_shift < 0) {
            alert("The elements do not exist!");
            return false;
        }
        if (S_Matrix[factor_shift][node_shift][2*index] != 1) {
            alert("This bond does not exist and cannot be shifted!");
            return false;
        }
        if (steps_shift <= 0) {
            alert("Cannot shift by " + steps_shift + " steps!");
            return false;
        }
        shift_valid = true;
    }
    return shift_valid;
}