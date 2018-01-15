function init() {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;

    panel
    .addRange("box X", 25, 400, WIDTH/2, 1)
    .addRange("box Y", 25, 200, HEIGHT/2, 1);

    loop();
}

function loop(dt){

    pal = palDefault;
    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;

    step(dt);
    draw(dt);

  render(dt);

  requestAnimationFrame(loop);
}

function step(dt){
    boxW = 50 + Math.sin(t/20)*30;

}

function draw(dt){

    clear(30);
    boxX = panel.getValue("box X");
    boxY = panel.getValue("box Y");
    fillCircle(boxX,boxY, boxW, 12, 13);
    fillRect(40,40,60,60, 4,0);
}

init();
