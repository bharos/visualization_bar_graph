var a1 = [];
var a2 = [];
var a3 = [];
var a4 = [];
var a5 = [];

var max_in_array;
var min_in_array;
var frequencies, max_freq, min_freq;

var bar_mode = true; //true => bar chart, false => pie chart
var force_graph = false;
var svg;

var margin = {top: 20, right: 70, bottom: 50, left: 70},
    w = 750 - margin.left - margin.right,
    h = 420 - margin.top - margin.bottom;

var paddingTop = 20;
var binWidth = 0;
var binDivisions = 5;
var mousePosition = {
    x: undefined,
    y: undefined
}
var c20 = d3.schemeCategory20;

dataset = [];

var click_handler = function() {
    
      var selectBox = document.getElementById("select-var");
    var var_name = selectBox.options[selectBox.selectedIndex].value;
    
    console.log(var_name);
    if (var_name == 'X1') {
        dataset = a1;
        redraw();
    } 
     else if (var_name == 'X2') {
        dataset = a2;
        redraw();
    }
    else if(var_name == 'X3')
    {
    	dataset = a3;
    	redraw();
    }
    else if(var_name == 'X4')
    {
    	dataset = a4;
    	redraw();
    }
    else if(var_name == 'Y')
    {
    	dataset = a5;
    	redraw();
    }
    console.log(dataset);
}

var init = function() {

    svg = d3.select("body")
        // .classed('no-mouse',true)
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h  + margin.top + margin.bottom);

    d3.select('#scrollDiv')
        .on('mouseenter', function(d) {
        	var coordinates = d3.mouse(this);
            var x = coordinates[0];
            var y = coordinates[1];
        	mousePosition.x = x;
        	mousePosition.y = y;
        })
        .on('mousemove', function(d, i) {
            var coordinates = d3.mouse(this);
            var x = coordinates[0];
            var y = coordinates[1];

            if (mousePosition.x == undefined)
                mousePosition.x = 0;
            if (mousePosition.y == undefined)
                mousePosition.y = 0;

            if (x - mousePosition.x > 30) {
                mousePosition.x = x;
                if (binDivisions < 9) {
                    binDivisions++;
                    redraw();
                }

            }
            if (x - mousePosition.x < -30) {
                mousePosition.x = x;
                if (binDivisions > 2) {
                    binDivisions--;
                    redraw();
                }
            }

        });
    d3.csv("aircraft.csv", function(data) {
        console.log("GGGGGGGGGGGGGGGGGGG");
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
            a1.push((+d.X1));
            a2.push(+d.X2);
            a3.push(+d.X3);
            a4.push(+d.X4);
            a5.push(+d.Y);
        })
        dataset = a1;
        redraw();
    });
    console.log(a1);

}
