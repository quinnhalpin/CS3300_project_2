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
function spoutBalls(ball_svg, ball_svg_width, ball_svg_height, tree_arr, root_loc, full_data, factor_arr){
	//produce n balls from a spout that move down 
	outside_tree = tree_arr;
	var rect = ball_svg.append("rect")
		.attr("x", 200)
		.attr("y", 40)
		.attr("fill", "red")
		.attr("stroke", "black")
		.attr("width", 10)
		.attr("height", 20);

	// var gaussian = d3.randomUniform(0, 15.0);
	// //var gaussian = d3.randomNormal(7, 2);
	// var gaussian_arr = [];
	// var dict = {};
	//var arr_dict = [];
	// for (i = 0; i < n; i++){
	// 	var rand = Math.round(gaussian());
	// 	if (dict[rand] == undefined){
	// 		dict[rand] = 1;
	// 	}
	// 	else{
	// 		dict[rand] = dict[rand] + 1;
	// 	}
	// 	arr_dict.push({data:rand, count:dict[rand]});
	// 	gaussian_arr.push(rand);
	// }
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
	console.log(dict)
	var pad = 20;
	var x_scale = d3.scaleLinear().domain([4*d3.min(student_results), 4*d3.max(student_results)])
			.range([pad,ball_svg_width - pad]);


	// var straight_arr = [];
	// for (i = 0; i < n; i++){
	// 	straight_arr.push(ball_svg_width/n * i)
	// }

	var circles = ball_svg.selectAll("circle").data(arr_dict.reverse());
	var i = 0;
	pointer = [];
	for (j = 0; j < Object.keys(tree_arr).length; j++){
		pointer[j] = 0;
	}
	moveCircle(arr_dict, ball_svg_width, ball_svg_height, tree_arr, ball_svg, full_data.length, root_loc);
	return tree_arr;	
}

var tree_lengthsL = [];
var tree_lengthsR = [];

var total_tree = {};
var count = 0;

function createTree(svg_id,root_loc, height, width, splits, tree_struct){
	//create a tree based on the number of splits given
	if (splits < 2){
		total_tree[count] = tree_struct;
		count += 1;
		return tree_struct;
	}
	if (splits > 1){
		svg_id.append("line")
		.attr("class", "estimated")
		.attr("x1", root_loc.x + 1)
		.attr("y1", root_loc.y)
		.attr("x2", root_loc.x - width/2)
		.attr("y2", root_loc.y + height/4 - 5)
		.style("stroke-width", "5px")
		.style("stroke", "#8a8988");

		svg_id.append("line")
		.attr("class", "estimated")
		.attr("x1", root_loc.x - width/2)
		.attr("y1", root_loc.y + height/4 - 7)
		.attr("x2", root_loc.x - width/2)
		.attr("y2", root_loc.y + height/4 - 2)
		.style("stroke-width", "5px")
		.style("stroke", "#8a8988");

		svg_id.append("line")
		.attr("class", "estimated")
		.attr("x1", root_loc.x - 1)
		.attr("y1", root_loc.y)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 - 5)
		.style("stroke-width", "5px")
		.style("stroke", "#8a8988");

		svg_id.append("line")
		.attr("class", "estimated")
		.attr("x1", root_loc.x + width/2)
		.attr("y1", root_loc.y + height/4 - 7)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 - 2)
		.style("stroke-width", "5px")
		.style("stroke", "#8a8988");

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
			height/2, width/2, splits/2, tree_structL);
		tree_lengthsR = createTree(svg_id, 
			{"x":root_loc.x + width/2, "y":root_loc.y + height/4}, 
			height/2, width/2, splits/2, tree_structR);
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

function moveCircle(arr, ball_svg_height, ball_svg_width, tree_arr, svg, n, root_loc){
	//attempt to move circles in a straight line with transitions
	var circles = svg.selectAll("circle").data(arr);
	var speed = 1;
	var delay = 100; 
	var pad = 20;
	circles.enter().append("circle").attr("class", "balls_bouncing")
		.merge(circles)
		.attr("cx", 205)
		.attr("cy", 60)
		.attr("r", 4)
		.attr("id", function (c,i){ return i})
		.style("fill", function(c, i) {
			return "red";})
		.transition()
		.duration(function(d){
			return dist(205, 60, tree_arr[d["data"]][0]["x1"], 
				tree_arr[d["data"]][0]["y1"])/speed;
		})
		.delay(function(d,i) { 
			return delay*(n-i); })
		.attrTween("cy", function(d){
			return d3.interpolateNumber(60, tree_arr[d["data"]][0]["y1"]);})
		.attrTween("cx", function(d){
			return d3.interpolateNumber(205, tree_arr[d["data"]][0]["x1"]);})
		.transition()
		.duration(function(d){
			return dist(tree_arr[d["data"]][0]["x1"], tree_arr[d["data"]][0]["y1"],
			 tree_arr[d["data"]][0]["x2"], tree_arr[d["data"]][0]["y1"])/speed;
		})
		.attrTween("cy", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][0]["y1"], tree_arr[d["data"]][0]["y2"]);})
		.attrTween("cx", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][0]["x1"], tree_arr[d["data"]][0]["x2"]);})
		.transition()
		.duration(function(d){
			return dist(tree_arr[d["data"]][0]["x2"], tree_arr[d["data"]][0]["y2"],
			 tree_arr[d["data"]][1]["x2"], tree_arr[d["data"]][1]["y1"])/speed;
		})
		.attrTween("cy", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][0]["y2"], tree_arr[d["data"]][1]["y2"]);})
		.attrTween("cx", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][0]["x2"], tree_arr[d["data"]][1]["x2"]);})
		.transition()
		.duration(function(d){
			return dist(tree_arr[d["data"]][1]["x2"], tree_arr[d["data"]][1]["y2"],
			 tree_arr[d["data"]][2]["x2"], tree_arr[d["data"]][2]["y2"])/speed;
		})
		.attrTween("cy", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][1]["y2"], tree_arr[d["data"]][2]["y2"]);})
		.attrTween("cx", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][1]["x2"], tree_arr[d["data"]][2]["x2"]);})
		.transition()
		.duration(function(d){
			return dist(tree_arr[d["data"]][2]["x2"], tree_arr[d["data"]][2]["y2"],
			 tree_arr[d["data"]][3]["x2"], tree_arr[d["data"]][3]["y2"])/speed;
		})		
		.attrTween("cy", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][2]["y2"], tree_arr[d["data"]][3]["y2"]);})
		.attrTween("cx", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][2]["x2"], tree_arr[d["data"]][3]["x2"]);})
		.transition()
		.duration(function(d){
			return dist(tree_arr[d["data"]][3]["x2"], tree_arr[d["data"]][3]["y2"],
			tree_arr[d["data"]][3]["x2"], ball_svg_height - pad - 4*d["count"])/speed;
		})
		.attrTween("cy", function(d){
			return d3.interpolateNumber(tree_arr[d["data"]][3]["y2"], ball_svg_height - pad - 4*d["count"]);})
		.transition()
		.delay(function(d,i){ return delay*(i);})
		.duration(2000)
		.attrTween("opacity", function(d){
			return d3.interpolateNumber(100,0);})
}