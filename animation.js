var outside_tree;
var x_scale;
var grades_1;
var after_transition = false;
function determineTreeBox(person, function_arr){
	//take multiple boolean functions and use them to determine path of person
	//assume f1 is top tree level, ... fn is bottom
	//places each person into a category from 0 (on left) to 2^(length(function_arr))-1
	function_arr = function_arr.reverse();
	return function_arr.map(function(f,ind) {
			return f(person)*Math.pow(2,ind)
		}).reduce(function(x,acc){return acc+x});
}
function spoutBalls(ball_svg, ball_svg_width, ball_svg_height, tree_arr, root_loc, full_data, factor_obj, paths){
	//produce n balls from a spout that move down 
	outside_tree = tree_arr;
	g_ball_svg = ball_svg;
	var rect = ball_svg.append("rect")
		.attr("x", 300)
		.attr("y", 40)
		.attr("id", "spout")
		.attr("fill", "purple")
		.attr("stroke", "black")
		.attr("width", 10)
		.attr("height", 20);
	paths.forEach(function(path){
		path.on("mouseover", function () {
				data = Number(this.id.substring(this.id.indexOf("_") + 1))
				showSign(ball_svg, data, paths, tree_arr, factor_obj, 1);
			})
			.on("mouseout", function () {
				hideSign(ball_svg, data, paths);
			})
	})	
	

	var attrib_intersect = [];
	var circle_data = [];
	
	var results = full_data["ball_data"].map(function(x){
		attrib_intersect[x] = attrib_intersect[x] ? attrib_intersect[x] + 1 : 1;
		circle_data.push({data: x, count:attrib_intersect[x]});
		return x;
	})


	// var student_results = full_data.map(function(x){
	// 	var category = determineTreeBox(x, factor_obj.factor_arr);
	// 	// console.log(category);

	// 	// normalized_dataset = {"ball_data": [], "special_param": []};
	// 	attrib_intersect[category] = attrib_intersect[category] ? attrib_intersect[category] + 1 : 1;

	// 	circle_data.push({data:, count:attrib_intersect[category]});
	// 	return category;
	// });
	console.log(circle_data)
	// console.log("Grades per category ")
	// console.log( grades_per_category)
	var pad = 20;
	x_scale = d3.scaleLinear().domain([4*d3.min(results), 4*d3.max(results)])
			.range([pad,ball_svg_width - pad]);

	var circles = ball_svg.selectAll("circle").data(circle_data.reverse());
	var i = 0;
	// console.log(factor_obj)
	moveCircle(circle_data, ball_svg_width, ball_svg_height, tree_arr, ball_svg, full_data["ball_data"].length, root_loc, paths, factor_obj);
	return tree_arr;	
}

var tree_lengthsL = [];
var tree_lengthsR = [];

var total_tree = [];
var count = 0;
var total = 32;

function setClasses(line, low, high){
	var str = "estimated p" + low;
	for (var i = low + 1; i < high + 1; i++){
		str += " p";
		str += i;
	}
	line.attr("class", str);
}

function createTree(svg_id,root_loc, height, width, lower_bound, upper_bound, splits, tree_struct){
	//create a tree based on the number of splits given
	if (splits < 2){
		total_tree[count] = tree_struct;
		count += 1;
		return tree_struct;
	}
	
	var half_splits = splits/2 -1
	var full_splits = splits - 1
	var middle = (upper_bound + lower_bound - 1)/2;
	if (splits > 1){
		var long_l = svg_id.append("line")
		.attr("id", "tree"+ 0 + "-" + half_splits)
		.attr("x1", root_loc.x + 1)
		.attr("y1", root_loc.y)
		.attr("x2", root_loc.x - width/2)
		.attr("y2", root_loc.y + height/4 - 5)
		.style("stroke-width", "5px")
		.style("stroke", "green");

		setClasses(long_l, lower_bound, middle);
		
		var short_l = svg_id.append("line")
		.attr("id","tree"+ 0 + "-" + half_splits)
		.attr("x1", root_loc.x - width/2)
		.attr("y1", root_loc.y + height/4 - 7)
		.attr("x2", root_loc.x - width/2)
		.attr("y2", root_loc.y + height/4 + 2)
		.style("stroke-width", "5px")
		.style("stroke", "green");

		setClasses(short_l, lower_bound, middle);
		
		var median = (upper_bound + lower_bound +1)/2 
		var long_r = svg_id.append("line")
		.attr("id", "tree"+ median + "-" + full_splits)
		.attr("x1", root_loc.x - 1)
		.attr("y1", root_loc.y)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 - 5)
		.style("stroke-width", "5px")
		.style("stroke", "red");

		setClasses(long_r, median, upper_bound)

		var short_r = svg_id.append("line")
		.attr("class", "estimated")
		.attr("id", "tree"+ median + "-" + full_splits)
		.attr("x1", root_loc.x + width/2)
		.attr("y1", root_loc.y + height/4 - 7)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 + 2)
		.style("stroke-width", "5px")
		.style("stroke", "red");

		setClasses(short_r, median, upper_bound)


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
			2*height/3, width/2, lower_bound, middle, splits/2, tree_structL);
		tree_lengthsR = createTree(svg_id, 
			{"x":root_loc.x + width/2, "y":root_loc.y + height/4}, 
			2*height/3, width/2, median, upper_bound, splits/2, tree_structR);
	}
	return tree_lengthsL.concat(tree_lengthsR);
}
function createTreeBegin(ball_svg,root_loc, height, width, splits){
	var tree_struct = [];
	g_ball_svg = ball_svg;
	createTree(ball_svg, root_loc, height, width, 0, splits-1, splits, tree_struct);
	return total_tree;	 
}

function dist(x1,y1, x2, y2){
	return Math.sqrt(Math.pow(x1-x2, 2)+ Math.pow(y1-y2, 2));
}

function addStrings(ball_svg_height, ball_svg_width, tree_arr, svg, question_arr){
	var pad = 200;
	tree_text = d3.selectAll(".tree_text")
	for (var i = 0; i < question_arr.length; i++){
		tree_text.append("text").style("font", "10px times").attr("class","tree_text")
		.text(question_arr[i])
		.attr("x", ball_svg_width- 1.5*pad)
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


function showSign(svg, data, paths, tree_arr, factor_obj, fromPath){
	//[showSign] shows the sign that will have the questions in it
	l = tree_arr[0].length-1;

	var rect = svg.append("rect")
		.attr("id", "show_rect")
		.attr("x", function(){
			return (after_transition) ? 450: (fromPath) ? tree_arr[data][l]["x2"] + 50 : tree_arr[data][l]["x2"] + 50;})
		.attr("y", function() { return after_transition ? 25: 200})
		.attr("fill", "#F4EDE3")
		.attr("opacity", 1)
		.attr("stroke", "black")
		.attr("width", 200)
		.attr("height", 200);
	var text = svg.append("text").style("font", "20px times")
		.attr("id", "rect_text")
		.html("")
		.style("font", "14px times")
		.attr("x", function(){
		return (fromPath) ? tree_arr[data][l]["x2"] :  tree_arr[data][l]["x2"] + 70;})
		.attr("y", function() { return after_transition ? 50: 250});
	var d = data;
	for (var i = 0; i < factor_obj.shortened_arr.length; i++){
		//begin at first question
		var opp_i = factor_obj.shortened_arr.length - 1 - i; 

		text.append("tspan")
			.attr("dy", 20)
			.attr("x",function(){
				return (after_transition) ? 480 :tree_arr[data][l]["x2"] + 70;})
			.text(function() {
				var factor_str = factor_obj.shortened_arr[i];
				if (d>= Math.pow(2,opp_i)){
					d -= Math.pow(2,opp_i);
					factor_str += ": No";
				} else{
					factor_str  += ": Yes";
				}
				return factor_str;
			});		
	}
	svg.selectAll("circle")
	.attr("opacity", function(d){
		return  (d.data == data) ? 1 : .1;
	});
	d3.selectAll(".estimated").attr("opacity",0.1);
	data_str = ".p" + data;
	d3.selectAll(data_str).attr("opacity",1);
}
function hideSign(svg, data, paths){

	d3.select("#show_rect").remove();
	d3.select("#rect_text").remove();
	svg.selectAll("circle").attr("opacity", function(){return (after_transition == true) ? 1:1});
	d3.selectAll(".estimated").attr("opacity",1);
	for (var i = 0; i < paths.length; i++){
		paths[i].style("opacity", 0).style("stroke-opacity",0);;
	} 
}

function moveCircle(arr, ball_svg_height, ball_svg_width, tree_arr, svg, n, root_loc, paths, factor_obj){
	//attempt to move circles in a straight line with transitions

	var circles = svg.selectAll("circle").data(arr);
	var speed = .5;
	var speed_down = 1;
	var delay = 80;
	var pad = 20;
	var y_scale_perc = d3.scaleLinear().domain([0,100]).range([ball_svg_height-pad, 200]);
	var y_scale_axis = d3.axisLeft(y_scale_perc).ticks(9).tickSize(9);
	svg.append("g").style("font", "10px times")
      	.call(y_scale_axis).attr("transform","translate(70,0)");	
	var toppy = svg.append("path").attr("d", "M 205 60 L " + root_loc.x + " " + root_loc.y);

	circles.enter().append("circle").attr("class", "balls_bouncing")
		.merge(circles)
		.attr("transform", "translate(305,60)")
		.attr("r", 4)
		.attr("id", function (c,i){ 
			return c.data;
		})
		.on("mouseover", function (c) {
			showSign(svg, c.data, paths, tree_arr, factor_obj,0);
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
		.duration(function(d) {
			return paths[d.data].node().getTotalLength()/speed})
      	.attrTween("transform", function(d){
      		return translateAlong(paths[d["data"]].node());})
		.transition()
		.duration(function(d){
			l = tree_arr[0].length-1;
			return dist(tree_arr[d["data"]][l]["x2"], tree_arr[d["data"]][l]["y2"],
			tree_arr[d["data"]][l]["x2"], y_scale_perc(d["count"]))/speed_down;
		
		})
		.attr("transform", (d) =>
		  "translate("+tree_arr[d["data"]][l]["x2"]+","+(y_scale_perc(d["count"]))+")")
		.transition()
		// .duration(1000)
		// .delay(function(d,i) {
		// 	return delay*(i); })
		// .attr("transform", (d) => "translate("+ (4*d["count"] + pad)+ "," +  (tree_arr[d["data"]][l]["x2"] + 200 ) +")").transition()
		// .transition()
		// .duration(1000)
		// .attr("opacity", 1)
		// .attr("transform", (d) => "translate("+ (grades_scale(d.grade)) + "," +  (tree_arr[d["data"]][l]["x2"]*2 + 200 ) +")")
		// .transition()
		// .attr("r", (d) => {
		// 	category = d.data;
		// 	grade = d.grade;
		// 	return 1+1.5*grades_per_category[d.data][d.grade];
		// })
		.on("end", function(){
			after_transition = true;
		});


}
