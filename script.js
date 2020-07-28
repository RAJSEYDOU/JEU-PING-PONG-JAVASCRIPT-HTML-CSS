

const canvas= document.querySelector('.canvas')
const ctx=canvas.getContext('2d')




// SET COMPUTER VALUE
let user={

	X:0,
	// HEIGHT=400
	Y:canvas.height/2-50,
	W:10,
	// HEIGHT=400
	H:canvas.height/2,
	COLOR:"white",
	SCORE:0
}

// SET COMPUTER VALUE
let computer={
		//L=10
	X:canvas.width-10,
	// HEIGHT=400
	Y:canvas.height/2-50,
	W:10,
	// HEIGHT=400
	H:canvas.height/2,
	COLOR:"yellow",
	SCORE:0
}
// SET NET INIT POSITION

let NET={
ID:0,
	X:canvas.width/2,
	Y:0,
	W:1,
	H:10,
	COLOR:"white",

}




// SET BALL INIT POSITION

let BALL={
	ID:1,
	X:canvas.width/2,
	// HEIGHT=400
	Y:canvas.height/2,
	R:5,
	COLOR:"white",
	VELOCITY_X:5,
	VELOCITY_Y:5

}

// FUNCTION DRAW ALL RECTANGLE (GAME AREA ,NET,PANEL)
function DrawRect (x,y,l,h,color){
	ctx.fillStyle=color
	ctx.fillRect(x,y,l,h)
}


// FUNCTION DRAW ALL CIRCLE(BALL)
function DrawCircle(x,y,r,color){

	ctx.fillStyle=color
	ctx.beginPath()
	ctx.arc(x,y,r,0,Math.PI*2,false)
	ctx.closePath()
	ctx.fill()
}

// DRAW TEXT
function drawText(test,X,Y,COLOR){

	ctx.fillStyle=COLOR;
	ctx.font="45px fantasy ";
	ctx.fillText(test,X,Y)
}
function drawTextGameOverPlayer(test,X,Y,COLOR){

	ctx.fillStyle=COLOR;
	ctx.font="18px fantasy ";
	ctx.fillText(test,X,Y)
}

// DRAW MANY SQUARE TO MAKE A NET LINE
function drawNet(){
for (i=0; i<canvas.height; i+=15 ){

	DrawRect (NET.X, i,NET.W,NET.H,NET.COLOR)

}}





// ANIMATION GAME
//DRAW GAME AREA

function move(){
DrawRect (0,0,600,400,"black")
// DRAW NET TROUGH A LOOP
drawNet()

//DRAW  USER PANEL
DrawRect (user.X,user.Y,user.W,user.H,user.COLOR)
//DRAW  USER PANEL
DrawRect (computer.X,computer.Y,computer.W,computer.H,computer.COLOR)
// DRAW NET ON MIDDLE SCREEN

DrawRect (NET.X,NET.Y,NET.W,NET.H,NET.COLOR)
// DRAW BALL ON MIDDLE SCREEN

DrawCircle(BALL.X,BALL.Y,BALL.R,"white")

drawText(user.SCORE,60,50,"white")
drawText(computer.SCORE,200,50,"white")


	
}

// move()
function update(){
	// VELOCITY


	BALL.X+=BALL.VELOCITY_X
	BALL.Y+=BALL.VELOCITY_Y



// ALLOW TO BEAT COMPUTER
const computerLevel=0.1

computer.Y+=(BALL.Y-(computer.Y+computer.H/2) )*computerLevel

// CHECKING FOR COLLISION
let Player=(BALL.X <canvas.width/2)?user:computer

//CHECKING IF COLLISION IT TRUE
if(collision(Player,BALL)){
// IF BALL.VELOCITY_X= -5   go left and hight
	BALL.VELOCITY_X=-BALL.VELOCITY_X


}

// CHECKING  PLAYER WHO SCORED FUNCTION BELOW
score(Player)
// GAME OVER FUNCTION BELOW IF USER OR COMPUTER SCORE>=10 
gameOver()

// IF A BALL HIT A CANVAS TOP OR BOTTOM  LEFT BOTTOM
if(BALL.Y+ BALL.R>=canvas.height|| BALL.Y+BALL.R<0 ){
		
	    BALL.VELOCITY_Y=-BALL.VELOCITY_Y
	}

}


// FONCTION COLLISION RETURN TRUE OR FALSE

function collision(P,B){
     // LEFT-RIGHT, BAS-TOP ,DROITE-LEFT,TOP-BOTTOM
     //   
     return B.X-B.R <P.X+P.W && B.X+B.R > P.X && B.Y-B.R<P.Y+P.H && B.Y+B.R>P.Y
}

function score(){
	if(BALL.X-BALL.R ==0 ){

	// IF A BALL HITS A CANVAS LEFT X=0
	// INCREMENT COMPUTER SCORE 
				computer.SCORE++;
	// AND MAKE BALL GO DOWN RIGHT
				BALL.VELOCITY_Y=BALL.VELOCITY_Y
				BALL.VELOCITY_X=-BALL.VELOCITY_X
	}
	// ELSE BALL HIT CANVAS RIGHT THEN 
	else if(BALL.X+BALL.R==canvas.width){
			// INCREMENT USER SCORE 
				user.SCORE++;
	// ELSE BALL HIT CANVAS RIGHT THEN
				
	}
}



function gameOver(){
	if(user.SCORE>=1||computer.SCORE>=1){
		drawText("game over" ,canvas.width/4,canvas.height/2,"red")
		drawTextGameOverPlayer(user.SCORE,canvas.width/4,100,"white")
		drawTextGameOverPlayer("user",100,100,"white")
		drawTextGameOverPlayer("computer",200,100,"white")
		drawTextGameOverPlayer(computer.SCORE,180,100,"white")
		drawTextGameOverPlayer("PRESS ENTER TO RESTART",90,120,"white")
		// STOP GAME
		clearInterval(timer)
// ON KEY PRESS OK RESTART GAME
		document.addEventListener('keyup',function(event){
			if(event.keyCode==13){
				location.reload()
				 timer=setInterval(game,20)
			}
		})
		


	}
}

// CONTROL USER PANEL (EVENT LISTENER  MOUSEDOWN)
canvas.addEventListener('mousemove',userPanelControle)

function userPanelControle(event){
	// GET CANVAS TOP,WIDTH,HEIGHT,BOTOM,LEFT,RIGHT
const rect= canvas.getBoundingClientRect()
//  PUT CURSOR ON MIDDLE OF USER  PANEL
	user.Y=event.clientY- canvas.height-rect.top
	
	if(user.Y>=140){
		user.Y=140

	}else if(user.Y<=0){
		user.Y=0
	}
		
}


// MAIN FUNCTION CONTAINS MOVE(POSITION) AND UPDATE(POSITION UPDATE)


 //START GAME

 document.addEventListener('keyup',start)
move()
drawTextGameOverPlayer("ENTER TO START THE GAME",50,100,"white")
 function start(event){
 	if(event.keyCode==13){
  // TIMER TO MAKE GAME RUNN
    timer=setInterval(game,20)
 	}
 } 


function game(){
	move()
	update()
}

let timer









