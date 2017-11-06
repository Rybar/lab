function init() {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;
    dots = [];

    for(let i = 0; i < 300; i++){
     dots.push({
       x: Math.random()*WIDTH,
       y: Math.random()*HEIGHT,
       r: Math.random()*10,
       c: Math.floor(Math.random()*64),
       filled: Math.random()
     }) 
    }

    //console.log(dots);

    panel
    .addRange("horizontal", -10, 10, 1.2, 0.2)
    .addRange("vertical", -10, 10, 1.8, 0.2)
    .addRange("filled chance", 0, 1, 0.5, 0.01);

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
  horizontal = panel.getValue('horizontal');
  vertical = panel.getValue('vertical');

    dots.forEach( function(dot){
      dot.x += Math.random()*horizontal;
      if(dot.x > WIDTH){dot.x = 0};
      dot.y += Math.random()*vertical;
      if(dot.y > HEIGHT){dot.y = 0};
    })

}

function draw(dt){

  fillmod = panel.getValue("filled chance");

  clear(30);
  dots.forEach( function(dot){
    if(dot.filled > fillmod){
            circle(dot.x,dot.y,dot.r,dot.c);
    }
    else { fillCircle(dot.x,dot.y,dot.r,dot.c);
    }
  })
}

init();
