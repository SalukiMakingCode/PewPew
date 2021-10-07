(() => {
let c = document.getElementById("game");
let canonPosX=293;
let canonPosY=460;
let canonImg = document.getElementById("canon");
let pontPosX=0;
let pontPosY=420;
let pontImg = document.getElementById("pont");
let seaPosX=0;
let seaPosY=0;
let seaImg = document.getElementById("sea");
let boulet = [{ "id":0, "posX":-20, "posY":-20, "active":0 }] ;
let bouletImg = document.getElementById("boulet");
let boat = [{ "id":0, "posX":20, "posY":0, "img":"boat1Img", "vitesse":1, "active":0 }] ;
let boat1Img = document.getElementById("boat1");
let boat2Img = document.getElementById("boat2");
let iboat=1;
let live=5;
let liveImg = document.getElementById("live");
let liveLoseImg = document.getElementById("livelose");
let explode1Img = document.getElementById("explode1");
let explode2Img = document.getElementById("explode2");
let explode3Img = document.getElementById("explode3");
let explode4Img = document.getElementById("explode4");
let explode5Img = document.getElementById("explode5");
let explode6Img = document.getElementById("explode6");
let explode7Img = document.getElementById("explode7");
let explode8Img = document.getElementById("explode8");
let gameoverImg = document.getElementById("gameover");
let loadGameOver=0;
let statutGame="startscreen";
let statutCount=0;
let start1Img = document.getElementById("start1Img");
let start2Img = document.getElementById("start2Img");
let startscreen=start1Img;
let score=0;
let nameImg = document.getElementById("name");
let name="";
let highscoreImg = document.getElementById("highscore");

// test is boulet collide coat
function collide (bouletPosX, bouletPosY, bouletWidth, bouletLength, boatPosX, boatPosY, boatWidth, boatLength) {
    if (boatPosX > bouletPosX + bouletWidth ||
        boatPosX < bouletPosX - boatWidth ||
        boatPosY > bouletPosY + bouletLength ||
        boatPosY < bouletPosY - boatLength) {
        return false
    }
    else {
        return true
    }
}

// fonction name is clear no ?
function refreshScreen() {
    let ctx = c.getContext("2d");
    if (statutGame==="ingame") {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(seaImg, seaPosX, seaPosY);
        ctx.drawImage(pontImg, pontPosX, pontPosY);
        ctx.drawImage(canonImg, canonPosX, canonPosY);
        for (let i = 0; i < boat.length; i++) {
            if (boat[i]["active"] < 16) ctx.drawImage(eval(boat[i]["img"]), boat[i]["posX"], boat[i]["posY"]);
        }
        for (let i = 0; i < boulet.length; i++) {
            if (boulet[i]["active"] === 0) ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
        }
        live > 4 ? ctx.drawImage(liveImg, 500, 10) : ctx.drawImage(liveLoseImg, 500, 10);
        live > 3 ? ctx.drawImage(liveImg, 530, 10) : ctx.drawImage(liveLoseImg, 530, 10);
        live > 2 ? ctx.drawImage(liveImg, 560, 10) : ctx.drawImage(liveLoseImg, 560, 10);
        live > 1 ? ctx.drawImage(liveImg, 590, 10) : ctx.drawImage(liveLoseImg, 590, 10);
        live > 0 ? ctx.drawImage(liveImg, 620, 10) : ctx.drawImage(liveLoseImg, 620, 10);
        if (live < 1) loadGameOver++;
        ctx.font = '40px serif';
        ctx.fillStyle = "white";
        ctx.fillText(score, 10, 40);
        if (loadGameOver > 15 && loadGameOver <80) {
            ctx.drawImage(gameoverImg, 0, 0);
            document.getElementById("replay").style.display = "inline";
        }
        if (loadGameOver>=80) { //player tape his name
            ctx.drawImage(nameImg, 0, 0);
            ctx.font = '30px serif';
            ctx.fillStyle = "white";
            let posLetterX=320-(name.length*10);
            ctx.fillText(name, posLetterX, 230);
        }
    }
    if (statutGame==="startscreen") {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(eval(startscreen), 0, 0);
        statutCount++;
        if (statutCount>100) {
            statutCount=0;
            statutGame="highscore";
        }
    }
    if (statutGame==="highscore") {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(highscoreImg, 0, 0);
        ctx.font = '30px serif';
        ctx.fillStyle = "white";
        for (let i=0; i<arrayScore.length;i++) {
            if (arrayScore[i]["position"]===1) { ctx.fillText("1", 20, 80); ctx.fillText(arrayScore[i]["name"], 200, 80); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 80); }
            if (arrayScore[i]["position"]===2) { ctx.fillText("2", 20, 130); ctx.fillText(arrayScore[i]["name"], 200, 130); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 130);}
            if (arrayScore[i]["position"]===3) { ctx.fillText("3", 20, 180); ctx.fillText(arrayScore[i]["name"], 200, 180); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 180);}
            if (arrayScore[i]["position"]===4) { ctx.fillText("4", 20, 230); ctx.fillText(arrayScore[i]["name"], 200, 230); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 230);}
            if (arrayScore[i]["position"]===5) { ctx.fillText("5", 20, 280); ctx.fillText(arrayScore[i]["name"], 200, 280); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 280);}
            if (arrayScore[i]["position"]===6) { ctx.fillText("6", 20, 330); ctx.fillText(arrayScore[i]["name"], 200, 330); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 330);}
            if (arrayScore[i]["position"]===7) { ctx.fillText("7", 20, 380); ctx.fillText(arrayScore[i]["name"], 200, 380); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 380);}
            if (arrayScore[i]["position"]===8) { ctx.fillText("8", 20, 430); ctx.fillText(arrayScore[i]["name"], 200, 430); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 430);}
            if (arrayScore[i]["position"]===9) { ctx.fillText("9", 20, 480); ctx.fillText(arrayScore[i]["name"], 200, 480); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 480);}
            if (arrayScore[i]["position"]===10){  ctx.fillText("10", 20, 530); ctx.fillText(arrayScore[i]["name"], 200, 530); ctx.fillText(arrayScore[i]["score"]+" pts", 510, 530);}
        }
        statutCount++;
        if (statutCount>50) {
            statutCount=0;
            statutGame="startscreen";
        }
    }
    }

// move the boulet
setInterval(function() {
    if (statutGame==="ingame") {
    for (let i = 0; i < boulet.length; i++) {
        if (boulet[i]["active"] === 0) {
            let posY = boulet[i]["posY"];
            posY = posY - 10;
            boulet[i]["posY"] = posY;
        }
    }
    for (let i = 0; i < boulet.length; i++) {
        let posY = boulet[i]["posY"];
        let posX = boulet[i]["posX"];
        if (boulet[i]["active"] === 0) {
            for (let j = 0; j < boat.length; j++) {
                if (boat[j]["active"] === 0) {
                    let boatPosY = boat[j]["posY"];
                    let boatPosX = boat[j]["posX"];
                    if (collide(posX, posY, 20, 20, boatPosX, boatPosY, 80, 73) === true) {
                        boat[j]["active"] = 3;
                        boulet[i]["active"] = 1;
                        score=score+boat[j]["vitesse"];
                    }
                }
            }
        }
    }
    refreshScreen();
}
}, 100);

// move the boat and test crash on final line
setInterval(function(){
    if (statutGame==="ingame") {
        for (let i = 0; i < boat.length; i++) {
            let posY = boat[i]["posY"];
            if (posY <= 347 && boat[i]["active"] === 0) {
                posY = posY + boat[i]["vitesse"];
                boat[i]["posY"] = posY;
                boat[i]["img"] === "boat1Img" ? boat[i]["img"] = "boat2Img" : boat[i]["img"] = "boat1Img";
            }
            if (posY > 347 || boat[i]["active"] > 0) {
                if (boat[i]["active"] < 3) boat[i]["img"] = "explode1Img";
                if (boat[i]["active"] > 2 && boat[i]["active"] <= 4) boat[i]["img"] = "explode2Img";
                if (boat[i]["active"] > 4 && boat[i]["active"] <= 6) boat[i]["img"] = "explode3Img";
                if (boat[i]["active"] > 6 && boat[i]["active"] <= 8) boat[i]["img"] = "explode4Img";
                if (boat[i]["active"] > 8 && boat[i]["active"] <= 10) boat[i]["img"] = "explode5Img";
                if (boat[i]["active"] > 10 && boat[i]["active"] <= 12) boat[i]["img"] = "explode6Img";
                if (boat[i]["active"] > 12 && boat[i]["active"] <= 14) boat[i]["img"] = "explode7Img";
                if (boat[i]["active"] > 14 && boat[i]["active"] <= 16) boat[i]["img"] = "explode8Img";
                boat[i]["active"]++;
                if (boat[i]["active"] === 1) live--;
            }
        }
    }
    if (statutGame==="startscreen") {
        statutCount++;
        if (statutCount%3===0) {
            startscreen==="start1Img" ? startscreen="start2Img" : startscreen="start1Img";
        }
    }
        refreshScreen();

}, 100);

// generate new boat
    setInterval(function(){
        if (statutGame==="ingame") {
            let posX = rand(560);
            let vitesse = rand(10);
            if (score>100 && score<=200) vitesse=rand(11);
            if (score>200 && score<=300) vitesse=rand(12);
            if (score>300 && score<=400) vitesse=rand(13, 2);
            if (score>400 && score<=500) vitesse=rand(14, 2);
            if (score>500 && score<=600) vitesse=rand(13, 3);
            if (score>600 && score<=700) vitesse=rand(13, 4);
            if (score>700 && score<=800) vitesse=rand(12, 5);
            if (score>800 && score<=900) vitesse=rand(12, 6);
            if (score>900 && score<=1000) vitesse=rand(11, 7);
            if (score>1000 && score<=1200) vitesse=rand(11, 8);
            if (score>1200) vitesse=rand(11, 9);
            boat.push({"id": iboat, "posX": posX, "posY": 0, "img": "boat1Img", "vitesse": vitesse, "active": 0});
            iboat++;
            if (score>800) {
                let posX = rand(560);
                let vitesse = rand(20);
                boat.push({"id": iboat, "posX": posX, "posY": 0, "img": "boat1Img", "vitesse": vitesse, "active": 0});
                iboat++;
            }
            if (score>2500) {
                let posX = rand(560);
                let vitesse = rand(20,5);
                boat.push({"id": iboat, "posX": posX, "posY": 0, "img": "boat1Img", "vitesse": vitesse, "active": 0});
                iboat++;
            }
            refreshScreen();
        }
    }, 1500);

//send the boulet
function fire() {
    if (statutGame==="ingame") {
        let idBoulet = boulet.length + 1;
        let posX = canonPosX + 22;
        let posY = canonPosY - 20;
        boulet.push({"id": idBoulet, "posX": posX, "posY": posY, "active": 0});
        refreshScreen();
    }
}

//make the canon appear and move
function draw(left, right, up, down) {
    let ctx = c.getContext("2d");

    if ((left===undefined || left===0) && (right===undefined || right===0) && (up===undefined || up===0) && (down===undefined || down===0)) {
        refreshScreen();
    }
    if (left===10 && canonPosX>10) {
        canonPosX-=10;
        refreshScreen()
    }
    if (right===10 && canonPosX<576) {
        canonPosX+=10;
        refreshScreen();
    }
    if (up===10 && canonPosY>420) {
        canonPosY-=10;
        refreshScreen();
    }
    if (down===10 && canonPosY<460) {
        canonPosY+=10;
        refreshScreen();
    }
}

//update name of the player when a letter in keydown
function writeLetter(letter){
    if (name.length<12) {
        name = name + letter.toUpperCase();
    }
    else alerte("maximum 12 letters");
}
function deleteLetter() {
    name=name.substring(0, name.length - 1);
}
function validateName() {
    if (name.length===0) alerte("Please tape some letter to validate your name");
    else {
        loadGameOver=0;
        statutGame="highscore";
        let position=1;
        let i=0;
        for (i=0; i<arrayScore.length; i++) {
            if (arrayScore[i]["score"]>score) position++;
        }
        for (let j=0; j<arrayScore.length;j++) {
            if (position<arrayScore[j]["position"]) arrayScore[j]["position"]=arrayScore[j]["position"]+1;
        }
        position++;
        arrayScore.push({"id":i+1, "name":name, "score":score, "position":position});
        console.log(arrayScore);
    }
}


//listen for move and fire and catch name of the player
window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" || event.key === "Left") {
       draw(10);
    }
    if (event.key === "ArrowRight" || event.key === "Right") {
        draw(0, 10);
    }
    if (event.key === "ArrowUp" || event.key === "Up") {
        draw(0, 0, 10);
    }
    if (event.key === "ArrowDown" || event.key === "Down") {
        draw(0, 0, 0, 10);
    }
    if (event.key === " ") {
        fire();
    }
    if ((event.key === "a" || event.key === "A") && loadGameOver>=80) { writeLetter("a");}
    if ((event.key === "b" || event.key === "B") && loadGameOver>=80) { writeLetter("b");}
    if ((event.key === "c" || event.key === "C") && loadGameOver>=80) { writeLetter("c");}
    if ((event.key === "d" || event.key === "D") && loadGameOver>=80) { writeLetter("d");}
    if ((event.key === "e" || event.key === "E") && loadGameOver>=80) { writeLetter("e");}
    if ((event.key === "f" || event.key === "F") && loadGameOver>=80) { writeLetter("f");}
    if ((event.key === "g" || event.key === "G") && loadGameOver>=80) { writeLetter("g");}
    if ((event.key === "h" || event.key === "H") && loadGameOver>=80) { writeLetter("h");}
    if ((event.key === "i" || event.key === "I") && loadGameOver>=80) { writeLetter("i");}
    if ((event.key === "j" || event.key === "J") && loadGameOver>=80) { writeLetter("j");}
    if ((event.key === "k" || event.key === "K") && loadGameOver>=80) { writeLetter("k");}
    if ((event.key === "l" || event.key === "L") && loadGameOver>=80) { writeLetter("l");}
    if ((event.key === "m" || event.key === "M") && loadGameOver>=80) { writeLetter("m");}
    if ((event.key === "n" || event.key === "N") && loadGameOver>=80) { writeLetter("n");}
    if ((event.key === "o" || event.key === "O") && loadGameOver>=80) { writeLetter("o");}
    if ((event.key === "p" || event.key === "P") && loadGameOver>=80) { writeLetter("p");}
    if ((event.key === "q" || event.key === "Q") && loadGameOver>=80) { writeLetter("q");}
    if ((event.key === "r" || event.key === "R") && loadGameOver>=80) { writeLetter("r");}
    if ((event.key === "s" || event.key === "S") && loadGameOver>=80) { writeLetter("s");}
    if ((event.key === "t" || event.key === "T") && loadGameOver>=80) { writeLetter("t");}
    if ((event.key === "u" || event.key === "U") && loadGameOver>=80) { writeLetter("u");}
    if ((event.key === "v" || event.key === "V") && loadGameOver>=80) { writeLetter("v");}
    if ((event.key === "w" || event.key === "W") && loadGameOver>=80) { writeLetter("w");}
    if ((event.key === "x" || event.key === "X") && loadGameOver>=80) { writeLetter("x");}
    if ((event.key === "y" || event.key === "Y") && loadGameOver>=80) { writeLetter("y");}
    if ((event.key === "z" || event.key === "Z") && loadGameOver>=80) { writeLetter("z");}
    if (event.key === " " && loadGameOver>=80) { writeLetter(" ");}
    if (event.key === "Backspace" && loadGameOver>=80) { deleteLetter();}
    if (event.key === "Enter" && loadGameOver>=80) { validateName();}
});

// listen to click to play or replay
document.getElementById("play").addEventListener("click", (event)=>{
    event.preventDefault();
    statutGame="ingame";
    draw();
    document.getElementById("play").style.display="none"
})

document.getElementById("replay").addEventListener("click", (event)=>{
    event.preventDefault();
    statutGame="ingame";
    document.getElementById("replay").style.display="none";
    boulet = [{ "id":0, "posX":-20, "posY":-20, "active":0 }] ;
    boat = [{ "id":0, "posX":20, "posY":0, "img":"boat1Img", "vitesse":1, "active":0 }] ;
    score=0;
    loadGameOver=0;
    live=5;
    draw();
})

// load game
setTimeout(function(){ refreshScreen(); }, 700);

})();
