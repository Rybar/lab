function init() {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;

    
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
    pat = 0b0101010101010101
    
    for(y = 0; y < HEIGHT; y++){
        let palette=[16,17,18,19,21,22]
        let yy = y/1024;
        let tt = t*.005;
        let a=cos(0.2*sin(tt*0.3+yy*2))+0.3*cos(-0.2*tt+yy/2)
        for(let i = 0; i <= .75; i+=.25)
        {  
            let x1 = (210+sin(a)*50) + 16 * cos(a+i);
            let x2 = (210+sin(a)*50) + 16 * cos(a+i+.25);
    
            if(x2 > x1){
                let c=(x1-x2)/(1.5*16)*palette.length+1;
                let ca = palette[Math.abs(Math.floor(c))];
                //console.log(c);
                pat = dither[Math.floor( Math.abs(c).map(0,palette.length, 0, 15) ) ];
                let cb = palette[Math.min( Math.abs( Math.floor(c+0.5) ),  palette.length)  ]
                rect(x1,y,x2,y,ca,cb)
            }

            //pset(x2-a, y+x1-180, 22);

        }

    }
    for(y = 0; y < HEIGHT; y++){
        let yy = y/1024;
        let tt = t*.005;
        let palette=[2,3,4,5,6,7,8,23,22]
        let a=cos(0.2*sin(tt*0.3+yy*2))+0.6*sin(-0.2*tt+yy/2)
        for(let i = 0; i <= .75; i+=.25)
        {  
            let x1 = (180+cos(a)*50) + 32 * cos(a+i);
            let x2 = (180+cos(a)*50) + 32 * cos(a+i+.25);
    
            if(x2 > x1){
                let c=(x1-x2)/(1.5*32)*palette.length+1;
                let ca = palette[Math.abs(Math.floor(c))];
                //console.log(c);
                pat = dither[Math.floor( Math.abs(c).map(0,palette.length, 0, 15) ) ];
                let cb = palette[Math.min( Math.abs( Math.floor(c+0.5) ),  palette.length)  ]
                rect(x1,y,x2,y,ca,cb)
            }

            //pset(x2-a, y+x1-180, 22);

        }

    }
    for(y = 0; y < HEIGHT; y++){
        let yy = y/1024;
        let tt = t*.005;
        let palette=[30,29,28,27,26,25,24,23,22]
        let a=sin(0.2*sin(tt*0.2+yy*2))+0.8*cos(-0.2*tt+yy/2)
        for(let i = 0; i <= .75; i+=.25)
        {  
            let x1 = (100+sin(a)*40) + 20 * sin(a+i);
            let x2 = (100+sin(a)*40) + 20 * sin(a+i+.25);
    
            if(x2 > x1){
                let c=(x1-x2)/(1.5*20)*palette.length+1;
                let ca = palette[Math.abs(Math.floor(c))];
                //console.log(c);
                pat = dither[Math.floor( Math.abs(c).map(0,palette.length, 0, 15) ) ];
                let cb = palette[Math.min( Math.abs( Math.floor(c+0.5) ),  palette.length)  ]
                rect(x1,y,x2,y,ca,cb)
            }

            //pset(x2-a, y+x1-180, 22);

        }

    }
    //fillRect(64,64, 128,128, 4,5);
   
}

init();
