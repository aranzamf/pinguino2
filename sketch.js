var path,pinguino, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var fondo, fondoImg;
var pinguino,pinguinoImg;
var iceGroup;
var ninoGroup;
var iceImg;
var niñoImg;
var gameState=PLAY;
var score=0;
var END=0;
var PLAY=1;

function preload(){
  fondoImg = loadImage("imagenes/track.png");
  pinguinoImg = loadImage("imagenes/p1.png");
  iceImg = loadImage("imagenes/Snowball.webp");
  niñoImg = loadImage("imagenes/niño.webp");
}

function setup(){
  
  createCanvas(1230,550);
  
  fondo=createSprite(650,200);
  fondo.addImage(fondoImg);
  fondo.scale=1.5;
  
    pinguino=createSprite(500,300,20,20);
    pinguino.addImage(pinguinoImg);
    pinguino.scale= 0.2;
  
    iceGroup= new Group();
    ninoGroup= new Group();
  
//crea el Límite izquierdo
leftBoundary=createSprite(1220,0,20,1000);
//leftBoundary.visible = false;
leftBoundary.shapeColor="red"

//crea el Límite derecho
rightBoundary=createSprite(10,0,20,1000);
rightBoundary.shapeColor="red"

//rightBoundary.visible = false;
}

function draw() {
  background(0);


  drawSprites();
  textSize(40);
  fill(255);
  text("score:"+score,1000,100);
 



  if(gameState=PLAY){
    fondo.velocityY=4;
    score=score+Math.round(getFrameRate()/50);
    if(keyDown("LEFT_ARROW")) {
      pinguino.x=pinguino.x-5;
    }
    if(keyDown("RIGHT_ARROW")) {
      pinguino.x=pinguino.x+5;
    } 
    
    edges= createEdgeSprites();
    pinguino.collide(edges[3]);
    pinguino.collide(leftBoundary);
    pinguino.collide(rightBoundary);
  
    if (World.frameCount % 100 == 0) {
      iceBlock();
  
    }
  
    if (World.frameCount % 200 == 0) {
      ninos();
    }

    if (iceGroup.isTouching (pinguino)){
    ice.velocityY=0;
    score=score-10;
    }

    if (ninoGroup.isTouching (pinguino)){
    gameState=END
    nino.velocityY=0;

      }
    
    //código para reiniciar el fondo
    if(fondo.y > 320 ){
      fondo.y = height/2;
    }
  }

  if (gameState=END){
    textSize(40);
    fill(255);
    text("presione tecla hacia arriba",500,200);
fondo.velocityY=0;
pinguino.velocityY=0;
iceGroup.setVelocityYEach(0);
iceGroup.setLifetimeEach(-1);
//hacer lo mismo para ninos group

if (keyDown("UP_ARROW")){
restart();
}
  
   
  }
  
  
  
}

function iceBlock(){
  var ice=createSprite(Math.round(random(50,1200)),100,40,20);
  ice.addImage(iceImg);
  ice.scale=0.5;
  ice.setLifetime=170;
  ice.velocityY=5;
  iceGroup.add(ice);
  
  
  

}

function ninos(){
  var nino=createSprite(Math.round(random(50,1200)),500,40,40);
  nino.addImage(niñoImg);
  nino.scale=0.5;
  nino.setLifetime=170;
  nino.velocityY=-3;
  ninoGroup.add(nino);
 
}

function restart(){
gameState="play";
//iceGroup.destroyEach();
//ninoGroup.destroyEach();

}