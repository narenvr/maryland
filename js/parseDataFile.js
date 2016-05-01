var selectedCounty;
var fileContent;
var path, projection,zoom, svg, g;
var width = 960,
    height = 500,
    centered;

 projection = 
    d3.geo.albersUsa()
  .scale(12000)
  .translate([width / 2-3000, height / 2+350]);

  path = d3.geo.path()
  .projection(projection);
 
 svg = d3.select('#map').append('svg')
    .attr('width', width)
    .attr('height', height);//.on("click", clicked);;
 
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);
 


   g = svg.append("g");
  d3.json("data/maryland-counties.geojson", function(error, states) {
    if (error) throw error;
    g.append("g")
      .attr("id", "states").selectAll("path")
    .data(states.features)
    .enter().append("path")
      .attr("d", path).on("click", clicked);//.style("stroke-width", 1.5 / 4 + "px");




      var CA = [];
      states.features.forEach(function (d) {
        CA.push(d);
      });
  });
  

  function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }
  console.log(d.properties.name);

  selectedCounty = d.properties.name;
  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });
      if(!fileContent)
      	//console.log("Empty");
      $("#input_file").click();
  else
  	createChart(fileContent);
  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}









function createChart(parseResults){
	fileContent = parseResults;
	//confirmed that this function is executed once after reading the papaparse
	/*
	console.log(i);
	i++;
	*/
	console.log("parsedResults")
	console.log(parseResults);
	console.log('selectedCounty: '+selectedCounty)
	var accidentModes = new Array();
	for(var i = 0; i < parseResults.length; i++){
		//console.log(parseResults[i]);

		//for(var a in parseResults[i]){
			//if(a === "mode"){
				//console.log();
				//accidentModes.push(parseResults[i][a]);
				if(i === 0){
				console.log("13th: "+parseResults[i]["COUNTY_NAME"]);
				console.log("14th: "+parseResults[i]["INJURY"])
			}

				if(parseResults[i]["COUNTY_NAME"] === selectedCounty){

				var found = accidentModes.some(function (el) {
		    //return el.modeName === parseResults[i]["mode"]+'';
		    return el.modeName === parseResults[i]["COLLISION_WITH_1"]+'';
		  });
		  if (!found) { 
		  	//arr.push({ id: id, username: name }); 
		  	//accidentModes.push({modeName:parseResults[i]["mode"]+'', count:1, injuries:parseResults[i]["injuries"] });
		  	if(parseResults[i]["INJURY"] === 'YES')
		  	accidentModes.push({modeName:parseResults[i]["COLLISION_WITH_1"]+'', count:1, injuries:1 });
		  	else
		  		accidentModes.push({modeName:parseResults[i]["COLLISION_WITH_1"]+'', count:1, injuries:0 });
		  }else{
		  	for(var x = 0; x < accidentModes.length; x++){
		  		//if(topCities != ){
		  		//if(accidentModes[x].modeName === parseResults[i]["mode"]+''){
		  			if(accidentModes[x].modeName === parseResults[i]["COLLISION_WITH_1"]+''){
		  			var count = accidentModes[x].count;
		  			count++;
		  			var injury = accidentModes[x].injuries;
		  			if(parseResults[i]["INJURY"] === 'YES')
		  				injury = injury + 1;
		  				//injury = injury + parseResults[i][14];
		  			accidentModes[x].count = count;
		  			accidentModes[x].injuries = injury;
		  		}
		  		//}
		  	}
		  }

}

			//}
		//}
	}
	/*
	//removing duplicates
	accidentModes = accidentModes.filter( function( item, index, inputArray ) {
           return inputArray.indexOf(item) == index;
    });*/
    console.log("accidentMode Size: "+accidentModes.length);
	accidentModes.forEach(function (d) {
	  	console.log(d);
	});


console.log("generate chart");
d3.select("#chart").select("svg").remove();
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            //var formatPercent = d3.format(".0%");

            var y = d3.scale.linear()
               .domain([0,100])
               .range([height, 0]);

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1)
                .domain(d3.entries(accidentModes).map(function(d) { return d.key }));
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat(function(d){return accidentModes[d].modeName});

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");//.tickFormat(formatPercent);;

            var svg = d3.select("#chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

              svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Percent");

            svg.selectAll(".barsuccess")
                    .data(d3.entries(accidentModes))
                .enter().append("rect")
                    .attr("class", "barsuccess")
                    .attr("x", function(d) { return x(d.key) })
                    .attr("width", x.rangeBand()/2)
                    .attr("y", function(d) { console.log(d.value.injuries);return y(parseFloat(d.value.injuries) / 10); })
                    .attr("height", function(d) { return height - y(parseFloat(d.value.injuries) / 10); })
                    .style( "fill", function(d){return "blue"});

                     // $("#map").addClass('hiddenfile');



}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

 function handleFileSelect(evt){
// 	//var tempFile = getJSON('https://gist.githubusercontent.com/narenvr/9938676e50ae9027459715863393944d/raw/afc128cb3298f7506138d2c36d915d1c104ecfd7/MarylandVehicleAccident.csv', function(err, data) {
//   // if (err != null) {
//   //   alert('Something went wrong: ' + err);
//   // } else {
//   //   alert('Your Json result is:  ' + data.result);
//     return data.result;
//   // }
// });


	var file = evt.target.files[0];
	Papa.parse(file,{
		header: true,
        dynamicTyping: true,
		complete:function(results){
			//console.log(results.data);
fileContent = results.data;
			//createChart(results.data);

			//console.log(results.data);
			//addResultArr(results);
			//var data = results.data;
			//$(".graphcontainer").append("<div class='parse'>" + data + "</div>");
			// var formatted = JSON.stringify(data, null, 2);
    		//$("<div class='parse'></div>").text(formatted).appendTo(".graphcontainer");
		}
	})
	//console.log(temp);
	//callback();
}

$("document").ready(function(){

	$("#input_file").change(handleFileSelect);
//handleFileSelect();
	//$("#input_file").css('opacity','0');
	//$("button").click(function() {
//$("#input_file").trigger('click');
//});
   //$("#input_file").click();
	



	//alert("initialization");
	//var file = new File([""], "data/CAData.csv");
	// $("#input_file").change(function(){
	// 	//alert("changed");
	// 	// console.log($(this))
	// 	// $(this).parse({

	// 	// 	config:{
	// 	// 		delimiter: ","
	// 	// 	},
	// 	// 	before:function(file, inputElem){
	// 	// 		console.log('before');
	// 	// 		console.time("ParseTime");
	// 	// 	},
	// 	// 	error:function(err, file, inputElem){
	// 	// 		console.log('err');
	// 	// 	},
	// 	// 	complete:function(results,file,inputElem,event){
	// 	// 		console.timeEnd("ParseTime");
	// 	// 		console.log(results);
	// 	// 		var output;
	// 	// 		for(var i=0; i < results.results.rows.length; i++){
	// 	// 			var k = results.results.rows[i];
	// 	// 			console.log(k);

	// 	// 		}
	// 	// 		$('#results').html(output);
	// 	// 	}
	// 	// });
	// });
	// var parsed = Papa.parse(inputFile, {
	// 	delimiter: ",",
	//     complete: function(results) {
	//         console.log(results);
	//     }
	// });
	//console.log(parsed.data.);
	// parsed.data.forEach(function (d) {
	// 	console.log(d);
	// });
})