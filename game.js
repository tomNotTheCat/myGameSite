//TicTacToe
let vertical=1;
let horizontal=1;
let leftDiagonal=1;
let rightDiagonal=1;
class Game{
 constructor(){
	 this.currPlayer="X";
	 this.moveHistory=[]; 
	 this.width=0;
 }
 init(num){
	 this.goal=num;
	 const cells=document.querySelectorAll('.cell');
	 cells.forEach(cell=>cell.addEventListener('click',()=>{
		 if(cell.textContent===""){
			cell.textContent=this.currPlayer;
			const xyString= cell.getAttribute('coordinate');
			const xy=xyString.split(",").map(Number);
			this.moveHistory.push(xy);
			this.checkWinner(xy);
			if(this.currPlayer==="X"){
				this.currPlayer="O";
				}else {this.currPlayer="X";}
			}
	}));
 }
 checkWinner(xy){
	 vertical=1;
	 horizontal=1;
	 leftDiagonal=1; 
	 rightDiagonal=1;
	 this.checkCells(xy);
	 if(vertical>=this.goal||
		horizontal>=this.goal||
		leftDiagonal>=this.goal||
		rightDiagonal>=this.goal
		){showWinner();}
 }
 checkCells(xy){
	 let possible=[
	[-1,-1],[0,-1],[1,-1],
	[-1,0] ,[0,0] ,[1,0],
	[-1,1] ,[0,1] ,[1,1]
	];
	//decide what possible are not there
	const fake= new Set([4]);
		//left
		if(xy[0]===1){
			fake.add(0).add(3).add(6);
		}//up
		if(xy[1]===1){
			fake.add(0).add(1).add(2);
		}//right
		if(xy[0]===this.width){
			fake.add(2).add(5).add(8);
		}//down
		if(xy[1]===this.width){
			fake.add(6).add(7).add(8);
		}
		for (const x of fake){ possible[x]=null;}
		//change each velocity to actual possible coordinates
		possible.forEach((pos,index)=>{
		if(pos!==null){
		for(let i=0; i<2;i++){
			pos[i]=pos[i]+xy[i];
			}
		//find the coordinate with same mark as currPlayer
		//then check next cell with same direction
		const cell=document.querySelector(`[coordinate="${pos}"]`);
		if(cell.textContent===this.currPlayer){
			switch(index){
			case(0):
			nextCell(pos,"leftUp");
			break;
			case(1):
			nextCell(pos,"up");
			break;
			case(2):
			nextCell(pos,"rightUp");
			break;
			case(3):
			nextCell(pos,"left");
			break;
			case(5):
			nextCell(pos,"right");
			break;
			case(6):
			nextCell(pos,"leftDown");
			break;
			case(7):
			nextCell(pos,"down");
			break;
			case(8):
			nextCell(pos,"rightDown");
			break;
			}
		}}
		});
		return;
 }
 redo(){
	 
 }
 restart(){
	 
 }
}

function nextCell(next, dir){
	 switch(dir){
		 case("leftUp"):
		 	leftDiagonal++;
			while(next[0]>1&&next[1]>1){
			next[0]--;
			next[1]--;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){leftDiagonal++;}
			}
			break;
		case("up"):
			vertical++;
			while(next[1]>1){
			next[1]--;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){vertical++;}
			}
			break;
		case("rightUp"):
		 	rightDiagonal++;
			while(next[0]<game.width && next[1]>1){
			next[0]++;
			next[1]--;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){rightDiagonal++;}
			}
			break;
		case("left"):
			horizontal++;
			while(next[0]>1){
			next[0]--;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){horizontal++;}
			}
			break;
		case("right"):
			horizontal++;
			while(next[0]<game.width){
			next[0]++;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){horizontal++;}
			}
			break;
		case("leftDown"):
			rightDiagonal++;
			while(next[0]>1&&next[1]<game.width){
			next[0]--;
			next[1]++;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){rightDiagonal++;}
			}
			break;
		case("down"):
			vertical++;
			while(next[1]<game.width){
			next[1]++;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){vertical++;}
			}
			break;
		case("rightDown"):
		 	leftDiagonal++;
			while(next[0]<game.width&&next[1]>game.width){
			next[0]++;
			next[1]++;
			const cell=document.querySelector(`[coordinate="${next}"]`);
			if(cell.textContent===game.currPlayer){leftDiagonal++;}
			}
			break;
	}
}
function showWinner(){
	const msg=document.createElement('h2');
	msg.setAttribute('id','statusMsg');
	msg.textContent=`${game.currPlayer} won!`;
	body.appendChild(msg);
}
const game= new Game();
