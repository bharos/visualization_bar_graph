var redraw = function() {

    //To redraw, remove all elements from  the svg
    if (svg != undefined)
        svg.selectAll("*").remove();

    max_in_array = Math.max.apply(null, dataset);
    min_in_array = Math.min.apply(null, dataset);

    frequencies = new Array(binDivisions).fill(0);

    binWidth = (max_in_array - min_in_array) / binDivisions;
    console.log("max "+max_in_array);
    console.log("min "+min_in_array);
    //populate the frequency array
    dataset.forEach(function(d) {
    	var index = Math.floor((d - min_in_array) / binWidth);
    	if(index == binDivisions)
    		index = index-1;
        frequencies[index]++;
    });

    max_freq = Math.max.apply(null, frequencies);
    min_freq = Math.min.apply(null, frequencies);

console.log(frequencies);
console.log(binWidth);
console.log(binDivisions);

    //Draw the graph based on the current selected mode
    if (force_graph == true)
        drawForceLayout();

    else if (bar_mode == true) {
        drawBarChart();
    } else {
        drawPieChart();
    }

}
