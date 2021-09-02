var background2Img, background2;
var ratImg, rat, ratsGroup;
var climberImg, climber, climbersGroup;

var doraemon, doraemonImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  background2Img = loadImage("background2.jpg");
  ratImg = loadImage("rat.jpg");
  climberImg = loadImage("climber.png");
 doraemonImg = loadImage("Doraemon_renderImproved.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 //spookySound.loop();
 background2 = createSprite(300,300);
 background2 .addImage("background2",background2Img);
 background2.velocityY = 1;
 background2.scale = 4;
  
  ratsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  doraemon = createSprite(200,400,50,50);
  doraemon.scale = 0.2;
  doraemon.addImage("doraemon", doraemonImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      doraemon.x = doraemon.x - 3;
    }
    
    if(keyDown("right_arrow")){
      doraemon.x = doraemon.x + 3;
    }
    
    
    
    if(background2.y > 400){
      background2.y = 300
    }
    spawnrats();

    
    //climbersGroup.collide(doraemon);
    if(climbersGroup.isTouching(doraemon)){
      doraemon.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(doraemon) || doraemon.y > 600){
      doraemon.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnrats() {
  //write code here to spawn the rats in the tower
  if (frameCount % 240 === 0) {
    var rat = createSprite(200, -50);
    rat.scale = 0.4;
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    rat.x = Math.round(random(120,400));
    climber.x = rat.x;
    invisibleBlock.x = rat.x;
    
    rat.addImage(ratImg);
    climber.addImage(climberImg);
    
    rat.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    doraemon.depth = rat.depth;
    doraemon.depth +=1;
   
    //assign lifetime to the variable
    rat.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each rat to the group
    ratsGroup.add(rat);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    
  }
}

