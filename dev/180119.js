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
    .addRange("scale", 1, 8, 1, 1)

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

}

function draw(dt){

    clear(0);
    pat = panel.getValue("pattern");
    fore = panel.getValue("foreground color");
    back = panel.getValue("background color");
    scale = panel.getValue("scale");
    renderTarget = BUFFER;
    clear(0);
    fillRect(0,0,WIDTH,HEIGHT, fore,back);
    renderSource = BUFFER;
    renderTarget = SCREEN;
    sspr(0,0, WIDTH/scale, HEIGHT/scale, 0,0, WIDTH, HEIGHT);
    pat = dither[0];
    rect(64,0,4*scale,4*scale,21);
}

init();
