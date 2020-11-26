
var monkey,monkey_running,score=0;
var banana,bananaImage,obstacle,obstacleImage;
var bananaG,obstacleG,score_icon;
var ground,groundImage,ifloor,timer=0;
var Play=1,End=2;
var gameState=Play;

function preload(){
  
 monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 groundImage = loadImage("jungle.png");
 
}

function setup() {
 createCanvas(600,500); 

  ifloor=createSprite(100,460,100,10)
  
  ground=createSprite(810,250,10,10);
  ground.addImage("background",groundImage)
  ground.scale=0.55;
    
  monkey=createSprite(100,400,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
  score_icon=createSprite(480,50,10,10);
  score_icon.addImage("count",bananaImage);
  score_icon.scale=0.13;
  
  bananaG = new Group();
  obstacleG = new Group();
}

function draw() {
background("cyan");
 monkey.collide(ifloor);
  
  if(gameState===Play){
    if(keyDown("space")&&monkey.y===393.6){
      monkey.velocityY=-12;
    }
    timer=timer+ Math.round(getFrameRate()/60);
    bananas();
    obstacles();
    ground.velocityX=-3;
    
    if (ground.x < 0){
      ground.x = 810;
    }
    if(monkey.isTouching(bananaG)){
      score=score+1;
     bananaG.destroyEach();
    }
    if(monkey.isTouching(obstacleG)){
      gameState=End;
      obstacleG.destroyEach()
      obstacleG.velocityX=0;
      bananaG.destroyEach();
      bananaG.velocityX=0;
    }
  }
  if (gameState===End){
    obstacleG.destroyEach()
    obstacleG.velocityX=0;
    bananaG.destroyEach();
    bananaG.velocityX=0;
    ground.velocityX=0;
    monkey.pause()
  }
  monkey.velocityY=monkey.velocityY+0.25;
  console.log(monkey.y)
  drawSprites();
  
  textSize(25);
  fill("white");
  text("Survival Time ="+timer,30,60);
  
  textSize(30);
  fill("white")
  text(" x "+score,510,60);
}

function bananas(){
  
  if(frameCount%200===0){
  banana = createSprite(630,250,10,10);
  banana.addImage("banana",bananaImage);
  banana.scale=0.15;
  banana.y=Math.round(random(250,120));
  banana.velocityX=-3;
  banana.setCollider("rectangle",0,0,420,350)
  banana.debug=true;
  bananaG.add(banana);
    
}
}

function obstacles(){
  
  if(frameCount%170===0){
  obstacle = createSprite(650,430,10,10);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale=0.3;
  obstacle.velocityX=-3;
  obstacle.setCollider("circle",0,0,180);
  obstacle.lifetime=230;
  obstacleG.add(obstacle);
 } 
}
