var outside_tree;
var x_scale;
var grades_1;
var after_transition = false;
var circles;
var speed;
var speed_down;
var delay =80;
var pad;
var full_paths;
var y_scale_perc;
var full_tree_arr;
var running = false;
function determineTreeBox(person, function_arr){
	//take multiple boolean functions and use them to determine path of person
	//assume f1 is top tree level, ... fn is bottom
	//places each person into a category from 0 (on left) to 2^(length(function_arr))-1
	function_arr = function_arr.reverse();
	return function_arr.map(function(f,ind) {
			return f(person)*Math.pow(2,ind)
		}).reduce(function(x,acc){return acc+x});
}
function spoutBalls(ball_svg, ball_svg_width, ball_svg_height, tree_arr, root_loc, full_data, factor_obj){
	//produce n balls from a spout that move down 
	full_paths = paths;
	outside_tree = tree_arr;
	g_ball_svg = ball_svg;
	paths.forEach(function(path){
		path.on("mouseover", function () {
				data = Number(this.id.substring(this.id.indexOf("_") + 1))
				showSign(ball_svg, data, tree_arr, factor_obj, 1);
			})
			.on("mouseout", function () {
				hideSign(ball_svg);
			})
	})	
	

	var attrib_intersect = [];
	var circle_data = [];
	
	var results = full_data["ball_data"].map(function(x){
		attrib_intersect[x] = attrib_intersect[x] ? attrib_intersect[x] + 1 : 1;
		circle_data.push({data: x, count:attrib_intersect[x]});
		return x;
	})

	var pad = 20;
	x_scale = d3.scaleLinear().domain([4*d3.min(results), 4*d3.max(results)])
			.range([pad,ball_svg_width - pad]);

	var circles = ball_svg.selectAll("circle").data(circle_data.reverse());
	var i = 0;
	moveCircle(circle_data, ball_svg_width, ball_svg_height, tree_arr, ball_svg, full_data["ball_data"].length, root_loc, factor_obj);
	return tree_arr;	
}

var tree_lengthsL = [];
var tree_lengthsR = [];

var total_tree = [];
var count = 0;
var total = 32;

function setClasses(line, low, high){
	/*given a line add all of the categories that line on the tree can take 
	ex categories 0 to 5*/
	var str = "estimated p" + low;
	for (var i = low + 1; i < high + 1; i++){
		str += " p";
		str += i;
	}
	line.attr("class", str);
}

function createTree(svg_id,root_loc, height, width, lower_bound, upper_bound, splits, tree_struct){
	// create a tree based on the number of splits given
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
		.attr("y2", root_loc.y + height/4 - 7)
		.style("stroke-width", "7px")
		.style("stroke", "#03C03C");

		setClasses(long_l, lower_bound, middle);
		
		var short_l = svg_id.append("line")
		.attr("id","tree"+ 0 + "-" + half_splits)
		.attr("x1", root_loc.x - width/2)
		.attr("y1", root_loc.y + height/4 - 10)
		.attr("x2", root_loc.x - width/2)
		.attr("y2", root_loc.y + height/4 + 2)
		.style("stroke-width", "0px")
		.style("stroke", "#C1C389");
        
        

		setClasses(short_l, lower_bound, middle);
		
		var median = (upper_bound + lower_bound +1)/2 
		var long_r = svg_id.append("line")
		.attr("id", "tree"+ median + "-" + full_splits)
		.attr("x1", root_loc.x - 1)
		.attr("y1", root_loc.y)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 - 7)
		.style("stroke-width", "7px")
		.style("stroke", "#FF6961");

		setClasses(long_r, median, upper_bound)

		var short_r = svg_id.append("line")
		.attr("class", "estimated")
		.attr("id", "tree"+ median + "-" + full_splits)
		.attr("x1", root_loc.x + width/2)
		.attr("y1", root_loc.y + height/4 - 10)
		.attr("x2", root_loc.x + width/2)
		.attr("y2", root_loc.y + height/4 + 2)
		.style("stroke-width", "0px")
		.style("stroke", "#BB7980");

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
	//since tree is made recursively, createTreeBegin is the starting point and 
	//returns final tree
	var tree_struct = [];
	g_ball_svg = ball_svg;
	createTree(ball_svg, root_loc, height, width, 0, splits-1, splits, tree_struct);
	return total_tree;	 
}

function dist(x1,y1, x2, y2){
	return Math.sqrt(Math.pow(x1-x2, 2)+ Math.pow(y1-y2, 2));
}

function translateAlong(path) {
	//given a path allows an attribute tween to translate ball along path
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


function showSign(svg, data, tree_arr, factor_obj, fromPath){
	//[showSign] shows the sign that has the data about the category in it
	//fromPath means is the scrolling coming from the path
	d3.selectAll(".pie_fraction_path").attr("opacity", 0.2);
	var selected_pie_fraction = "#pie_section_"+(data+2);
	d3.selectAll(selected_pie_fraction).attr("opacity",1);
	l = tree_arr[0].length-1;
	if (tree_arr[data] == undefined) return;
	var rect = svg.append("rect")
		.attr("id", "show_rect")
		.attr("x", function(){
			return (fromPath) ? tree_arr[data][l]["x2"] - 50: tree_arr[data][l]["x2"] -50;})
		.attr("y", function() { return tree_arr[data][l]["y2"] + 70})
		.attr("fill", "#F4EDE3")
		.attr("stroke", "black")
		.attr("width", 150)
		.attr("height", 100);
	var text = svg.append("text").style("font", "20px Verdana")
		.attr("id", "rect_text")
		.html("")
		.style("font", "14px Verdana")
		.attr("y", function() { return tree_arr[data][l]["y2"] + 70});

	var max_width = 100;
	var d = data;
	for (var i = 0; i < factor_obj.shortened_arr.length; i++){
		/*loop over all the function objects and state whether category
		answers yes or no and append info to little information boxs*/
		var opp_i = factor_obj.shortened_arr.length - 1 - i; 
		var w = text.append("tspan")
			.attr("dy", 20)
			.attr("x",function(){
				return (after_transition) ? 480 :tree_arr[data][l]["x2"] - 40;})
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
		max_width = Math.max(max_width,w.node().getBBox().width + 20);	
	}
	rect.attr("width", max_width);;
	text.append("tspan")
		.attr("dy", 20)
		.attr("x",function(){
			return (after_transition) ? 480 :tree_arr[data][l]["x2"] - 40;})
		.text(
			(category[data].final_num)+ "%");		
	svg.selectAll(".balls_bouncing")
	.attr("opacity", function(d){
		return  (d.data == data) ? 1 : .1;
	});
	d3.selectAll(".estimated").attr("opacity",0.1);
	data_str = ".p" + data;
	d3.selectAll(data_str).attr("opacity",1);
	//make all sections of circle opaque except selected
	
}
function hideSign(svg){
	//[hideSign] hides the rect that displays info about category and 
	//various other aspects like portions of pie and paths on the tree
	d3.selectAll(".pie_fraction_path").attr("opacity",1);
	d3.select("#show_rect").remove();
	d3.select("#rect_text").remove();
	svg.selectAll(".balls_bouncing").attr("opacity", function(){return (after_transition == true) ? 1:1});
	d3.selectAll(".estimated").attr("opacity",1);
	for (var i = 0; i < paths.length; i++){
		paths[i].style("opacity", 0).style("stroke-opacity",0);;
	} 
}

function moveCircle(arr, ball_svg_height, ball_svg_width, tree_arr, svg, n, root_loc, factor_obj){
	/*[moveCircle] moves all of the circles to the starting point and initializes
	ball with right color*/
	svg.selectAll(".balls_bouncing").remove().exit();

	svg.selectAll(".axis_class").remove().exit();
	//attempt to move circles in a straight line with transitions
	full_tree_arr =	tree_arr;
	circles = svg.selectAll(".balls_bouncing").data(arr);
	speed_down = 1;
	delay = 80;
	pad = 20;
	y_scale_perc = d3.scaleLinear().domain([0,100]).range([ball_svg_height-pad, tree_arr[0][2]["y2"] + 20]);
	var y_scale_axis = d3.axisLeft(y_scale_perc).ticks(9).tickSize(9);
	svg.append("g").attr("class", "axis_class").style("font", "10px verdana")
      	.call(y_scale_axis).attr("transform","translate(70,0)");	

	var toppy = svg.append("path").attr("d", "M 205 60 L " + root_loc.x + " " + root_loc.y);

	circles = circles.enter().append("circle").attr("class", "balls_bouncing")
		.merge(circles)
		.attr("transform", (d) => "translate("+(root_loc.x - 1)+ ","+ (root_loc.y-15)+")")
		.attr("r", 5.5)
		.attr("id", function (c,i){ 
			return c.data;
		})
		.on("mouseover", function (c) {
			showSign(svg, c.data, tree_arr, factor_obj,0);
		})
		.on("mouseout", function (c) {
			hideSign(svg);
		})
		.style("fill", function(c, i) {
			return category[c.data].color});

}


function initial_ball_transition(button){
	//times balls so that they are going out one by one on time
	//and move down tree

	speed = .20;
	speed_down = .5;
	delay = 100;
	pad = 20;
	// root_loc = {"x": 305, "y": 70};
	root_loc = {"x": ball_svg_width/2, "y": ball_svg_height*.1};
	n = 100;
	category_update = category;
	var category_at_start = category.reduce((a,x) => {a.push({num_units: x.num_units}); return a}, []);
	if(button) button.attr("disabled", "disabled")
	var is_checked = d3.select("#skip_animation").property("checked");	
	nullspace = 0;
	
	circles.transition()
	.attr("transform", (d) => "translate("+(root_loc.x - 1)+ ","+ (root_loc.y-15)+")")
	.transition()
	.on("start", () => running = true)
	.duration(function(d){
		return (is_checked)? 0: 10/speed;
	})
	.delay(function(d,i) { 
		return (is_checked)? 0: delay*(n-i); })
	.attr("transform", (d) => "translate(" + root_loc.x + "," + root_loc.y + ")")
	.on("end", (d,i)=>{
		category_update[d.data].num_units -= 1;
		nullspace += 1;
		if (!is_checked) make_large_pie(category_update, nullspace);
	})
	.transition()
	.duration(function(d) {
		return (is_checked)? 0: full_paths[d.data].node().getTotalLength()/speed})
  	.attrTween("transform", function(d){
  		return translateAlong(full_paths[d["data"]].node());})
  	.transition()
	.duration(function(d){
	l = full_tree_arr[0].length-1;
	return  (is_checked) ? 0: dist(full_tree_arr[d["data"]][l]["x2"], full_tree_arr[d["data"]][l]["y2"],
	full_tree_arr[d["data"]][l]["x2"], y_scale_perc(d["count"]))/speed_down;
	})
	.attr("transform", (d,i) =>{
			
			return "translate("+tree_arr[d["data"]][l]["x2"]+","+(y_scale_perc(d["count"]))+")"
		})
	.on("end", (d,i)=>{
		if(i == 0 && button){
			button.attr("disabled", null);
			make_large_pie(category_at_start, 0, 1000)			
		}
	})
}


function make_large_pie( categories, nullspace, duration){
	//make a large pie that will be based on data of selected dataset
	pie_path = ball_svg.selectAll(".pie_fraction_path");
	nullspace = nullspace || 0;
	duration = duration || 15;

	var total = categories.reduce((a, x) => x.num_units + a, 0) + nullspace;
	var sofar = nullspace * 2 * Math.PI / total;
	var cat = [{startAngle: 0, endAngle: sofar}].concat(categories.map((x) => {
		var res = {};
		res.startAngle = sofar;
		res.endAngle = sofar + x.num_units * 2 * Math.PI / total;
		sofar = res.endAngle;
		return res;
	}))
	var radius = 100;

	
	var arc = d3.arc()
    .innerRadius(radius/2)
    .outerRadius(radius - 20);

	pie = d3.pie()
	    .value(function(d) { 
	    	return d.num_units; })
	    .sort(null);

    pie_path = pie_path.data(cat);

	pie_path.enter().append("path").attr("class", "pie_fraction_path")
    	.attr("fill", function(d, i) {
    		 return (i==0) ? '#dddddd' : category[(i-1)].color; })
	    .attr("id", function(d,i){ 
	      	return "pie_section_" + (i+1)})
	    .each(function(d) {this._current_angle = d; }) //store initial angles
	    .attr("transform", "translate(" +(ball_svg_width *.9 )+","+ (ball_svg_height*1/5)+")")
		.merge(pie_path)
		.on("mouseover", function (d,i) {
			showSign(ball_svg, i-1, tree_arr, factor_obj, 0);
		})
		.on("mouseout", function (d,i) {
			hideSign(ball_svg);
		})
		.transition()
        .duration(duration)
        .attrTween("d", arcTween);

	pie_path.exit().remove();

	function arcTween(a) {
	  var i = d3.interpolate(this._current_angle, a);
	  this._current_angle = i(0);
	  return function(t) {
	    return arc(i(t));
	  };
	}
}
//global variables for mini pies
sofar_mini = []
total_mini = []
cat_mini = []
res_mini = []
mini_pie = []
mini_pie_path = []
arc_mini = []
called_boolean_pies = 0;
function make_boolean_pies(ind, question){
	/*[make_boolean_pies] makes all of the boolean pies that go to the left of 
	the tree and displays how many people in dataset say yes and no to each 
	boolean function [question] */
	mini_pie_path[ind] = ball_svg.selectAll(".mini_pie_fraction_path_"+ind);
	total_mini[ind] = function_data_arr[ind].reduce((a, x) => x + a, 0);
	sofar_mini[ind] = 0;
	cat_mini[ind] = function_data_arr[ind].map((x) => {
		res_mini[ind] = {};
		res_mini[ind].startAngle = sofar_mini[ind];
		res_mini[ind].endAngle = sofar_mini[ind] + x * 2 * Math.PI / total_mini[ind];
		sofar_mini[ind] = res_mini[ind].endAngle;
		return res_mini[ind];
	})
	var radius_mini = 20;
	
	arc_mini[ind] = d3.arc()
    .innerRadius(radius_mini/2)
    .outerRadius(radius_mini);

	mini_pie[ind] = d3.pie()
	    .value(function(d) { 
	    	return d; })
	    .sort(null);
    mini_pie_path[ind] = mini_pie_path[ind].data(cat_mini[ind]);

	mini_pie_path[ind].enter().append("path").attr("class", "mini_pie_fraction_path_"+ind + " mini_pie_fraction_path")
    	.attr("fill", function(d, i) { 
    		return (i==0) ? "#03C03C" : "#FF6961"; })
	    .attr("id", function(d){ 
	      	return "pie_section_" + ind})
	    .each(function(d) {this._current_angle = d; }) //store initial angles
	    .attr("transform", "translate(" +(tree_arr[0][ind].x1+ 1/2*(tree_arr[0][ind].x2-tree_arr[0][ind].x1) - 60)+","+
	    (tree_arr[0][ind].y1+ 1/2*(tree_arr[0][ind].y2-tree_arr[0][ind].y1) - 10 + ind*9)+")")
		.merge(mini_pie_path[ind])
		.transition()
		// .delay(delay)
        .duration(2000)
        .attrTween("d", arcTween);
     

	if (called_boolean_pies < factor_obj.factor_arr.length){
	    text_for_mini_pie = ball_svg.append("text")
	    .attr("class", "mini_pie_"+ind+"_text")
	    .attr("class", "mini_pie_"+ind+"_text mini_pie_text")
	    .attr("text_anchor","middle")
	    .text(question)
	    .style("font", "14px")
	    .style("font-family", "verdana")
		.attr("x", ()=>{ 
			return tree_arr[0][ind].x1+ 1/2*(tree_arr[0][ind].x2-tree_arr[0][ind].x1) - 60;
		})
		.attr("y", tree_arr[0][ind].y1+ 1/2*(tree_arr[0][ind].y2-tree_arr[0][ind].y1) - 35 + ind*9);

		//add percent yes in each pie
		ball_svg.append("text")
	    .attr("class", "mini_pie_"+ind+"_text mini_pie_"+ind+"_text mini_pie_text pie_data_point" + ind)
	    .attr("text_anchor","middle")
	    .text(function_data_arr[ind][0])
	    .style("font", "14px times")
	    .style("fill", "#03C03C")
		.attr("x", ()=>{ 
			return tree_arr[0][ind].x1+ 1/2*(tree_arr[0][ind].x2-tree_arr[0][ind].x1) - 60;
		})
		.attr("y", tree_arr[0][ind].y1+ 1/2*(tree_arr[0][ind].y2-tree_arr[0][ind].y1) - 5 + ind*9);
	}
	else{
		class_text_name  = ".mini_pie_" + ind+"_text";
		pie_data_name  = ".pie_data_point" + ind;
		d3.selectAll(class_text_name).text(question)
		d3.selectAll(pie_data_name).text(function_data_arr[ind][0])
	}
	function arcTween(a) {
	  var i = d3.interpolate(this._current_angle, a);
	  this._current_angle = i(0);
	  return function(t) {
	    return arc_mini[ind](i(t));
	  };
	}
	called_boolean_pies += 1;
}
