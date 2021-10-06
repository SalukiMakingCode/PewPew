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

setInterval(function(){
    for (let i=0; i<boulet.length; i++) {
        let posY=boulet[i]["posY"];
        posY=posY-10;
        boulet[i]["posY"]=posY;
    }
    draw();
}, 200);

function fire() {
    let ctx = c.getContext("2d");
    let idBoulet= boulet.length +1 ;
    let posX = canonPosX +22;
    let posY = canonPosY -20;
    boulet.push({"id":idBoulet,"posX":posX ,"posY":posY});
    ctx.drawImage(seaImg, seaPosX, seaPosY);
    ctx.drawImage(pontImg, pontPosX, pontPosY);
    ctx.drawImage(canonImg, canonPosX, canonPosY);
    for (let i=0; i<boulet.length; i++) {
        ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
    }
}

function draw(left, right, up, down) {
    let ctx = c.getContext("2d");

    if ((left===undefined || left===0) && (right===undefined || right===0) && (up===undefined || up===0) && (down===undefined || down===0)) {
        ctx.drawImage(seaImg, seaPosX, seaPosY);
        ctx.drawImage(pontImg, pontPosX, pontPosY);
        ctx.drawImage(canonImg, canonPosX, canonPosY);
        for (let i=0; i<boulet.length; i++) {
            ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
        }

    }
    if (left===10 && canonPosX>10) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(seaImg, seaPosX, seaPosY);
        ctx.drawImage(pontImg, pontPosX, pontPosY);
        ctx.drawImage(canonImg, canonPosX - 10, canonPosY);
        canonPosX-=10;
        for (let i=0; i<boulet.length; i++) {
            ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
        }
    }
    if (right===10 && canonPosX<576) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(seaImg, seaPosX, seaPosY);
        ctx.drawImage(pontImg, pontPosX, pontPosY);
        ctx.drawImage(canonImg, canonPosX + 10, canonPosY);
        canonPosX+=10;
        for (let i=0; i<boulet.length; i++) {
            ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
        }
    }
    if (up===10 && canonPosY>420) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(seaImg, seaPosX, seaPosY);
        ctx.drawImage(pontImg, pontPosX, pontPosY);
        ctx.drawImage(canonImg, canonPosX, canonPosY-10);
        canonPosY-=10;
        for (let i=0; i<boulet.length; i++) {
            ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
        }
    }
    if (down===10 && canonPosY<460) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(seaImg, seaPosX, seaPosY);
        ctx.drawImage(pontImg, pontPosX, pontPosY);
        ctx.drawImage(canonImg, canonPosX, canonPosY+10);
        canonPosY+=10;
        for (let i=0; i<boulet.length; i++) {
            ctx.drawImage(bouletImg, boulet[i]["posX"], boulet[i]["posY"]);
        }
    }
}


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

setTimeout(function(){ draw(); }, 500);



})();
