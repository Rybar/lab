function init() {
    boxW = 50;
    boxH = 50;
    fore = 22;
    back = 0;
    t = 0;
    last = 0;
    pattern = 0;

    panel
    .addRange("pattern", 0, 65535, 42405, 1)
    .addRange("foreground color", 0,63, 12, 1)
    .addRange("background color", 0,63, 0, 1)

    loop();
}

function loop(dt){

    pal = palDefault;
    
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

    pat = panel.getValue("pattern");
    fore = panel.getValue("foreground color");
    back = panel.getValue("background color");
    fillRect(0,0,WIDTH,HEIGHT, fore,back);
}

init();
