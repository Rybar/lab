function init() {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;
    BG = PAGESIZE * 2;
    FG = PAGESIZE * 3;

    shiftPal = palDefault.slice();
    shiftPal[12] = 4;
    shiftPal[13] = 5;
    shiftPal[14] = 6;
    shiftPal[15] = 7;
    shiftPal[16] = 8;

    points = [];
    renderTarget = BG;
    let i = 100;
    while(--i){
      cRect((Math.random()*WIDTH)|0, (Math.random()*HEIGHT)|0, 20+(Math.random()*40)|0, 10+(Math.random()*20)|0, 5, 29)
    }
    i = 100;
    while(--i){
      cRect((Math.random()*WIDTH)|0, (Math.random()*HEIGHT)|0, 10+(Math.random()*30)|0, 5+(Math.random()*10)|0, 3, 30)
    }
    renderTarget = 0;
    C.webkitRequestFullscreen();

    for(let i = 0; i < 500; i++){
      points.push({
        x: Math.random()*WIDTH,
        y: HEIGHT/2,
        color: 14+(Math.random()*4-2)|0,
        //life: Math.floor(Math.random()*)
      })
    }

    panel
    .addRange("divide", 0, WIDTH, 200, 1)
;    loop();

}

function loop(dt){

    pal = palDefault;
    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;

    step(dt);
    draw(dt);
    pal = palDefault;
  render(dt);

  requestAnimationFrame(loop);
}

function step(dt){
    //boxW = 50 + Math.sin(t/20)*30;
    points.forEach(function(point){
      point.x += Math.random()*4;
      point.y += Math.random()*8-4;
      point.life -= .05;
      if(point.x > WIDTH){
        point.x = 0;
        point.y = HEIGHT/2;
        life = 20;
      }
    })

}

function draw(dt){
    //pal = palDefault;
    clear(30);
    renderTarget = FG;
    clear(0);
    points.forEach(function(point){
      fillCircle(point.x|0, point.y|0, 2, point.color);
    });
    var div = panel.getValue('divide')
    renderTarget = 0;
    renderSource = BG;
    spr(0,0,WIDTH,HEIGHT);
    renderSource = FG;
    spr(0,0,div,HEIGHT);
    renderSource = FG;
    pal = shiftPal;
    spr(div, 0, WIDTH-div, HEIGHT, div, 0);

    //pal = shiftPal;
    //spr(WIDTH/2, 0, WIDTH/2, HEIGHT, WIDTH/2, 0)//sx = 0, sy = 0, sw = WIDTH, sh = HEIGHT, x=0, y=0
    //spr(WIDTH/2,0,WIDTH,HEIGHT);
}

init();
