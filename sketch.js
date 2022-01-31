var PLAY= 1;
var END =0;
var gameState = PLAY;

var trex;
var ground;
var ground1;
var cloud;
var cactus;
var over;
var restart;
var jump;
var die;
var checkPoint;

var cactusGroup, cloudsGroup ;

function preload(){
  trex_running = loadImage("ASTRO ROCKET.png");
  trex_ojitos = loadAnimation ("ASTRO ROCKET.png");
  ground_image = loadImage ("ground2.png");
  cloud_image = loadImage ("cloud.png");
  obstacle1 = loadImage ("ASTRO BASEBALL.png");
  obstacle2 = loadImage ("ASTRO SODA.png");
  obstacle3 = loadImage ("ASTRO ALIEN.png");
  obstacle4 = loadImage ("ASTRO FRIENDS.png");
  obstacle5 = loadImage ("ASTRO BASEBALL.png");
  obstacle6 = loadImage ("ASTRO FRIENDS.png");
  over_fin = loadImage ("gameOver.png");
  restart_flecha = loadImage ("restart.png");
  jump_trex = loadSound ("jump.mp3");
  die_trex = loadSound ("die.mp3");
  checkPoint_point = loadSound ("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  trex.scale = 0.12;

  ground = createSprite(200,180,400,10);
  ground.addImage("ground", ground_image);
  ground.x = ground.width/8
  
  ground1= createSprite(200,190,400,10);
  ground1.visible=false;
  
  var asar= Math.round(random (1,100));
  console.log(asar);
  
  console.log("H"+"o"+"l"+"a"+" "+"M"+"u"+"n"+"d"+"o");// concatenación 
  
  score=0;
  
  cactusGroup= new Group () ;
  cloudsGroup= new Group ();
  
  //trex.debug=true;
  trex.setCollider("circle",0,0,40);
  
  over=createSprite(300,80,10,10);
  over.addImage("fin",over_fin);
  
  restart=createSprite(300,130,10,10);
  restart.addImage("flecha",restart_flecha);
  restart.scale=0.5;
  
  var mensaje="Holaaaaa";
  console.log(mensaje);
}

function draw(){
  
  background("white");
  drawSprites();
  console.log(trex.y);
  console.log (frameCount)
  trex.collide([ground1]);
  text("score: "+score,300,50);
  
  var mensaje="Holaaaaa";
  console.log(mensaje);
  
     
 if(gameState === PLAY){
    ground.velocityX = -(2+2*score/200);
    score = score + Math.round(getFrameRate()/60);
    
      if (ground.x < 0){
      ground.x = ground.width/7;
      }
     if (score>0&&score%200===0){
     
     checkPoint_point.play();
     }
 
     if(keyDown("space") && trex.y >= 160) {
      trex.velocityY = -13;
      jump_trex.play();
      
      }
   
    trex.velocityY = trex.velocityY + 0.5
    
   spawnClouds();
   spawnCactus();
   
   if (cactusGroup.isTouching(trex)){
     
    gameState=END;
    die_trex.play();
   
   }
   over.visible=false;
   restart.visible=false;
   
 }
  
   else if (gameState === END) {
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0); 
    trex.changeAnimation("ojitos",trex_ojitos);
    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityY=0;
    over.visible=true;
    restart.visible=true;
     
     if(mousePressedOver (restart)){
     console.log ("muajajaja");
       reset();
       }
     
   }
  
  
}

function spawnClouds (){
   
  if (frameCount%100===0){
  cloud = createSprite (600,100,40,10);
  cloud.velocityX =-2; 
  cloud.addImage (cloud_image);
  cloud.scale = 1.3;
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloud.lifetime=320;
  cloudsGroup.add (cloud);
  } 
}
  
function spawnCactus (){
  
  if (frameCount%90===0){
  cactus = createSprite (400,165,10,15);
  cactus.velocityX = -(2+2*score/200);
  var asar = Math.round (random(1,6));
  switch (asar){
      
    case 1: cactus.addImage (obstacle1);
    break ;
    
    case 2: cactus.addImage (obstacle2);
    break ;
    
    case 3: cactus.addImage (obstacle3);
    break ;
    
    case 4: cactus.addImage (obstacle4);
    break ;
    
    case 5: cactus.addImage (obstacle5);
    break ;
    
    case 6: cactus.addImage (obstacle6);
    break ;
    
    default:break;
    
  }
  
  cactus.depth =trex.depth;
  trex.depth =trex.depth+1;
  cactus.scale= 0.12;
  cactus.lifetime=320;
  cactusGroup.add (cactus);
  }              
  


}

function reset(){
  gameState= PLAY;
  over.visible=false;
  restart.visible=false;
  cactusGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
}