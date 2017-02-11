var a1 = [];
var a2 = [];
var a3 = [];
var a4 = [];

var max_in_array;
var min_in_array;
var frequencies, max_freq, min_freq;

var bar_mode = true; //true => bar chart, false => pie chart
var force_graph = false;
var svg;
var w = 750;
var h = 420;
var paddingTop = 20;
var binWidth = 0;
var binDivisions = 5;
var mousePosition = {
    x: undefined,
    y: undefined
}
var c20 = d3.schemeCategory20;

dataset = [];

var click_handler = function(var_name) {
    // console.log(var_name);
    if (var_name == 'age') {
        dataset = a1;
        redraw();
    } else if (var_name == 'college') {
        dataset = a2;
        redraw();
    } else if (var_name == 'delay') {
        dataset = a4;
        redraw();
    }
}

var init = function() {

    svg = d3.select("body")
        // .classed('no-mouse',true)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    d3.select('#scrollDiv')
        .on('mouseenter', function(d) {

        })
        .on('mousemove', function(d, i) {
            var coordinates = d3.mouse(this);
            var x = coordinates[0];
            var y = coordinates[1];
            // console.log(x);
            // console.log(y);

            if (mousePosition.x == undefined)
                mousePosition.x = 0;
            if (mousePosition.y == undefined)
                mousePosition.y = 0;

            if (x - mousePosition.x > 30) {
                mousePosition.x = x;
                if (binDivisions < 10) {
                    binDivisions++;
                    redraw();
                }

            }
            if (x - mousePosition.x < -30) {
                mousePosition.x = x;
                if (binDivisions >= 2) {
                    binDivisions--;
                    redraw();
                }
            }

        });
    d3.csv("test.csv", function(data) {
        console.log(data.columns);

        d3.select('.dropdown-content').selectAll('a')
            .data(data.columns).enter().append('.dropdown-content:a').attr('href', '#')
            .text(function(c) {
                console.log(c);
                return c;
            })
            .on('click', function(d) {
                click_handler(d);
            })

        data.forEach(function(d) {
            a1.push((+d.age));
            a2.push(+d.college);
            a3.push(+d.hs);
            a4.push(+d.delay);
        })
        dataset = a4;
        redraw();
    });
    console.log(a4);

}
