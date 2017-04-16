

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();


var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

var lastTimeSaved=new Date().getTime();
function loop(context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var currentTime=new Date().getTime();
        var delta=currentTime-lastTimeSaved;
        draw(context,delta);
        lastTimeSaved=currentTime;
      

        // request new frame
        requestAnimFrame(function() {
          loop(context);
        });
      }

loop(ctx);