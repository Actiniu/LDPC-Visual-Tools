function drawGraph(factors, nodes, Matrix, index) {
    cleanGraph();
    //initial drawings
    let repeat = document.getElementById("repeat-pattern").value;
    let node_shift = parseInt(document.getElementById("x-shift").value) - 1;
    let factor_shift = parseInt(document.getElementById("y-shift").value) - 1;
    let steps_shift = parseInt(document.getElementById("steps-shift").value);
    handleLargeSet(factors*repeat);
    handleLargeSet(nodes*repeat);
    let middle = Math.floor(repeat/2);
    if (repeat < 1) {
        alert("Invalid repeat value!");
        return false;
    }
    //apply filters and draw lines based on them
    let applyFocus = document.getElementById("focus-module").checked;
    let hideNoise = document.getElementById("hide-noise").checked;
    drawCircle(nodes, repeat, applyFocus);
    drawSquare(factors, repeat, applyFocus);
    let check = 0;
    let count = 0;
    for (let i = 0; i < factors*repeat; i++) {
        count = 0;
        for (let j = 0; j < nodes*repeat; j++) {
            if (j == nodes*(count+1)) {
                count++;
            }
            if(Matrix[i][j][2*index] == 1) {
                if (hideNoise == false) {
                    if (j == count*nodes + node_shift) {
                        if ((i == (count+steps_shift-repeat)*factors + factor_shift) || (i == (count+steps_shift)*factors + factor_shift)) {
                            if ((count+steps_shift)*factors + factor_shift >= factors*repeat) {
                                drawLine(j, i, "red");
                                //console.log("Red overflow: i: " + i + " ? " + (count*x + x_shift + steps_shift*x - x*repeat) + " j: " + j + " ? " + (count*y + y_shift));
                            } else {
                                drawLine(j, i, "red");
                                //console.log("Red normal: i: " + i + " ? " + (count*x + x_shift + steps_shift*x) + " j: " + j + " ? " + (count*y + y_shift));
                            }
                        } 
                    } else {
                        //console.log("Black: i: " + i + " ? " + (counter_x*x + x_shift + steps_shift*x) + " j: " + j + " ? " + (counter_y*y + y_shift));
                        drawLine(j, i, "black");
                    }
                } else {
                    if ((i >= middle*factors && i < (middle+1)*factors) || (j >= middle*nodes && j < (middle+1)*nodes)) {
                        if (j == count*nodes + node_shift) {
                            if ((i == (count+steps_shift-repeat)*factors + factor_shift) || (i == (count+steps_shift)*factors + factor_shift)) {
                                if ((count+steps_shift)*factors + factor_shift >= factors*repeat) {
                                    drawLine(j, i, "red");
                                } else {
                                    drawLine(j, i, "red");
                                }
                            } 
                        } else {
                            drawLine(j, i, "black");
                        }
                    }
                }
                addBond(j, i);
            }
            if (i == check*factors && j == check*nodes) {
                check++;
                if (applyFocus == true) {
                    if (i == middle*factors && j == middle*nodes) {
                        drawOutline(j, i, nodes, factors, "border-focus");
                    } else {
                        drawOutline(j, i, nodes, factors, "border-line");
                    }
                } else {
                    drawOutline(j, i, nodes, factors, "border-line");
                }
            } 
        }
    }
}