init = e => {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;
    
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

loop = e => {
  //stats.begin();

    pal = palDefault;
    
    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;
    
    step(dt);
    draw(dt);
    

  render(e);
  

  //stats.end();
  requestAnimationFrame(loop);
}

function renderColorNumbers(){

  for(var i = 0; i < 64; i++){
    text([
      i.toString(),
      i%16 * 16,
      Math.floor(i/16) * 16,
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








