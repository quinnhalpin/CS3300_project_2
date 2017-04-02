function moveDown(){
	//move down
	return function(d, index, a){
		console.log(d)
		//var interpolate = d3.interpolate(data.x, data.x+10);
		return function(t){
			//data.x = interpolate(t);
			//return data.x + 10;	
		}
	}
}

function spoutBalls(n, id){
	//produce n balls from a spout that move down 
	ball_svg_height = 400;
	ball_svg_width = 400;
	
	var ball_svg = d3.select(id).append("svg")
	.attr("height", ball_svg_height)
	.attr("width", ball_svg_width);

	var rect = ball_svg.append("rect")
		.attr("x", 200)
		.attr("y", 40)
		.attr("fill", "purple")
		.attr("stroke", "black")
		.attr("width", 10)
		.attr("height", 20);
	var gaussian = d3.randomNormal(4.0, 2.0);
	var gaussian_arr = [];
	var dict = {};
	var arr_dict = [];
	for (i = 0; i < n; i++){
		var rand = Math.round(gaussian());
		if (dict[rand] == undefined){
			dict[rand] = 1;
		}
		else{
			dict[rand] = dict[rand] + 1;
		}
		arr_dict.push({data:rand, count:dict[rand]});
		gaussian_arr.push(rand);
	}
	var pad = 20;
	var x_scale = d3.scaleLinear().domain([4*d3.min(gaussian_arr), 4*d3.max(gaussian_arr)])
			.range([pad,ball_svg_width - pad]);
	console.log(gaussian_arr);
	var circles = ball_svg.selectAll("circle").data(arr_dict.reverse());
	var i = 0;
	circles.enter().append("circle").attr("class", "balls_bouncing")
		.merge(circles)
		.attr("cx", function(c, i){
			return 205;
		})
		.attr("cy", function(c, i){
			return 60;
		})
		.attr("r", 4)
		.style("fill", function(c, i) {
			return "purple";
		})
		.transition()
	    .duration(2500)
	    .delay(function(d,i) { return 100*(n-i); })
	    .on("start", function repeat() {
	        d3.active(this)
	            .attr("cy", function(d){
	            	return 380 - 4*d["count"];})
	            .attr("cx", function(d){
	            	return x_scale(4*d["data"]);})
	        i += 3;
      });

}