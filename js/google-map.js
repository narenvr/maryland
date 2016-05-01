// // queue()
// //   .defer(d3.json, "data/maryland-counties.geojson")
// //   //.defer(d3.json, "http://www.cis.umassd.edu/~dkoop/dsc530/a3/trips.json")
// //   .await(makeMyMap);


// /*
// queue()
//   .defer(d3.json, "https://raw.githubusercontent.com/frankrowe/maryland-geojson/master/maryland-counties.geojson")
//   //.defer(d3.json, "http://www.cis.umassd.edu/~dkoop/dsc530/a3/trips.json")
//   .await(makeMyMap);
// */

// var path, projection,zoom, svg, g;
// var width = 960,
//     height = 500,
//     centered;
// // function makeMyMap(error, states, trips) {
// //   if(error)
// //     throw error;


//  projection = 
//     d3.geo.albersUsa()
//   .scale(12000)
//   .translate([width / 2-3000, height / 2+350]);

//   path = d3.geo.path()
//   .projection(projection);

//  // zoom = d3.behavior.zoom()
//  //    .translate(projection.translate())
//  //    .scale(projection.scale())
//  //    .scaleExtent([height, 8 * height])
//  //    .on("zoom", zoomed);

 
//  svg = d3.select('#map').append('svg')
//     .attr('width', width)
//     .attr('height', height);//.on("click", clicked);;
 
// svg.append("rect")
//     .attr("class", "background")
//     .attr("width", width)
//     .attr("height", height)
//     .on("click", clicked);
 


//    g = svg.append("g");
//   d3.json("data/maryland-counties.geojson", function(error, states) {
//     if (error) throw error;
//     g.append("g")
//       .attr("id", "states").selectAll("path")
//     .data(states.features)
//     .enter().append("path")
//       .attr("d", path).on("click", clicked);//.style("stroke-width", 1.5 / 4 + "px");




//       var CA = [];
//       states.features.forEach(function (d) {
//         CA.push(d);
//       });

//       // console.log(CA);
//       //   svg.selectAll("circle")
//       //     .data(CA)
//       //     .enter().append("circle")
//       //     .attr("r", "6")
//       //     .style("fill", "black")
//       //     .attr("transform",function(d){                 
//       //     var p = projection(d3.geo.centroid(d)); 
//       //     return "translate("+p+")";
//       //   }).on("click", clicked);

//   });
  

//   function clicked(d) {
//   var x, y, k;

//   if (d && centered !== d) {
//     var centroid = path.centroid(d);
//     x = centroid[0];
//     y = centroid[1];
//     k = 4;
//     centered = d;
//   } else {
//     x = width / 2;
//     y = height / 2;
//     k = 1;
//     centered = null;
//   }
//   console.log(d.properties.name);
//   g.selectAll("path")
//       .classed("active", centered && function(d) { return d === centered; });
//       $("#input_file").click();
//   g.transition()
//       .duration(750)
//       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//       .style("stroke-width", 1.5 / k + "px");

//   // g.selectAll("circle")
//   //     .classed("active", centered && function(d) { return d === centered; });

//   // g.transition()
//   //     .duration(750)
//   //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//   //     .style("stroke-width", 1.5 / k + "px");
// }


// //}

// // function clicked(d) {
// //   var centroid = path.centroid(d),
// //       translate = projection.translate();

// //   projection.translate([
// //     translate[0] - centroid[0] + width / 2,
// //     translate[1] - centroid[1] + height / 2
// //   ]);

// //   zoom.translate(projection.translate());

// //   g.selectAll("path").transition()
// //       .duration(700)
// //       .attr("d", path);
// // }

// // function zoomed() {
// //   projection.translate(d3.event.translate).scale(d3.event.scale);
// //   g.selectAll("path").attr("d", path);
// // }




