var shooter,shooterImg
var bg,backgroundImg
var invisibleGround,invisibleGround2
var zombie,zombieImg
var bullet,bulletImg
var heart1,heart1Img
var heart2,heart2Img



function preload(){
backgroundImg=loadImage("assets/background.png")
shooterImg= loadImage("assets/shooter.png")
zombieImg=loadImage("assets/Zombie.png")
bulletImg=loadImage("assets/ammo.png")
heart1Img=loadImage("assets/heart1.png")
heart2Img=loadImage("assets/heart2.png")


}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  zombieGroup=new Group()
  bulletGroup =new Group();
  
 
  bg=createSprite(displayWidth,displayHeight/2-40,30,30)
  bg.addImage(backgroundImg)
  bg.scale=3
  bg.velocityX=-4
 
  shooter=createSprite(displayWidth-1500,displayHeight-300,50,50)
  shooter.addImage(shooterImg)
  shooter.scale=0.7

  heart1=createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale=0.4
  heart1.visible=false

  heart2=createSprite(displayWidth-100,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale=0.4


  
  
  invisibleGround=createSprite(200,380,3000,20)
  invisibleGround.visible=false
  
  invisibleGround2=createSprite(200,840,3000,20)
  invisibleGround2.visible=false



}





function draw() {
  background("Black");
  
  if(bg.x<-40){
    bg.x=1900
  }
  
  if(keyDown("space")){
    shootBullet();
  }

  if(keyDown(UP_ARROW)){
    shooter.y-=5
  }
  if(keyDown(DOWN_ARROW)){
    shooter.y+=5
  }


  shooter.collide(invisibleGround)
  shooter.collide(invisibleGround2)
  
  if(bulletGroup.isTouching(zombieGroup)){
    for(var i=0;i<bulletGroup.length;i++){
      if(bulletGroup[i].isTouching(zombieGroup)){
       bulletGroup[i].destroy()
        zombieGroup[i].destroy()
      }
    }
  }

 
  spawnZombies()
  if(zombieGroup.isTouching(shooter)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(shooter)){
        zombieGroup[i].destroy()
        heart2.visible=false
        heart1.visible=true
      }
    }
  }
  drawSprites()
  

}

function spawnZombies(){
  if(frameCount%50==0){
    zombie = createSprite(random(1900,1900),random(430,730),40,40)
    zombie.addImage(zombieImg)
    zombie.scale
    zombie.velocityX=-8
    zombie.lifetime=300
    zombieGroup.add(zombie)
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,100,150)
  }
}
function shootBullet(){
  bullet= createSprite(525, width/2, 50,20)
  bullet.y= shooter.y-7
  bullet.addImage(bulletImg)
  bullet.velocityX= 15
  bullet.scale=0.4
  bulletGroup.add(bullet)
}

