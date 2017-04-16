
var title=document.getElementById("title");
var player=new Player();
var food=new Food();
function update(delta){
    var record=localStorage['record'] || 0;
    var time=new Date().getTime()-player.startTime;
    time=~~(time/100)
    time/=10;
    title.innerHTML="Current score: "+player.life+" best score: "+record+" this game passed time: "+time;
    if(intersect(food,player)){
        food=new Food();
        player.life+=10;
        updateRatio();
        if(record<player.life){
            localStorage['record']=player.life;
        }
        if(VELOCITY<VELOCITY_MAX){
            VELOCITY+=VELOCITY_STEP;
        }
        
       
    }
     if(player.out() || player.destroyed()){
            restart();
        }
}
function restart(){
    resetRatio();
    player=new Player();
    food=new Food();
}
function drawBackground(context){
    var size=WIDTH/WIDTH_RATIO
    var widthCount=parseInt(WIDTH/size);
    var heightCount=parseInt(HEIGHT/size);
    for(var i=0; i<=widthCount; i++){
        for(var j=0; j<=heightCount; j++){
            var x=i*size;
            var y=j*size;
            context.fillStyle=getRandomColor();
            context.fillRect(x,y,size,size);
        }
    }
}
function draw(context,delta){
    /*global getRandomColor*/
    update(delta);
    context.fillStyle=getRandomColor();
    context.fillRect(0,0,WIDTH,HEIGHT);
    drawBackground(context);
    player.draw(context,delta);
    food.draw(context);
    // foods.forEach(function(item){
    //     item.draw(context);
    // });
    
}
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 40:
            player.setDirection(DIRECTION_DOWN);
            break;
        case 38:
            player.setDirection(DIRECTION_UP);
            break;
        case 37:
            player.setDirection(DIRECTION_LEFT);
            break;
        case 39:
            player.setDirection(DIRECTION_RIGHT);
            break;
    }
};


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            player.setDirection(DIRECTION_LEFT); 
        } else {
             player.setDirection(DIRECTION_RIGHT);
        }                       
    } else {
        if ( yDiff > 0 ) {
            player.setDirection(DIRECTION_UP);
        } else { 
             player.setDirection(DIRECTION_DOWN);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};