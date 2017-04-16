


function Food(){
    this.size=WIDTH/FOOD_WIDTH_RATIO;
    this.x=getRandomInt(0,WIDTH-this.size);
    this.y=getRandomInt(0,HEIGHT-this.size);
}
Food.prototype={
    constructor:Food,
    update:function(delta){
        this.size=WIDTH/FOOD_WIDTH_RATIO;
   
    },
    draw:function (context,delta)  {
        context.fillStyle=getRandomColor();
        context.fillRect(this.x,this.y,this.size,this.size);
        this.update(delta);
      },
   Food
}