function init() {
    t=0;
    ng = new LCG(1019);

    panel
    //.addRange("pattern", 0, 65535, 42405, 1)
    .addRange("foreground color", 0,63, 51, 1)
    .addRange("background color", 0,63, 17, 1)
    .addRange("scale", 1, 8, 7, 1)
    .addNumber("seed", 0, 10000000, 1019.0035, .0001)
    .addRange("pattern width", 0, 16, 2, 1)
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
    renderSource = BUFFER;
    renderTarget=BUFFER; clear(0);
    renderTarget=BUFFER2; clear(0);

    // renderTarget=SCREEN;

    //pat = panel.getValue("pattern");
    fore = panel.getValue("foreground color");
    back = panel.getValue("background color");
    scale = panel.getValue("scale");
    seed = panel.getValue("seed");
    tiles = panel.getValue("pattern width");

    ng.setSeed(seed);
    renderTarget = BUFFER;
    for(var i = 0; i < tiles; i++){
        for(var j = 0; j < tiles; j++){
            pat = ng.nextInt(0, 65535);
            fillRect(i*4, j*4, 3 , 3, fore ,back);
        }
    }
    renderTarget = BUFFER2;
    spr(0,0, 4*tiles, 4*tiles, 0,       0,       false, false);
    spr(0,0, 4*tiles, 4*tiles, 4*tiles, 0,       true, false);
    spr(0,0, 4*tiles, 4*tiles, 0,       4*tiles, false, true);
    spr(0,0, 4*tiles, 4*tiles, 4*tiles, 4*tiles, true, true);

    renderSource = BUFFER2;
    renderTarget = SCREEN;
    sx = WIDTH/2 - 4*tiles*scale;
    sy = HEIGHT/2 - 4*tiles*scale;
    size = 4*tiles*2*scale;

    sspr(0,0,4*tiles*2, 4*tiles*2, sx, sy, size, size);


}
init();
