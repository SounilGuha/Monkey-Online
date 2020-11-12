
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0 , edges
var bg , bgImage
var PLAY=1 , END = 0
var gameState=PLAY
var gameOverImg , gameOver ,restart, restartImg

function preload(){
  gameOverImg=loadImage("Game-over-2.png") 
  bgImage=loadImage("dribbble-daylight-forest-background-anim.gif")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

createCanvas(600,600)
  bg=createSprite(0,0)
 monkey=createSprite(100,height-90)
  monkey.scale=0.3
 edges=createEdgeSprites()
 
 monkey.addAnimation("running",monkey_running)
foodGroup=new Group() 
obstacleGroup=new Group()
 
 bg.scale=5
 bg.addImage(bgImage) 
 bg.velocityX=-5 
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.5
  gameOver.visible=false
}


function draw() {
   background("white") 
  if(gameState===PLAY){
  if(keyDown("space")&&monkey.y>=507){
 monkey.velocityY=-15;
   
 } 
  if(bg.x<0){
  bg.x=300  
  }
  console.log(monkey.y)
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(edges[3])
  spawnBanana()
  spawnObstacles()  
     if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach()
    score++
  }
    if(obstacleGroup.isTouching(monkey)){
     gameState=END
      
    }
    
  }
 else if(gameState===END){
 bg.velocityX=0 
 foodGroup.setVelocityXEach(0)
 obstacleGroup.setVelocityXEach(0)
  gameOver.visible=true
   foodGroup.destroyEach()
   obstacleGroup.destroyEach()
   monkey.destroy()
 }
 
drawSprites()
 textSize(30) 
 text("score:"+score,450,50)
}
function spawnObstacles(){
if(frameCount%240===0){
obstacle=createSprite(500,height-50)  
 obstacle.addImage(obstacleImage) 
 obstacle.scale=0.3
 obstacle.velocityX=-4; 
 obstacle.depth=monkey.depth-1
  obstacleGroup.add(obstacle)
}  
}



function spawnBanana(){
if(frameCount%240===0){
banana=createSprite(600,300)
  banana.scale=0.2 
  banana.addImage(bananaImage)
  banana.velocityX=-4
  foodGroup.add(banana)
  
}  
}








