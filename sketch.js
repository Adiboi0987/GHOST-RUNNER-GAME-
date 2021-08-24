var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY=1
var END= 0
var gameState = PLAY

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300,70,70);
  ghost.addImage("ghost",ghostImg)
  ghost.scale= 0.5
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()

}

function draw() {
  if(gameState===PLAY){
    if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-8
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+8
    }
    if(keyDown("space")){
      ghost.velocityY=-10
    }
    //ghost.velocityY=ghost.velocityY+0.5
    if(tower.y > 400){
        tower.y = 300
      }
      spawnDoors()
      if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
      gameState=END
      }
  }else if(gameState===END){
   background("black")
   textSize(30)
   text("GAME OVER",300,300)
   ghost.destroy()
   tower.destroy()
   doorsGroup.destroyEach()
   climbersGroup.destroyEach()
   invisibleBlockGroup.destroyEach()
  }
  
  
    drawSprites();
}

function spawnDoors(){
  
  if(frameCount%200===0){
    door = createSprite(random(100,500),-50,80,100);
    door.addImage("door",doorImg);
    door.velocityY=1

    climber = createSprite(door.x,0,80,100);
    climber.addImage("climber",climberImg);
    climber.velocityY=1
    invisibleBlock = createSprite(door.x,0,50,10);
    invisibleBlock.velocityY=1
    ghost.depth=door.depth+1
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
}
