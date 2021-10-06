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
let boulet = [{ "id":0, "posX":-20, "posY":-20 }] ;
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
// fonction name is clear no ?
function refreshScreen() {
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.drawImage(seaImg, seaPosX, seaPosY);
    ctx.drawImage(pontImg, pontPosX, pontPosY);
    ctx.drawImage(canonImg, canonPosX, canonPosY);
    for (let i=0; i<boat.length; i++) {
        if (boat[i]["active"]<16) ctx.drawImage(eval(boat[i]["img"]), boat[i]["posX"], boat[i]["posY"]);
    }
    for (let i=0; i<boulet.length; i++) {
        ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
    }
    live>4 ? ctx.drawImage(liveImg, 500, 10) : ctx.drawImage(liveLoseImg, 500, 10);
    live>3 ? ctx.drawImage(liveImg, 530, 10) : ctx.drawImage(liveLoseImg, 530, 10);
    live>2 ? ctx.drawImage(liveImg, 560, 10) : ctx.drawImage(liveLoseImg, 560, 10);
    live>1 ? ctx.drawImage(liveImg, 590, 10) : ctx.drawImage(liveLoseImg, 590, 10);
    live>0 ? ctx.drawImage(liveImg, 620, 10) : ctx.drawImage(liveLoseImg, 620, 10);
    if (live<1) loadGameOver++;
    if (loadGameOver>15) {
        ctx.drawImage(gameoverImg, 0, 0);
        document.getElementById("replay").style.display="inline";
    }
    }

// move the boulet
setInterval(function(){
    for (let i=0; i<boulet.length; i++) {
        let posY=boulet[i]["posY"];
        posY=posY-10;
        boulet[i]["posY"]=posY;
    }
    refreshScreen();
}, 100);

// move the boat and test crash on final line
setInterval(function(){
    for (let i=0; i<boat.length; i++) {
        let posY=boat[i]["posY"];
        if (posY<=347) {
            posY=posY+boat[i]["vitesse"];
            boat[i]["posY"]=posY;
            boat[i]["img"]==="boat1Img" ? boat[i]["img"]="boat2Img" : boat[i]["img"]="boat1Img";
        }
        if (posY>347) {
            if (boat[i]["active"]<3) boat[i]["img"]="explode1Img";
            if (boat[i]["active"]>2 && boat[i]["active"]<=4) boat[i]["img"]="explode2Img";
            if (boat[i]["active"]>4 && boat[i]["active"]<=6) boat[i]["img"]="explode3Img";
            if (boat[i]["active"]>6 && boat[i]["active"]<=8) boat[i]["img"]="explode4Img";
            if (boat[i]["active"]>8 && boat[i]["active"]<=10) boat[i]["img"]="explode5Img";
            if (boat[i]["active"]>10 && boat[i]["active"]<=12) boat[i]["img"]="explode6Img";
            if (boat[i]["active"]>12 && boat[i]["active"]<=14) boat[i]["img"]="explode7Img";
            if (boat[i]["active"]>14 && boat[i]["active"]<=16) boat[i]["img"]="explode8Img";
            boat[i]["active"]++;
            if (boat[i]["active"]===1) live--;
        }
    }
    refreshScreen();
}, 100);

// generate new boat
    setInterval(function(){
        let posX=rand(560);
        let vitesse=rand(10);
        boat.push({"id":iboat,"posX":posX ,"posY":0, "img":"boat1Img", "vitesse":vitesse, "active":0 });
        iboat++;
        refreshScreen();
    }, 1500);
//send the boulet
function fire() {
    let idBoulet= boulet.length +1 ;
    let posX = canonPosX +22;
    let posY = canonPosY -20;
    boulet.push({"id":idBoulet,"posX":posX ,"posY":posY});
    refreshScreen();
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
//listen for move and fire.
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
});
// load game
setTimeout(function(){ draw(); }, 500);

})();
