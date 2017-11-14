function init(){
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;

    panel
    .addRange("numbers X", 0, 200, 10, 1)
    .addRange("numbers Y", 0, 200, 10, 1)
    .addRange("spacing X", 16, 50, 16, 1)
    .addRange("spacing Y", 16, 50, 16, 1)
    .addRange("box X", 25, 400, WIDTH/2, 1)
    .addRange("box Y", 25, 200, HEIGHT/2, 1);




    loop();
}



function step(dt){
    boxW = 50 + Math.sin(t/20)*30;

}

function draw(dt){
    clear(30);
    renderColorNumbers();

    boxX = panel.getValue("box X");
    boxY = panel.getValue("box Y");
    fillRect(boxX-boxW/2,boxY-25, boxW,50, Math.floor(t/20)%64);
}

function loop(){
  //stats.begin();

    pal = palDefault;

    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;

    step(dt);
    draw(dt);


  render(dt);


  //stats.end();
  requestAnimationFrame(loop);
}

function renderColorNumbers(){

  numX = panel.getValue("numbers X");
  numY = panel.getValue("numbers Y");
  spcX = panel.getValue("spacing X");
  spcY = panel.getValue("spacing Y");


  for(var i = 0; i < 64; i++){
    text([
      i.toString(),
      numX + (i%16 * spcX),
      numY + (Math.floor(i/16) * spcY),
      1,
      2,
      'left',
      'top',
      1,
      i,
    ])
  }
}

init();
