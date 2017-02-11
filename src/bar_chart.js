var drawBarChart = function() {

    bars = svg.selectAll("rect")
        .data(frequencies)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("width", w / frequencies.length - 10)
        .attr("height", 400)
        .attr("x", function(d, i) {
            return i * (w / frequencies.length);
        })
        .attr("fill", function(d, i) {
            return c20[i % 20];
        });


    bars
        .attr('y', 420)
        .transition()
        .duration(2000)
        .attr("y", function(d) {
            // return h - (d * 4);
            return ((max_freq - d) / max_freq) * 400 + 20;
        })


    bars.on('mouseover', function(d, i) {
            d3.selectAll("text")
                .select(function(d, ind) {
                    return ind === i ? this : null; })
                .style("opacity", 1);

            d3.select(this)
                .attr('y', parseInt(d3.select(this).attr('y')) - 6)
                .attr('height', parseInt(d3.select(this).attr('height')) + 6)
                .attr('x', parseInt(d3.select(this).attr('x')) - 4)
                .attr('width', parseInt(d3.select(this).attr('width')) + 6)


        })
        .on('mouseout', function(d, i) {
            d3.select(this)
                .attr('y', parseInt(d3.select(this).attr('y')) + 6)
                .attr('height', parseInt(d3.select(this).attr('height')) - 6)
                .attr('x', parseInt(d3.select(this).attr('x')) + 4)
                .attr('width', parseInt(d3.select(this).attr('width')) - 6)
            d3.selectAll("text")
                .select(function(d, ind) {
                    return ind === i ? this : null; })
                .style("opacity", 0);
        })
        .on('click', function(d, i) {
            bar_mode = false;
            force_graph = false;
            redraw();
        })

    svg.selectAll("text")
        .data(frequencies)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return (i * (w / frequencies.length) + (w / frequencies.length) / 2 - 10);
        })
        .attr("y", function(d) {
            return ((max_freq - d) / max_freq) * 400 + 12;
        })
        .attr('fill', 'green')
        .style('opacity', 0);
}
