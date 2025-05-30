/*
@title: Simple Graphing Calculator
@author: apinguen
@tags: ['utility']
@addedOn: 2025-03-19
@description: A graphing calculator that can plot mathematical functions using simple operations (addition, subtraction, multiplication, division, exponent). Enter equations and see them visualized on a coordinate plane.

Github: @apinguen

Can graph most functions that only use simple operations (addition, subtraction, multiplication, division, exponent)

L: Switch between graphing/entering equation
WASD: Move cursor
I: Add character
K: Backspace

You can input a number and then select the height/width/scale (spacing of the dots on the axes) by clicking on their respective buttons
Height: Needs to be positive odd integer
Width: Needs to be positive odd integer
Scale: Needs to be positive integer

Non-functions aren't exactly supported; Only one point will be plotted per x value
Only whole numbers supported for points :(
MULTIPLICATION USING TERMS NEXT TO EACH OTHER DOESN'T WORK
(Ex. 2(3); 3x)
You need a multiplication sign in between

*/
var isdead = false

graphStats = {
  // Width and height need to be odd numbers
  
  width: 159,
  height: 127,
  scaling: 5
}

const UI = map`
hhhhhhhhhh
qqqqqqqqqq
qqqqqqqqqq
hhhhhhhhhh
0123456789
asmdefkl.x
hhhhhhh...
hhhhhhhpno`;

const CHARS = {
  ZERO: "0",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  DECIMAL: ".",
  X: "X",
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  DIVISION: "/",
  EXPONENT: "^",
  OPENPARENTHESIS: "(",
  CLOSEDPARENTHESIS: ")"
  
}
// Number/operation sprites from Sameer Murthy (@SameeraMurthy on Github)
const 
zero= "0",
one = "1",
two = "2",
three= "3",
four= "4",
five= "5",
six= "6",
seven= "7",
eight= "8",
nine= "9",
x= "x",
y= "y",
addition= "a",
subtraction= "s",
multiplication= "m",
division= "d",
exponent= "e",
decimal= "f",
point="g",
axis1="h",
axis2="i",
cursor="j",
openParenthesis="k",
closedParenthesis="l",

setWidth="p",
setHeight="n",
setScale="o",
black="q";

setLegend(
  
  [cursor, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`],
  [ one, bitmap`
................
................
.......CCC......
......CCCC......
.....CCCCC......
.....CC.CC......
........CC......
........CC......
........CC......
........CC......
........CC......
........CC......
.....CCCCCCC....
.....CCCCCCC....
................
................`],
  [ two, bitmap`
................
................
.....7777.......
....7777777.....
.........777....
..........77....
..........77....
......777777....
.....777777.....
....777.........
....77..........
....77..........
....77777777....
....77777777....
................
................`],
  [ three, bitmap`
................
................
....5555555.....
....55555555....
.........555....
..........55....
..........55....
......555555....
......55555.....
..........55....
..........55....
.........555....
....55555555....
....5555555.....
................
................`],
  [ four, bitmap`
................
................
........LL......
.......LLL......
......LLLL......
.....LLLLL......
....LLL.LL......
...LLL..LL......
...LL...LL......
...LLLLLLLLLL...
...LLLLLLLLLL...
........LL......
........LL......
........LL......
................
................`],
  [ five, bitmap`
................
................
....FFFFFFF.....
....FFFFFFF.....
....FF..........
....FF..........
....FFFF........
.....FFFFFF.....
........FFF.....
.........FF.....
........FFF.....
.......FFFF.....
....FFFFFF......
....FFFFF.......
................
................`],
  [ six, bitmap`
................
................
.....444444.....
....4444444.....
....44..........
...444..........
...44...........
...4444444......
...444444444....
...44....444....
...44.....44....
...444....44....
....44444444....
.....444444.....
................
................`],
  [ seven, bitmap`
................
................
....DDDDDDDDD...
....DDDDDDDDD...
..........DDD...
.........DDD....
........DDD.....
.......DDD......
......DDD.......
......DD........
.....DDD........
.....DD.........
.....DD.........
.....DD.........
................
................`],
  [ eight, bitmap`
................
................
.....888888.....
....88888888....
...88......88...
...88......88...
...88......88...
.....888888.....
....88888888....
...88......88...
...88......88...
...888....888...
....88888888....
.....888888.....
................
................`],
  [ nine, bitmap`
................
................
.....HHHHHH.....
....HHHHHHHH....
....HH....HH....
....HH.....HH...
....HHH....HH...
....HHHHHHHHH...
......HHHHHHH...
...........HH...
..........HHH...
.........HHH....
.....HHHHHH.....
.....HHHHH......
................
................`],
  [ zero, bitmap`
................
................
.....999999.....
....99999999....
...99.....999...
...999.....99...
...9999....99...
...99.99...99...
...99..99..99...
...99...99.99...
...99....9999...
...999....999...
....99999999....
.....999999.....
................
................`],
  [ addition, bitmap`
................
................
................
................
.......00.......
.......00.......
.......00.......
....00000000....
....00000000....
.......00.......
.......00.......
.......00.......
................
................
................
................`],
  [ subtraction, bitmap`
................
................
................
................
................
................
................
....00000000....
....00000000....
................
................
................
................
................
................
................`],
  [ multiplication, bitmap`
................
................
................
................
................
.....LL...00....
.....LLL.000....
......LLL00.....
.......L0L......
......00LLL.....
.....000.LLL....
.....00...LL....
................
................
................
................`],
  [ division, bitmap`
................
................
................
................
.......00.......
.......00.......
................
....00000000....
....00000000....
................
.......00.......
.......00.......
................
................
................
................`],
  [ exponent, bitmap`
................
................
................
.......000......
......00000.....
.....000.000....
....000...000...
....00.....00...
................
................
................
................
................
................
................
................`],
  [ decimal, bitmap`
................
................
................
................
................
................
................
................
................
................
......000.......
......000.......
......000.......
................
................
................`],
  [ point, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ x, bitmap`
................
................
................
................
................
....00.....0....
.....00...00....
......00.00.....
.......000......
......00000.....
.....00...00....
....00.....0....
................
................
................
................`],
  [openParenthesis, bitmap`
................
.....000........
.....00.........
....00..........
....00..........
...000..........
...00...........
...00...........
...00...........
...00...........
...000..........
....00..........
....00..........
.....00.........
.....000........
................`],
  [closedParenthesis, bitmap`
................
........000.....
.........00.....
..........00....
..........00....
..........000...
...........00...
...........00...
...........00...
...........00...
..........000...
..........00....
..........00....
.........00.....
........000.....
................`],
  [axis1, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [axis2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [setWidth, bitmap`
................
................
................
...0........0...
...0........0...
...0........0...
....0..00..0....
....0..00..0....
....0.0..0.0....
....0.0..0.0....
.....0....0.....
.....0....0.....
.....0....0.....
................
................
................`],
  [setHeight, bitmap`
................
................
................
....00....00....
....00....00....
....00....00....
....00....00....
....00000000....
....00000000....
....00....00....
....00....00....
....00....00....
....00....00....
................
................
................`],
  [setScale, bitmap`
................
................
................
......00000.....
.....0..........
....0...........
....0...........
.....00000......
..........0.....
..........0.....
..........0.....
....000000......
................
................
................
................`],
  [black, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

function isInt(value) {
return !isNaN(value) && 
       parseInt(Number(value)) == value && 
       !isNaN(parseInt(value, 10));
}

function returnShiftedX(x) {
return x+(graphStats.width-1)/2
}

function returnShiftedY(y) {
return (graphStats.height-1)/2-y
}

class Game {
  constructor() {
    this.state = "UI";
    this.cursorPos = {x:0,y:4};
    this.selectedChar = CHARS.ZERO;
    this.equation = "";
    this.errorMessage = "";
    this.equationCheck = "";
    this.errorOccured = false;
    this.message = "";
  }

  solveEquation(equation) {
    try{
      return Function(`'use strict'; return (${equation.replaceAll("^","**")})`)();
    }
    catch(err) {
      console.log(err);
      this.errorOccured = true;
      return undefined;
    }
    
  }

  
  checkMessage() {
    if (this.message != "") {
      addText(this.message, {x:1,y:1,color:color`2`});
    }
  }

  renderUI() {
    clearText();
    setMap(UI);
    if (getFirst(cursor) != null) {
        getFirst(cursor).remove();
    }
    addSprite(this.cursorPos.x, this.cursorPos.y, cursor);

    addText("y="+this.equation,{x:1,y:4,color:color`2`});
    addText("Set to input:", {x:1,y:14,color:color`0`});
    
    
    this.equationCheck = this.solveEquation(this.equation.replaceAll("X","(1)"));
    
    if (this.errorOccured) {
      this.errorMessage = "Error with equation";
    } else {
      this.errorMessage = "";
      //console.log(this.equationCheck);
    }

    if (this.equationCheck == "Infinity") {
      this.errorMessage = "Divide by 0";
      this.errorOccured = true;
    }
    
    
    
    this.message = "";
    
    switch (this.cursorPos.y) {
        case 4:
            switch (this.cursorPos.x) {
                case 0: this.selectedChar = CHARS.ZERO; break;
                case 1: this.selectedChar = CHARS.ONE; break;
                case 2: this.selectedChar = CHARS.TWO; break;
                case 3: this.selectedChar = CHARS.THREE; break;
                case 4: this.selectedChar = CHARS.FOUR; break;
                case 5: this.selectedChar = CHARS.FIVE; break;
                case 6: this.selectedChar = CHARS.SIX; break;
                case 7: this.selectedChar = CHARS.SEVEN; break;
                case 8: this.selectedChar = CHARS.EIGHT; break;
                case 9: this.selectedChar = CHARS.NINE; break;
            }
            break;
        case 5:
            switch (this.cursorPos.x) {
                case 0: this.selectedChar = CHARS.ADDITION; break;
                case 1: this.selectedChar = CHARS.SUBTRACTION; break;
                case 2: this.selectedChar = CHARS.MULTIPLICATION; break;
                case 3: this.selectedChar = CHARS.DIVISION; break;
                case 4: this.selectedChar = CHARS.EXPONENT; break;
                case 5: this.selectedChar = CHARS.DECIMAL; break;
                case 6: this.selectedChar = CHARS.OPENPARENTHESIS; break;
                case 7: this.selectedChar = CHARS.CLOSEDPARENTHESIS; break;
                case 9: this.selectedChar = CHARS.X; break;
            }
            break;
      case 7:
        switch (this.cursorPos.x) {
          case 7:
            this.selectedChar = "Width";
            this.message = "Width-Odd Integer";
            if (this.equation <1  || !isInt(this.equation) || this.equation%2 == 0 || this.equation.includes("X") || this.equation ** 0 != 1) {
              this.errorOccured = true;
              this.errorMessage = "Width not odd int";
            }
          break;
          case 8:
            this.selectedChar = "Height";
            this.message = "Height-Odd Integer";
            if (this.equation <1  || !isInt(this.equation) || this.equation%2 == 0 || this.equation.includes("X") || this.equation ** 0 != 1) {
              this.errorOccured = true;
              this.errorMessage = "Height not odd int";
            }
          break;
          case 9:
            this.selectedChar = "Scale";
            this.message = "Scale-Integer";
            if (this.equation <1  || !isInt(this.equation) || this.equation.includes("X") || this.equation ** 0 != 1) {
              this.errorOccured = true;
              this.errorMessage = "Scale not int";
            }
            
          break;
        }
      break;
        
    }
    console.log(this.errorMessage);
      addText(this.errorMessage,{x:1,y:5,color:color`3`});
    this.errorOccured = false;
}

  resetGraph() {
    //console.log("getAll:"+getAll(point));
    
    clearText();
    let graph = "";
    for (let i = 0; i<graphStats.height;i++) {
      let row = "";
      for (let j = 0; j<graphStats.width;j++) {

        if (j == (graphStats.width-1)/2){
          if (returnShiftedX(i)%graphStats.scaling == 0 ) {
            //console.log(j%20);
            //console.log(j);
            row = row + "i";
          } else {
            row = row + "h";
          }
        } else if (i == ((graphStats.height-1)/2)) {
          if (returnShiftedY(j)%graphStats.scaling == 0) {
            row = row + "i";
          } else {
            row = row + "h";
          } 
        } else {
          row = row + ".";
        }
      };
      graph = graph + row + "\n";
    };
    setMap(graph);
  }

  confirmSelection() {
    if (this.selectedChar == "Width") {
      if (this.equation > 0 && isInt(this.equation) && this.equation%2 != 0 && !this.equation.includes("X") && this.equation ** 0 == 1){
        graphStats.width = this.equation;
      }
    } else if (this.selectedChar == "Height") {
      if (this.equation > 0 && isInt(this.equation) && this.equation%2 != 0 && !this.equation.includes("X") && this.equation ** 0 == 1){
        graphStats.height = this.equation;
      }
    } else if (this.selectedChar == "Scale") {
      if (this.equation > 0 && isInt(this.equation) && !this.equation.includes("X") && this.equation ** 0 == 1){
        graphStats.scaling = this.equation;
      }
    } else {
      if (this.equation.length < 16) {
        this.equation += this.selectedChar;
      }
    }
  }

  plotPoint(x, y) {
    if (isInt(y) == true) {
      //console.log("Added point at "+x+","+y);
      try {
        addSprite(returnShiftedX(x), returnShiftedY(y), point);
      } catch {
        //console.log(x+(graphStats.width-1)/2);
        //console.log((graphStats.height-1)/2-y);
      }
    } else {
      //console.log("Non int:"+y);
    }
  }

  drawGraph() {
    
    //console.log(0-((graphStats.width-1)/2));
    //console.log("Width:"+graphStats.width);
    
      for (let i = 0-((graphStats.width-1)/2); i<graphStats.width; i++) {
        console.log("i:"+i);
          if (this.solveEquation(this.equation.replaceAll("X","("+i+")")) == undefined) {
            console.log("Undefined");
              continue;
          }
          if (this.solveEquation(this.equation.replaceAll("X","("+i+")")) == "Infinity") {
            console.log("Infinity");
              continue;
          }
          if (this.solveEquation(this.equation.replaceAll("X","("+i+")")) == "NaN") {
            console.log("NaN");
              continue;
          }
          //console.log("i:"+i);
          //console.log(this.solveEquation(this.equation.replaceAll("X",i)));
          //console.log((graphStats.height-1)/2-(this.solveEquation(this.equation.replaceAll("X",i))*graphStats.scaling));
          
        //console.log("Equation:"+this.equation+" ("+i+")");
        //console.log(this.solveEquation(this.equation.replaceAll("X","("+i+")")))
        try {
          
          this.plotPoint(i,this.solveEquation(this.equation.replaceAll("X","("+i+")")));
        } catch(err) {
            console.log(err);
        }
      }
  }
}

let game = new Game();

game.renderUI();
// Enter key
onInput("i", () => {
  if (game.state == "UI") {
    game.confirmSelection();
  }
});

onInput("k", () => {
      if (game.equation != "" && game.state == "UI") {
      game.equation = game.equation.slice(0, -1);
    }
  });

// Left select
onInput("a", () => {
  if (game.state == "UI") {
    if ((game.cursorPos.x > 0 && game.cursorPos.y < 6) || (game.cursorPos.x > 7 && game.cursorPos.y > 4)) {
      game.cursorPos.x--;
    }
  }
});

// Right select
onInput("d", () => {
  if (game.state == "UI") {
    if (game.cursorPos.x < 9) {
      game.cursorPos.x++;
    }
  }
});

// Up select
onInput("w", () => {
  if (game.state == "UI") {
    if (game.cursorPos.y > 4) {
      game.cursorPos.y--;
    }
  }
});

// Down select
onInput("s", () => {
  if (game.state == "UI") {
    if ((game.cursorPos.y < 5 && game.cursorPos.x < 7) || (game.cursorPos.y < 7 && game.cursorPos.x > 6)) {
      game.cursorPos.y++;
    }
  }
});

// Switch between UI and graph
onInput("l", () => {
  if (game.state == "UI") {
    game.state = "graph";
  } else if (game.state == "graph") {
    game.state = "UI";
  }
});

afterInput(() => {
    if (game.state == "UI") {
        game.renderUI();
        game.checkMessage();
    } else if (game.state == "graph") {
        game.resetGraph();
        game.drawGraph();
    }
    
})
