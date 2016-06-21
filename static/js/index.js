$(function(){
    var alpha = 0.0;
    var beta = 0.0;
    var gamma = 0.0;
    var slc_orient = $("#dev_orient");

    function setOrientVal(opt_alpha, opt_beta, opt_gamma){
        slc_orient.find(".alpha").children(".val").text(opt_alpha);
        slc_orient.find(".beta").children(".val").text(opt_beta);
        slc_orient.find(".gamma").children(".val").text(opt_gamma);
    }

    // ---
    setOrientVal(alpha, beta, gamma);

    // ---- get compass data
//    if(window.DebiceOrientationEvent){
        window.addEventListener("deviceorientation",function(event){
            alpha = event.alpha;
            beta = event.beta;
            gamma = event.gamma;
            setOrientVal(alpha, beta, gamma);
        });
 //   }

    // --- set graph
    var stage_alpha = d3.select("#graph_alpha")
                        .append("svg:svg")
                        .attr("width", $("#graph_alpha").width())
                        .attr("height", 200);

    var stage_beta  = d3.select("#graph_beta")
                        .append("svg:svg")
                        .attr("width", $("#graph_beta").width())
                        .attr("height", 200);

    var stage_gamma = d3.select("#graph_gamma")
                        .append("svg:svg")
                        .attr("width", $("#graph_gamma").width())
                        .attr("height", 200);

    var colors = d3.scale.category10();
    var d3Line = d3.svg.line()
                   .x(function(d,i){return i * 10;})
                   .y(function(d,i){return d;});

    var pos_alpha = [];
    var pos_beta  = [];
    var pos_gamma = [];

    var update = function(){
        pos_alpha.push(alpha + 100);
        pos_beta.push(beta + 100);
        pos_gamma.push(gamma + 100);

        if(pos_alpha.length > $("#graph_alpha").width()/10){ pos_alpha.shift(); }
        if(pos_beta.length  > $("#graph_beta").width()/10){  pos_beta.shift(); }
        if(pos_gamma.length > $("#graph_gamma").width()/10){ pos_z.shift(); }

            // 削除する
        stage_alpha.selectAll("path").remove();
        stage_beta.selectAll("path").remove();
        stage_gamma.selectAll("path").remove();

            // 描画する
        stage_alpha.append("path")
                   .attr("d", d3Line(pos_alpha))
                   .attr("stroke", colors(0))
                   .attr("fill", "none")
                   .attr("opacity", 1);

        stage_beta.append("path")
                  .attr("d", d3Line(pos_beta))
                  .attr("stroke", colors(1))
                  .attr("fill", "none")
                  .attr("opacity", 1);

        stage_gamma.append("path")
                   .attr("d", d3Line(pos_gamma))
                   .attr("stroke", colors(2))
                   .attr("fill", "none")
                   .attr("opacity", 1);
    };

    setInterval(update, 100);
});