$(function(){
    var alpha = 0.0;
    var beta = 0.0;
    var gamma = 0.0;
    var slc_orient = $("#dev_orient");

    if(window.DebiceOrientationEvent){
        window.addEventListener("deviceorientation",function(event){
            alpha = event.alpha;
            beta = event.beta;
            gamma = event.gamma;
            slc_orient.find(".alpha").text(alpha)
                      .siblings(".beta").text(beta)
                      .siblings(".gamma").text(gamma);
        }, false);
    }
});