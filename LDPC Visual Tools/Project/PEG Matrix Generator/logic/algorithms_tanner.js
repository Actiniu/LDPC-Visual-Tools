function getMatrixTannerGreedy(nodes_array, factors_array) {
    let counter = 0;
    for (let i = 0; i < factors_array.length; i++) {
        counter += factors_array[i];
    }
    let ni = 0;
    let fi = 0;
    let valid_n = [];
    let valid_f = [];
    let focus = 0;
    let check;
    let safe = 0;
    while (counter > 0) {
        //console.log("NI: " + ni);
        //console.log("FI: " + fi);
        if (ni == nodes_array.length) {
            ni = 0;
        }
        if (ni == -1) {
            ni = nodes_array.length - 1;
        }
        if (fi == factors_array.length) {
            fi = 0;
        }
        if (fi == -1) {
            fi = factors_array.length - 1;
        }
        safe++;
        if (safe > 100000) {
            console.log("This process has been terminated due to a large number of iterations!");
            break;
        }
        if (focus == 0) {
            //this is a node
            if (nodes_array[ni] > 0) {
                nodes_array[ni]--;
                check = 0;
                for (let i = fi; i < factors_array.length; i++) {
                    if (factors_array[i] > 0) {
                        factors_array[i]--;
                        counter--;
                        Matrix[i][ni] = 1;
                        //console.log("bond made");
                        check = 1;
                        fi = i;
                        break;
                    }
                }
                if (check == 0) {
                    for (let i = 0; i < fi; i++) {
                        if (factors_array[i] > 0) {
                            factors_array[i]--;
                            counter--;
                            Matrix[i][ni] = 1;
                            fi = i;
                            break;
                        }
                    }
                }
                valid_n.push(ni);
                ni++;
            } else {
                fi = valid_f.pop();
            }
            focus = 1;
        } else {
            //this is a factor
            if (factors_array[fi] > 0) {
                factors_array[fi]--;
                check = 0;
                for (let i = ni; i < nodes_array.length; i++) {
                    if (nodes_array[i] > 0) {
                        nodes_array[i]--;
                        counter--;
                        //console.log("bond made");
                        Matrix[fi][i] = 1;
                        check = 1;
                        ni = i;
                        break;
                    }
                }
                if (check == 0) {
                    for (let i = 0; i < ni; i++) {
                        if (nodes_array[i] > 0) {
                            nodes_array[i]--;
                            counter--;
                            Matrix[fi][i] = 1;
                            ni = i;
                            break;
                        }
                    }
                }
                valid_f.push(fi);
                fi++;
            } else {
                ni = valid_n.pop();
            }
            focus = 0;
        }
    }
}

