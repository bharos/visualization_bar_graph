var drawBarChart = function() {




var textGroup = svg.selectAll("text")
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
            return ((max_freq - d) / max_freq) * 385 + 12;
        })
        .attr('fill', 'green')
        .style('opacity', 0);


var tickArray = [];
var tickValues = [];

for(var i=0;i<frequencies.length;i++)
{
  tickValues[i] = Number(binWidth*(i+1)).toFixed(2);
}
  tickValues.push(0);

    bars = svg.selectAll("rect")
        .data(frequencies)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("width", w / frequencies.length - 10)
        .attr("x", function(d, i) {
            var val = i * (w / frequencies.length);
            tickArray.push(val);
            return val;
        })
        .attr("fill", function(d, i) {
            return c20[i % 20];
        });

tickArray.push(frequencies.length * (w / frequencies.length));

    bars
        .attr('y', function(d)
          {
            
           if(d==0)return 420;

           return 400;
          })
        .transition()
        .duration(2000)
        .attr("y", function(d) {
            // return h - (d * 4);
            if(d == 0)return 420;
            return ((max_freq - d) / max_freq) * 385 +20;
        })
        .attr("height",function(d)
          {
            if(d == 0)return 400;
            console.log("height = ",(d / max_freq) * 400);
              return Math.abs((d / max_freq) * 385 -5);
          });
console.log("FREQ");
console.log(frequencies);

var scale = d3.scaleOrdinal()
            .domain(tickValues)
            .range(tickArray);
console.log(binWidth+"  FFF");
console.log(tickValues);
var axis = d3.axisBottom(scale)
            .tickSize(5).tickArguments(binDivisions);

console.log(tickArray);

var axisGroup = svg.append("g")
    .attr("transform", "translate(0,400)")
    .call(axis);

axisGroup.selectAll("text")
  .style("font-size","12px")
   .attr("transform", "translate(" + 23 + ", 0)");


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
            textGroup
                .select(function(d, ind) {
                    return ind === i ? this : null; })
                .style("opacity", 0);
        })
        .on('click', function(d, i) {
            bar_mode = false;
            force_graph = false;
            redraw();
        })

   
}
