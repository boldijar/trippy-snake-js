


function Player(){
    this.x=WIDTH/2;
    this.y=HEIGHT/2;
    this.direction=DIRECTION_DOWN;
    this.history=[];
    this.life=100;
    this.startTime=new Date().getTime();
    this.size=WIDTH/WIDTH_RATIO;
}
Player.prototype={
    constructor:Player,
    destroyed:function(){
        if(this.history.length<100){
            return false;
        }
        for(var i=0; i<this.history.length-99; i++){
        if(intersect(this,this.history[i])){
            return true;
        }
        }
        return false;
    },
    update:function(delta){
        this.size=WIDTH/WIDTH_RATIO;
        if(this.history.length>this.life){
           this.history.splice(0,1);
        }
        this.history.push({x:this.x,y:this.y,size:this.size});
        if(this.direction==DIRECTION_DOWN){
            this.y+=VELOCITY*delta;
        }else if(this.direction==DIRECTION_UP){
            this.y-=VELOCITY*delta;
        }
        else if(this.direction==DIRECTION_LEFT){
            this.x-=VELOCITY*delta;
        }
        else if(this.direction==DIRECTION_RIGHT){
            this.x+=VELOCITY*delta;
        }
    },
    out:function(){
        return this.x<0-this.size || this.x>WIDTH || this.y<0-this.size||this.y>HEIGHT;  
    },
    draw:function (context,delta)  {
        var that=this;
        this.history.forEach(function(point) {
             context.fillStyle=getRandomColor();
     
            context.fillRect(point.x,point.y,that.size,that.size);
        });
        context.fillStyle=getRandomColor();
        context.fillRect(this.x,this.y,this.size,this.size);
        
         context.fillStyle=getRandomColor();
      
        var eyeRatio=5.0;
        var eye=this.size/eyeRatio;
        var leftEyeX=this.x+eye;
        var leftEyeY=this.y+eye;
         var rightEyeX=this.x+this.size-2*eye;
        var rightEyeY=leftEyeY;
        context.fillRect(leftEyeX,leftEyeY,eye,eye);
         context.fillRect(rightEyeX,rightEyeY,eye,eye);
         
         
      context.beginPath();
      var diff=new Date().getTime()%12/10;
      context.arc(this.x+this.size/2, this.y+this.size/2, this.size/3.0*diff, 0, Math.PI, false);
      context.closePath();
      context.lineWidth = 5;
      context.fillStyle = getRandomColor();
      context.fill();
      context.strokeStyle =getRandomColor();
      context.stroke();
        
      
        this.update(delta);
      },
    setDirection:function(direction){
        this.direction=direction;
    }
}