var drawPieChart = function() {

    radius = Math.min(w, h) / 2;

    var arc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 70)
        .innerRadius(radius - 70);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            return d; });

    var arcOver = d3.arc()
        .outerRadius(radius - 20)
        .innerRadius(0);

    var mainGroup = svg.append("g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var g = mainGroup.selectAll(".arc")
        .data(pie(frequencies))
        .enter().append("g")
        .attr("class", "arc");

    var path = g.append("path")
        .attr("d", arc)
        .style("fill", '#f5f5f5');

    path
        .style("fill", function(d, i) {
            return c20[i % 20]; })

    path.on("mouseenter", function(d, i) {
            d3.select(this)
                .attr("stroke", "white")
                .transition()
                .duration(1000)
                .attr("d", arcOver)
                .attr("stroke-width", 2);

            d3.selectAll("text")
                .select(function(d, ind) {
                    return ind === i ? this : null; })
                .transition()
                .duration(1000)
                .style("opacity", 1);



        }).on("mouseleave", function(d, i) {
            d3.select(this)
                .transition().duration(1000)
                .attr("d", arc)
                .attr("stroke", "none")

            d3.selectAll("text")
                .select(function(d, ind) {
                    return ind === i ? this : null; })
                .transition()
                .duration(1000)
                .style("opacity", 0);
        })
        .on('click', function(d, i) {
            bar_mode = true;
            redraw();
        });

    var text = g.append("text")
        .attr("transform", function(d) {
            return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) {
            return d.data; });

    text.style('opacity', 0)
        .transition().duration(2200)
        .style('opacity', 1)
        .transition().duration(500)
        .style('opacity', 0);

}
