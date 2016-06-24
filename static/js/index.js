$(function(){
    var alpha = 0.0;
    var beta = 0.0;
    var gamma = 0.0;
    var slc_orient = $("#dev_orient");
    var slc_gAlpha = $("#graph_alpha");
    var slc_gBeta  = $("#graph_beta");
    var slc_gGamma = $("#graph_gamma");
    var slc_gtest = $("#graph_test");
    var padding = {"x": 30, "y":30};
    var hasOrtEvent = false;

    function setOrientVal(opt_alpha, opt_beta, opt_gamma){
        slc_orient.find(".alpha")
                  .children(".val")
                  .text(opt_alpha);

        slc_orient.find(".beta")
                  .children(".val")
                  .text(opt_beta);

        slc_orient.find(".gamma")
                  .children(".val")
                  .text(opt_gamma);
    }


    // --- set graph
    var stage_alpha = d3.select("#graph_alpha")
                        .append("svg:svg")
                        .attr("width", slc_gAlpha.width())
                        .attr("height", 200);

    var stage_beta  = d3.select("#graph_beta")
                        .append("svg:svg")
                        .attr("width", slc_gBeta.width())
                        .attr("height", 200);

    var stage_gamma = d3.select("#graph_gamma")
                        .append("svg:svg")
                        .attr("width", slc_gGamma.width())
                        .attr("height", 200);

    var stage_gtest= d3.select("#graph_test")
                        .append("svg:svg")
                        .attr("width", slc_gtest.width())
                        .attr("height", 200);

    var xScale = d3.scale.linear()
                   .domain([0, 100])
                   .range([padding.x, slc_gAlpha.width() - padding.x]);

    var yScale360 = d3.scale.linear()
                      .domain([0, 360])
                      .range([slc_gAlpha.height() - padding.y, padding.y]);

    var yScale90  = d3.scale.linear()
                      .domain([-90, 90])
                      .range([slc_gAlpha.height() - padding.y , padding.y]);

    var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .innerTickSize(-1 * (slc_gAlpha.height() -2 * padding.y) )
                  .orient("buttom");

    var yAxis360 = d3.svg.axis()
                     .scale(yScale360)
                     .orient("left")
                     .innerTickSize( -1 * (slc_gAlpha.width() - 2 * padding.x));

    var yAxis90  = d3.svg.axis()
                     .scale(yScale90)
                     .orient("left")
                     .innerTickSize( -1 * (slc_gAlpha.width() - 2 * padding.x));


    var colors = d3.scale.category10();
    var d3Line360 = d3.svg.line()
                      .x(function(d,i){return xScale(i);})
                      .y(function(d,i){return yScale360(d);});

    var d3Line90 = d3.svg.line()
                     .x(function(d,i){return xScale(i);})
                     .y(function(d,i){return yScale90(d);});
    //--- 軸のセット
    stage_alpha.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + (slc_gAlpha.height() - padding.y) + " )")
               .call(xAxis);

    stage_alpha.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate(" + padding.y + ",0)")
               .call(yAxis360);

    stage_beta.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + (slc_gBeta.height() - padding.y) + " )")
              .call(xAxis);

    stage_beta.append("g")
              .attr("class", "y axis")
              .attr("transform", "translate(" + padding.y + ",0)")
              .call(yAxis90);

    stage_gamma.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + (slc_gGamma.height() - padding.y)+ ")")
               .call(xAxis);

    stage_gamma.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate(" + padding.y + ",0)")
               .call(yAxis90);

    stage_gtest.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + (slc_gtest.height() - padding.y)+ ")")
               .call(xAxis);

    stage_gtest.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate(" + padding.y + ",0)")
               .call(yAxis90);


    var pos_alpha = [];
    var pos_beta  = [];
    var pos_gamma = [];

    var update = function(){
        if(hasOrtEvent===true){
            pos_alpha.push(alpha);
            pos_beta.push( beta);
            pos_gamma.push(gamma);
        }else{
            pos_alpha.push(Math.random() * 360);
            pos_beta.push( Math.random() * 180 - 90);
            pos_gamma.push(Math.random() * 180 - 90);
          }

        if(pos_alpha.length > 100){ pos_alpha.shift(); }
        if(pos_beta.length  > 100){ pos_beta.shift(); }
        if(pos_gamma.length > 100){ pos_gamma.shift(); }

            // 削除する
        stage_alpha.selectAll("path.gline").remove();
        stage_beta.selectAll("path.gline").remove();
        stage_gamma.selectAll("path.gline").remove();

            // 描画する
        stage_alpha.append("path")
                   .attr("class", "gline")
                   .attr("d", d3Line360(pos_alpha))
                   .attr("stroke", colors(0))
                   .attr("fill", "none")
                   .attr("opacity", 1);

        stage_beta.append("path")
                  .attr("class", "gline")
                  .attr("d", d3Line90(pos_beta))
                  .attr("stroke", colors(1))
                  .attr("fill", "none")
                  .attr("opacity", 1);

        stage_gamma.append("path")
                   .attr("class", "gline")
                   .attr("d", d3Line90(pos_gamma))
                   .attr("stroke", colors(2))
                   .attr("fill", "none")
                   .attr("opacity", 1);
    };

    // ---
    setOrientVal(alpha, beta, gamma);

    // ---- get compass data
    if(window.DeviceOrientationEvent){
        window.addEventListener("deviceorientation",function(event){
            alpha = event.alpha;
            beta = event.beta;
            gamma = event.gamma;
            setOrientVal(alpha, beta, gamma);
        });
        console.log("hasEvent");
        setInterval(update, 100);
      }else{
        console.log("not has Event");
        setInterval(update, 100);
      }
});