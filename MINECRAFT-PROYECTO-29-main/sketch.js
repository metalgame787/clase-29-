var playerPaddle, computerPaddle, ball;
var paddle1, paddle2, ballImage, bg;
var edges;
var paddleGroup;
var playerScore, computerScore;
var gameState="serve";

function preload(){
    paddle1=loadImage("B1.png")
    paddle2=loadImage("B2.png")
    ballImage=loadImage("Ball2.png")
    bg=loadImage("TT.png")
}

function setup(){
    playerPaddle = createSprite(375, 200, 10, 70);
    computerPaddle = createSprite(20, 200, 10, 70);
    ball = createSprite(200,200,10,10);
    playerPaddle.addImage("B1",paddle1);
    playerPaddle.scale=0.4;
    computerPaddle.addImage("B2",paddle2);
    computerPaddle.scale=0.4;

    ball.addImage("Ball2.png", ballImage);
    ball.scale=0.4;

    // Agregar ambas paletas al grupo de paletas - C28
    paddleGroup=new Group()
    paddleGroup.add(computerPaddle)
    paddleGroup.add(playerPaddle)

    playerScore=0;
    computerScore=0;

    edges=createEdgeSprites();
    
  
}

function draw(){
    background(bg);
    drawnet(20)
    textSize(15);
    fill("black");

    // Este texto será visible en el estado de servicio - C29
    if(gameState=="serve"){
        text("Presiona la barra espaciadora para iniciar el juego",30,150)
    }

    // Mostrar la puntuación - C28
    text(computerScore,150,30)
    text(playerScore,250,30)

    //ball.bounceOff(edges[1]);
    //ball.bounceOff(edges[0]);
    ball.bounceOff(edges[3]);
    ball.bounceOff(edges[2]);
    
    // La pelota rebota en ambas paletas al usar grupos - C28
    ball.bounceOff(paddleGroup);
    
    // Agregar movimiento a la paleta
    playerPaddle.y=mouseY;
    computerPaddle.y=ball.y
    
    // La pelota solo se puede servir en el estado de servicio - C29
    if(keyDown("space") && gameState=="serve"){
          
        ball.velocityX = 6;
        ball.velocityY = 6;
        // La variable gameState cambia a 'play' tan pronto como el jugador sirva la pelota
        // Agregar el código adecuado
        gameState="play"
        
    }
  
    // Reinicia la pelota al centro cuando sale de la pantalla y aumenta la puntuación - C28
    if(ball.x>400 || ball.x<0){
        // La variable gameState cambia a 'serve' de nuevo - C29
        gameState="serve"
        if(ball.x>400){
            computerScore=computerScore+1
        }
        if(ball.x<0){
            playerScore=playerScore+1
        }
        // Posiciona a la pelota en el centro
        ball.x=200
        ball.y=200
        // Vuelve a la pelota estacionaria
        ball.velocityX=0
        ball.velocityY=0             
    }
    // Agrega la puntuación ganadora adecuada y el estado final del juego
    if(playerScore==5 ||computerScore==5 ){
        gameState="end"
       }
       
    if(gameState=="end"){
        text("Fin del juego :(",150,150)
    }
    drawSprites();
}

        
function drawnet(num){
    for(var i=0; i<num; i++){
        line(200, 20*i, 200, 10+20*i);
    }
}
