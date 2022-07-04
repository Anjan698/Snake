function enableButton(id)
{
	document.getElementById(id).disabled = false;
}
function disableButton(id)
{
	document.getElementById(id).disabled = true;
}
function showTurn(ply) 
{
	document.getElementById("splayer").innerHTML = ply.color + "'s Turn";
}
function MultishowTurn(ply) 
{
	document.getElementById("mplayer").innerHTML = ply.color + "'s Turn";
}
function pplay()
{
	p.roll(random_number);
	p.move();
	if(com.position > 0)
		com.show(com.position);
	showTurn(com);
	if(p.position == 100) 
	{	
		alert("you win");
		reset();
		setTimeout(enableButton("dicebtn"),500);
		setTimeout(enableButton("reset"),500);
	}
	else setTimeout(bot,1000); 
}
function play()
{
	disableButton("dicebtn");
    disableButton("reset");
    rand();
	myfun();
	setTimeout(pplay,3000);
}
function complay()
{
	com.roll(random_number);
	com.move();
	if(p.position > 0)
		p.show(p.position);
	if(com.position == 100)
	{	
		alert("you lose");
		reset();
	}
	showTurn(p);
	setTimeout(enableButton("dicebtn"),500);
	setTimeout(enableButton("reset"),500);
}
function bot()
{
    rand();
	myfun();
	setTimeout(complay,3000);
}
function showGame() 
{
	document.getElementById("game").style.display = "block";
	document.getElementById("head").style.display = "none";
}
function senable() {
	document.getElementById("sbtn").style.display = "block";
}
function menable(){
	document.getElementById("mbtn").style.display = "block";
}
function getcolor()
{
	var color = prompt("Enter Color: ","black");
	if(color == "yellow")
	{
		alert("Not available");
		color = prompt("Enter Color: ","black");
	}
	document.getElementById("splayer").innerHTML = color + "'s Turn";
	p = new Player(color);
}
function singleplayer() {
	showGame();
	senable();
	getcolor();
	com = new Player("yellow");
	document.getElementById("splayer").innerHTML = yellow;
}
var i=0;
function delayplaymulti()
{
	players[i].roll(random_number);
	players[i].move();
	for(var k = 0; k < nop; k++)
	{
		if(players[k].position > 0)
			players[k].show(players[k].position);
	}
	if(globalpostion <= players[i].position)
		globalpostion = players[i].position;
	if(globalpostion == 100)
	{
		alert(newFunction() + " Wins");
		reset();
	}
	else{
		++i;
		if(i == nop)
		i = 0;
		MultishowTurn(players[i]);
	}
	function newFunction() {
		return players[i].color;
	}
}
function playmulti()
{
    rand();
    myfun();
	setTimeout(delayplaymulti,3000);
}
function start()
{
	disableButton("btn1");
	setTimeout(playmulti(),3000);
	setTimeout(enableButton("btn1"),3000);
}
  function multiplayer()
{
	menable();
	showGame();
	nop = prompt("Enter No. of Players : ","2"); 
	for(var i = 0; i < nop; ++i)
	{
		var color = prompt("Enter Player One color :"); 
		
		for(var k = 0; k < i; ++k)
		{
			if(color == players[k].color)
			{
				alert("Not available");
				color = prompt("Enter color :");
				break;
			}
		}
		players[i] = new Player(color); 
	}
	MultishowTurn(players[0]); 
}
var c = document.getElementById("board");
var ctx = c.getContext("2d");
var p,com; 
var nop; 
var tiles = new Array(); 
var players = new Array();
var globalpostion = 0;
var random_number;
class Tile{
	constructor(x,y,wh,ht,next){
		this.x = x; 
		this.y = y; e
		this.wh = wh; 
		this.ht = ht;
		this.next = next; 
    }
}

function rand()
{
	random_number = Math.ceil(Math.random() * 6);
}
class Player
{
	constructor(color)
	{
		this.position = 0; 
		this.pre = 0; 
    	this.r = 0; 
		this.color = color; 
	}
	roll(r) 
	{
		this.r = r;
		this.pre = this.position;
		this.position += this.r;
		if(this.position > 100)
			this.position = this.pre;
	}
	remove(pos) 
	{
		if((pos > 0) && (pos != this.position))
		{
			var p = tiles[pos-1];
			ctx.clearRect(p.x,p.y,p.wh,p.ht);
		}
	}
	show(pos) 
	{
		var cur = tiles[pos-1];
		ctx.beginPath();
		ctx.arc(cur.x+25, cur.y+25, 22, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	move()
	{
		this.show(this.position);
		this.remove(this.pre);
		
		if(tiles[this.position - 1].next != this.position)
		{
			this.pre = this.position;
			this.position = tiles[this.position - 1].next;
			this.remove(this.pre);
			this.show(this.position);
		}
	}
}

function setup()
{
	var wh = 600;
	var ht = 600; 
	var boxwh = wh/10; 
	var boxht = ht/10; 
	var x1 = 0;
	var x2 = 9 * boxwh;
	var y = 9 * boxht;
	var c=0;
	for(var i = 0; i < 10; ++i)
	{
		for(var j = 0; j < 10; ++j)
		{
			if(i % 2 == 0)
			{
				tiles[c++] = new Tile(x1,y,boxwh,boxht,c);
				x1 += boxwh;
			}
			else{
				tiles[c++] = new Tile(x2,y,boxwh,boxht,c);
				x2 -= boxwh;
			}
		}
		x1 = 0;
		x2 = 9 * boxwh;
		y -= boxht;
	}
	
	tiles[0].next = 38;
	tiles[3].next = 14;
	tiles[8].next = 31;
	tiles[27].next = 84;
	tiles[20].next = 42;
	tiles[50].next = 67;
	tiles[71].next = 91;
	tiles[79].next = 99;
	
	tiles[16].next = 7;
	tiles[53].next = 34;
	tiles[61].next = 19;
	tiles[63].next = 60;
	tiles[86].next = 36;
	tiles[92].next = 73;
	tiles[94].next = 75;
	tiles[97].next = 79;
}
setup();

function singlereset()
{
	setup();
	p = new Player("black");
	com = new Player("yellow");
	var players = new Array();
	ctx.clearRect(0,0,600,600);
	singleplayer();
}

function multireset()
{
	setup();
	p = new Player("black");
	com = new Player("yellow");
	var players = new Array();
	ctx.clearRect(0,0,600,600);
	multiplayer();
}

function off()
{
	document.getElementById("overlay").style.display="none";
}
function random()
{
	document.getElementById("overlay").style.display="block";
	var x = random_number;
    document.getElementById("number").innerHTML = x;
}
function myfun()
{
	document.getElementById("overlay").style.display="none";
	document.getElementById("cube").style.transform = "rotateY(360deg)  rotateX(360deg)";
	setTimeout(nochange,800);
}
function nochange()
{
	document.getElementById("cube").style.transform = "rotateY(90deg) rotateX(0)";
    setTimeout(random,1200);
}
