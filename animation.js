var outside_tree;
function determineTreeBox(person, function_arr){
	//take multiple boolean functions and use them to determine path of person
	//assume f1 is top tree level, ... fn is bottom
	//places each person into a category from 0 (on left) to 2^(length(function_arr))-1
	function_arr = function_arr.reverse();
	return function_arr.map(function(f,ind) {
			return f(person)*Math.pow(2,ind)
		}).reduce(function(x,acc){return acc+x});
}
function spoutBalls(ball_svg, ball_svg_width, ball_svg_height, tree_arr, root_loc, full_data, factor_arr, paths){
	//produce n balls from a spout that move down 
	outside_tree = tree_arr;
	var rect = ball_svg.append("rect")
		.attr("x", 200)
		.attr("y", 40)
		.attr("fill", "purple")
		.attr("stroke", "black")
		.attr("width", 10)
		.attr("height", 20);

	var dict = {};
	var arr_dict = [];
	var student_results = full_data.map(function(x){
		var box = determineTreeBox(x, factor_arr);
		if (dict[box] == undefined){
			dict[box] = 1;
		}
		else{
			dict[box] = dict[box] + 1;
		}
		arr_dict.push({data:box, count:dict[box]});
		return box
	});
	var pad = 20;
	var x_scale = d3.scaleLinear().domain([4*d3.min(student_results), 4*d3.max(student_results)])
			.range([pad,ball_svg_width - pad]);

	var circles = ball_svg.selectAll("circle").data(arr_dict.reverse());
	var i = 0;
	
	moveCircle(arr_dict, ball_svg_width, ball_svg_height, tree_arr, ball_svg, full_data.length, root_loc, paths);
	return tree_arr;	
}

var tree_lengthsL = [];
var tree_lengthsR = [];

var total_tree = [];
var count = 0;
var total = 32;

function createTree(svg_id,root_loc, height, width, splits, tree_struct){
	//create a tree based on the number of splits given
	if (splits < 2){
		total_tree[count] = tree_struct;
		count += 1;
		return tree_struct;
	}
	var half_splits = splits/2 -1
	var full_splits = splits - 1
	if (splits > 1){
		svg_id.append("line")
		.attr("class", "estimated")
		.attr("id", "tree"+ 0 + "-" + half_splits)
		.attr("x1", root_loc.x + 1)
		.attr("y1", root_loc.y)
		.attr("x2", root_loc.x - width/2)
		.attr("y2", root_loc.y + height/4 - 5)
		.style("stroke-width", "5px")
		.style("stroke", "green");

		svg_id.append("line")
		.attr("class", "estimated")
		.attr("id","tree"+ 0 + "-" + half_splits)
		.attr("x1", root_loc.x - width/2)
		.attr("y1", root_loc.y + height/4 - 7)
		.attr("x2", root_loc.x - width/2)
		.attr("y2", root_loc.y + height/4 - 2)
		.style("stroke-width", "5px")
		.style("stroke", "green");

		var median = splits/2 
		svg_id.append("line")
		.attr("class", "estimated")
		.attr("id", "tree"+ median + "-" + full_splits)
		.attr("x1", root_loc.x - 1)
		.attr("y1", root_loc.y)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 - 5)
		.style("stroke-width", "5px")
		.style("stroke", "red");

		svg_id.append("line")
		.attr("class", "estimated")
		.attr("id", "tree"+ median + "-" + full_splits)
		.attr("x1", root_loc.x + width/2)
		.attr("y1", root_loc.y + height/4 - 7)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 - 2)
		.style("stroke-width", "5px")
		.style("stroke", "red");

		if (tree_struct != undefined){
			var tree_structL = tree_struct.concat([
			{"x1":root_loc.x + 1, 
			"y1" : root_loc.y, 
			"x2": root_loc.x - width/2, 
			"y2": root_loc.y + height/4 - 5}]);

			var tree_structR = tree_struct.concat([
			{"x1":root_loc.x - 1, 
			"y1" : root_loc.y, 
			"x2": root_loc.x + width/2, 
			"y2": root_loc.y + height/4 - 5}]);

			var tree_struct = tree_struct.concat([
			{"x1":root_loc.x + 1, 
			"y1" : root_loc.y, 
			"x2": root_loc.x - width/2, 
			"y2": root_loc.y + height/4 - 5}]).concat([
			{"x1":root_loc.x - 1, 
			"y1" : root_loc.y, 
			"x2": root_loc.x + width/2, 
			"y2": root_loc.y + height/4 - 5}]);
		}
		else{
			var tree_structL = [
			{"x1":root_loc.x + 1, 
			"y1" : root_loc.y, 
			"x2": root_loc.x - width/2, 
			"y2": root_loc.y + height/4 - 5}];

			var tree_structR = [
			{"x1":root_loc.x - 1, 
			"y1" : root_loc.y, 
			"x2": root_loc.x + width/2, 
			"y2": root_loc.y + height/4 - 5}];
		}
		
		tree_lengthsL = createTree(svg_id, 
			{"x":root_loc.x - width/2, "y":root_loc.y + height/4}, 
			2*height/3, width/2, splits/2, tree_structL);
		tree_lengthsR = createTree(svg_id, 
			{"x":root_loc.x + width/2, "y":root_loc.y + height/4}, 
			2*height/3, width/2, splits/2, tree_structR);
	}
	return tree_lengthsL.concat(tree_lengthsR);
}
function createTreeBegin(ball_svg,root_loc, height, width, splits){
	var tree_struct = [];
	createTree(ball_svg, root_loc, height, width, splits, tree_struct);
	return total_tree;	 
}

function dist(x1,y1, x2, y2){
	return Math.sqrt(Math.pow(x1-x2, 2)+ Math.pow(y1-y2, 2));
}

function addStrings(ball_svg_height, ball_svg_width, tree_arr, svg, question_arr){
	var pad = 200;
	for (var i = 0; i < question_arr.length; i++){
		svg.append("text").style("font", "10px times")
		.text(question_arr[i])
		.attr("x", ball_svg_width- pad)
		.attr("y", tree_arr[0][i]["y1"]);
	}
}
function translateAlong(path) {
  var l = path.getTotalLength();
    return function(t) {
      var p = path.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
}

function determineCategories(data, total){
	var categories = [];
	var twos = [];
	var current  = 0;
	while (Math.pow(2,current)< data){
		categories.push(Math.pow(2,current)-1);
		current += 1;
	}
	categories.push(Math.pow(2,current)-1);
	return categories;
}


function showSign(svg, data, paths){
	//d3.select("#show_rect").attr("opacity", 1);
	//d3.select("#rect_text").attr("opacity", 1)
	//	.text(data);
	svg.selectAll("circle")
	.attr("opacity", function(d){
		return (d.data == data) ? 1 : 0.1;
	})
	d3.selectAll(".estimated").attr("opacity",0.1)

	d3.selectAll("#tree0-0")
	string = "path_" + data;
	// d3.select("#"+string).attr("fill", "yellow").style("opacity",1)
	for (var i = 0; i < paths.length; i++){
		paths[i].style("stroke",  function(){
		return (this.getAttribute("id")== string) ? "yellow": "none";
		}).style("opacity", function(){
		return (this.getAttribute("id")== string) ? 1: 0;})
		.style("stroke-opacity",  1);
	}
}
function hideSign(svg, data, paths){
	//d3.select("#show_rect").attr("opacity", 0);
	//d3.select("#rect_text").attr("opacity", 0);
	svg.selectAll("circle").attr("opacity", 1);
	d3.selectAll(".estimated").attr("opacity",1);
	for (var i = 0; i < paths.length; i++){
		paths[i].style("opacity", 0).style("stroke-opacity",0);;
	} 
	// svg.selectAll("")
	// paths.attr("opacity", function(d){
	// 	return 1;
	// })	
}
function moveCircle(arr, ball_svg_height, ball_svg_width, tree_arr, svg, n, root_loc, paths){
	//attempt to move circles in a straight line with transitions
	
	// var rect = svg.append("rect")
	// 	.attr("id", "show_rect")
	// 	.attr("x", 400)
	// 	.attr("y", 40)
	// 	.attr("fill", "none")
	// 	.attr("opacity", 0)
	// 	.attr("stroke", "black")
	// 	.attr("width", 200)
	// 	.attr("height", 200);
	// var text = svg.append("text").style("font", "20px times")
	// 	.attr("id", "rect_text")
	// 	.text("stuff")
	// 	.attr("x", 500)
	// 	.attr("y", 140)
	// 	.attr("opacity",0);

	var circles = svg.selectAll("circle").data(arr);
	var speed = .1;
	var speed_down = .5;
	var delay = 100; 
	var pad = 20;
	var toppy = svg.append("path").attr("d", "M 205 60 L " + root_loc.x + " " + root_loc.y);

	circles.enter().append("circle").attr("class", "balls_bouncing")
		.merge(circles)
		.attr("transform", "translate(205,60)")
		.attr("r", 4)
		.attr("id", function (c,i){ 
			return c.data;
		})
		.on("mouseover", function (c) {
			showSign(svg, c.data, paths);
		})
		.on("mouseout", function (c) {
			hideSign(svg, c.data, paths);
		})
		.style("fill", function(c, i) {
			return "purple";})
		.transition()
		.duration(function(d){
			return 10/speed;
		})
		.delay(function(d,i) { 
			return delay*(n-i); })
		.attr("transform", (d) => "translate(" + root_loc.x + "," + root_loc.y + ")")
		
		.transition()
		.duration(d => paths[d.data].node().getTotalLength()/speed)
      	.attrTween("transform", function(d){
      		return translateAlong(paths[d["data"]].node());})
		.transition()
		.duration(function(d){
			l = tree_arr[0].length-1;
			return dist(tree_arr[d["data"]][l]["x2"], tree_arr[d["data"]][l]["y2"],
			tree_arr[d["data"]][l]["x2"], ball_svg_height - pad - 4*d["count"])/speed_down;
		})
		.attr("transform", (d) => "translate("+tree_arr[d["data"]][l]["x2"]+","+(ball_svg_height - pad - 4*d["count"])+")")

}