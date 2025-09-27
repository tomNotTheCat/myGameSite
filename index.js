//index
function createOptions(){
	const box=document.getElementById('optionContainer');
	const ticBtn=document.createElement('button');
	const connect4Btn=document.createElement('button');
	const connect5Btn=document.createElement('button');
	ticBtn.textContent="Tic Tac Toe";
	connect4Btn.textContent="Connect 4";
	connect5Btn.textContent="Connect 5";
	box.append(ticBtn,connect4Btn,connect5Btn);
	ticBtn.addEventListener('click',tic);
	connect4Btn.addEventListener('click',con4);
	connect5Btn.addEventListener('click',con5);
}
function tic(){
	restart();
	const title=document.getElementById('title');
	title.textContent="Tic Tac Toe";
	makeCells(3);
	game.init(3);
}
function con4(){
	restart();
	const title=document.getElementById('title');
	title.textContent="Connect 4";
	makeCells(6);
	game.init(4);
}
function con5(){
	restart();
	const title=document.getElementById('title');
	title.textContent="Connect 5";
	makeCells(12);
	game.init(5);
}
function restart(num){
	const msg=document.getElementById('statusMsg');
	msg.style.display='none';
	const old =document.getElementsByClassName('gameWrapper');
	if(old[0]){body.removeChild(old[0]);}
	const newGame= document.createElement('div');
	newGame.setAttribute('class','gameWrapper');
	body.appendChild(newGame);
	if(num>=3){
	makeCells(num);
	game.init(num);
	}
}
function makeCells(num){
	const undoBtn=document.getElementById("undoBtn");
	undoBtn.style.display='block';
	const resBtn=document.getElementById("resBtn");
	resBtn.style.display='block';
	const wrapper =document.getElementsByClassName('gameWrapper');
	wrapper[0].style.gridTemplateColumns=(`repeat(${num}, auto)`);
	wrapper[0].style.width=`${num*50}px`;
	wrapper[0].style.height=`${num*50}px`;
	wrapper[0].style.paddingBottom=`${1+2*num}px`;
	wrapper[0].style.paddingRight=`${1+2*num}px`;
	for (let i=1;i<num+1; i++){
		for (let j=1;j<num+1;j++){
		const cell=document.createElement('div');
		cell.textContent="";
		cell.setAttribute('class','cell');
		cell.setAttribute('coordinate',[j,i]);
		wrapper[0].appendChild(cell);
		}
	}
	game.width=num;
}
const body= document.body;
document.addEventListener('DOMContentLoaded', createOptions);
const game= new Game();
const undoBtn=document.getElementById("undoBtn");
undoBtn.addEventListener('click',game.undo);
const resBtn=document.getElementById("resBtn");
resBtn.addEventListener('click',()=>{restart(game.width)});