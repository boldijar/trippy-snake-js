var WIDTH=800;
var HEIGHT=600;
var DIRECTION_UP=0,DIRECTION_DOWN=1,DIRECTION_LEFT=2,DIRECTION_RIGHT=3;
var VELOCITY=.09;
var VELOCITY_STEP=0.005;
var VELOCITY_MAX=0.5;
var WORLD_RATIO=.5;
var RATIO_STEP=0.01;
var WIDTH_RATIO_DEFAULT=30;
var WIDTH_RATIO=WIDTH_RATIO_DEFAULT*WORLD_RATIO;
var FOOD_WIDTH_DEFAULT=30.0;
var FOOD_WIDTH_RATIO=FOOD_WIDTH_DEFAULT*WORLD_RATIO;
var WORLD_RATIO_MAX=1.1;

function resetRatio(){
    WORLD_RATIO=.5-RATIO_STEP;
    updateRatio();
}
function updateRatio(){
    if(WORLD_RATIO<WORLD_RATIO_MAX){
    WORLD_RATIO=WORLD_RATIO+RATIO_STEP;
    WIDTH_RATIO=WIDTH_RATIO_DEFAULT*WORLD_RATIO;
    FOOD_WIDTH_RATIO=FOOD_WIDTH_DEFAULT*WORLD_RATIO;
    }
}

console.log("loaded utils");
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intersect(r1, r2) {
    r1.left=r1.x;
    r1.top=r1.y;
    r1.right=r1.left+r1.size;
    r1.bottom=r1.top+r1.size;
    
    r2.left=r2.x;
    r2.top=r2.y;
    r2.right=r2.left+r2.size;
    r2.bottom=r2.top+r2.size;
    
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}