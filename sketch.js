var ghost, ghostImg;
var bgSprite, bgImage;
var door, doorImg, doorGroup;
var railing, railingImg, railingGroup;
var invisibleRailing, invisibleRailingGrp;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload() {
  ghostImage = loadImage("ghost-standing.png");
  bgImage = loadImage("tower.png");
  doorImg = loadImage("door.png");
  railingImg = loadImage("climber.png");
  
  bgSound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  ghost = createSprite(200,300,20,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  bgSprite = createSprite(300,300,600,600);
  bgSprite.addImage(bgImage);
  
  doorGroup = createGroup();
  railingGroup = createGroup();
  invisibleRailingGrp = createGroup();
  
}

function draw() {
  background("black");
  
  drawSprites();
  
  ghost.setCollider("rectangle",0,0,300,250);
  
  if(gameState===PLAY) {
    bgSound.loop();
    
    bgSprite.velocityY = 1;
    // bgSprite.x = 
    if (bgSprite.y>500) {
      bgSprite.y = 300;
    }

    ghost.depth = ghost.depth+1;

    ghost.velocityY = ghost.velocityY+0.5;

    if(keyDown("space")) {
      ghost.velocityY = -10;
    }

    if(keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x-5;
    }

    if(keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x+5;
    }

    if(ghost.isTouching(railingGroup)) {
      ghost.velocityY = 0;
    }
    
    invisibleRailingGrp.visibleEach = false;
    
    if(ghost.isTouching(invisibleRailingGrp) || ghost.y>600) {
      gameState=END;
    }
    spawnDoor();
  }
  
  if(gameState===END) {
    ghost.visible = false;
    bgSprite.visible = false;
    doorGroup.destroyEach();
    railingGroup.destroyEach();
    invisibleRailingGrp.destroyEach();
    
    textSize(30);
    text("GAME OVER",200,300);
  }
}

function spawnDoor() {
  if(frameCount%300===0) {
    var randomX = Math.round(random(100,500))
    door = createSprite(200,-10,10,30);
    door.x = randomX;
    door.velocityY = bgSprite.velocityY;
    door.addImage(doorImg);
    door.lifeTime = 600;
    
    railing = createSprite(door.x, door.y+50,40,5);
    railing.addImage(railingImg);
    railing.velocityY = door.velocityY;
    railing.lifeTime = 600;
    
    invisibleRailing = createSprite(railing.x,railing.y+10,railing.width,2);
    invisibleRailing.velocityY = railing.velocityY;
    invisibleRailing.lifeTime = 600;
    
    doorGroup.add(door);
    railingGroup.add(railing);
    invisibleRailingGrp.add(invisibleRailing)
  }
}
