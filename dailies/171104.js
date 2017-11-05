init = e => {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;

    panel
    .addRange("numbers X", 0, 200, 0, 1)
    .addRange("numbers Y", 0, 200, 0, 1);




    loop();
}



function step(dt){
    boxW = 50 + Math.sin(t/20)*30;

}

function draw(dt){
    clear(30);
    renderColorNumbers();
    fillRect(WIDTH/2-boxW/2,HEIGHT/2-25, boxW,50, Math.floor(t/20)%64);
}

loop = dt => {
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

  for(var i = 0; i < 64; i++){
    text([
      i.toString(),
      numX + (i%16 * 16),
      numY + (Math.floor(i/16) * 16),
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
