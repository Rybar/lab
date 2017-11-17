function init() {
    t = 0;
    last = 0;

    // lateral facets in tube
    sides=16

    // length-wise segments in tube
    depth=35

    //center of screen
    w = WIDTH/2;
    h = HEIGHT/2;

    // a couple of constants
    v=Math.PI*2/sides
    s=Math.PI*2/depth



    E = {};
    E.moveTo = moveTo;
    E.lineTo = lineTo;
    
    panel
    .addRange("speed", 0, 40, 5, .01)
    .addRange("horz wave", 0, 40, 5, .01)
    .addRange("vert wave", 0, 40, 5, .01)
    
    loop();
}

function loop(dt){

    pal = palDefault;
    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;

    step(dt);  //update logic
    draw(dt);  //draw to framebuffer

  render(dt); //this puts the indexed-color pixel buffer stored in ram[0...screensize] on the canvas.

  requestAnimationFrame(loop);
}

function step(dt){
      speed = panel.getValue('speed');
      horz = panel.getValue('horz wave');
      vert = panel.getValue('vert wave');

  // f & g are offsets to recenter the mouth of the tunnel
  // they coincide with the formulas below and should not be changed independently
  f=(j=SIN(d=t/(1000/horz))/2)*12
  g=COS(e=t/(1000/vert))*1.5
  


}

function draw(dt){

    clear(30);
    cursorColor = 29;

    for(m=depth;m--;){
    	for(i=sides;i--;){
    		//x.beginPath()

    		// q is the depth (Z) value and is also used to generate curvature of the tunnel
    		q=m-t/(1000/speed)*6%1
    		//console.log(q);

    		// O & P are the horizontal (X) curvature of the tunnel.
    		// they are the same except for P has (q+1), which is needed to plot
    		// length-wise line segments
    		O=SIN(s*2*j*q+d)*6-f
    		P=SIN(s*2*j*(q+1)+d)*6-f

    		// Q & R are the vertical (Y) curvature. again they are the same except for (q+1)
    		Q=COS(s*3*j*q+e)*1.5-g
    		R=COS(s*3*j*(q+1)+e)*1.5-g

    		// first point is a moveTo (L(1))
    		X=SIN(p=v*i)+O,Y=COS(p)+Q,Z=q,L(1)
    		
    		cir(); //w+X/z*w,h+Y/z*w)

    		// second point is a lineTo the next lateral vertex in the ring
    		X=SIN(p+=v)+O,Y=COS(p)+Q,Z=q,L()

    		// third point is a length-wise lineTo the next ring
    		X=SIN(p)+P,Y=COS(p)+R,Z=q+=1,L()

    		// fourth and last point is a lineTo the previous point on the next ring (completing a quad)
    		X=SIN(p-=v)+P,Y=COS(p)+R,Z=q,L()

    		// set line and quad color
    		//x.strokeStyle=x.fillStyle=`hsla(${360/sides*i+q*9},10%,${70-70/depth*q}%,${.57+S(t*2)*.43}`

    		// closePath performs an implicit lineTo the first point
    		//x.closePath()

    		// lineWidth diminishes by distance
    		//x.lineWidth=16/Z

    		// draw lines
    		//x.stroke()

    		// fill quad
    		//x.fill()
    	}
    }

}

// function to move to or draw a line to a 3D-projected coordinate
// relies on pre-set values for globals X, Y, and Z
L=q=>{
    
    z=Z>.1?Z:.1;
    
    E[q?"moveTo":"lineTo"](w+X/z*w,h+Y/z*w)
    
}

cir=q=>{
    
    z=Z>.1?Z:.1;
    
    circle( w+X/z*w, h+Y/z*w, 16/z, 22)
    
}

init();
