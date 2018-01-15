function init() {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;

    panel
    .addRange("box X", 25, 400, 90, 1)
    .addRange("box Y", 25, 200, HEIGHT/2, 1);
    
    dither = [
        0b1111111111111111,
        0b1111111111110111,
        0b1111110111110111,
        0b1111110111110101,
        0b1111010111110101,
        0b1111010110110101,
        0b1110010110110101,
        0b1110010110100101,
        0b1010010110100101,
        0b1010010110100001,
        0b1010010010100001,
        0b1010010010100000,
        0b1010000010100000,
        0b1010000000100000,
        0b1000000000100000,
        0b1000000000000000,
        0b0000000000000000,
        ]

    loop();
}

function loop(dt){

    pal = palDefault;
    //game timer
    // let now = new Date().getTime();
    // dt = Math.min(1, (now - last) / 1000);
    t += 1;
    dt = t;

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
     for(var i = 0; i < 15; i++){
        pat = dither[i];
        fillRect(0,8*i,WIDTH,8,29,30)
    }
   
    boxX = panel.getValue("box X");
    boxY = panel.getValue("box Y");
    fillCircle(boxX,boxY, boxW, 12,12);
     pat = dt%2 == 0 ? dither[7] : ~dither[7]&( (1 << 16)-1 );
    fillRect(40,40,60,60, 5,0);
    
   
}

init();
