function init() {
    boxW = 50;
    boxH = 50;
    t = 0;
    last = 0;
    increment = 60;
    timer = 60;

    colorRamp = [3,4,5,6,7,8,9,10,11,12,20,19,18,28,27]

    panel
    .addRange("camera X", -30, 30, 2.7, 0.01)
    .addRange("camera Y", -30, 30, 8.5, 0.01)
    .addRange("camera Z", -15, -1, -1, 0.05)
    .addRange("pitch", -1, 1, 0, 0.001)
    .addRange("yaw", -1, 1, 0, 0.001)
    .addRange("color speed", 0, 60, 40, 0.5)
    .addRange("roll speed", -.1, .1, 0.01, 0.0001)
    .addRange("speed", -1, 1, 0.51, 0.01);
    //

    vars = {};
    vars.frameNo=0;
        vars.camX = 1;
        vars.camY = 0;
        vars.camZ = -6;
        vars.pitch = 0;
        vars.yaw = 0;
        vars.roll = 0;
        vars.cx=WIDTH/2;
        vars.cy=HEIGHT/2;
        vars.scale=256;

    vars.shapes=[];
    for(let i = 0; i < 200; i++){
      a = Math.random()*360;
      vars.shapes[i] = loadCube(
        Math.sin(a)*12,
        Math.cos(a)*12,
        Math.random()*300,
      )
    }


    loop();
}

function loadCube(x,y,z){

    var shape={};
    shape.x=x;
    shape.y=y;
    shape.z=z;
    shape.segs=[];
    shape.segs.push(new Seg(-1,-1,-1,1,-1,-1));
    shape.segs.push(new Seg(1,-1,-1,1,1,-1));
    shape.segs.push(new Seg(1,1,-1,-1,1,-1));
    shape.segs.push(new Seg(-1,1,-1,-1,-1,-1));
    shape.segs.push(new Seg(-1,-1,1,1,-1,1));
    shape.segs.push(new Seg(1,-1,1,1,1,1));
    shape.segs.push(new Seg(1,1,1,-1,1,1));
    shape.segs.push(new Seg(-1,1,1,-1,-1,1));
    shape.segs.push(new Seg(-1,-1,-1,-1,-1,1));
    shape.segs.push(new Seg(1,-1,-1,1,-1,1));
    shape.segs.push(new Seg(1,1,-1,1,1,1));
    shape.segs.push(new Seg(-1,1,-1,-1,1,1));
    shape.color = Math.floor(Math.random()*3);
    return shape;
}

function translateShape(x, y, z, shape){

    shape.x += x;
    shape.y += y;
    shape.z += z;
}

function matrix_rotate(vert, roll, pitch, yaw) {

	var {cos, sin} = Math;

	var cosa = cos(roll);
	var sina = sin(roll);
	var cosb = cos(yaw);
	var sinb = sin(yaw);
	var cosc = cos(-pitch);
	var sinc = sin(-pitch);

	var xx = cosa*cosb;
	var xy = cosa*sinb*sinc - sina*cosc;
	var xz = cosa*sinb*cosc + sina*sinc;
	var yx = sina*cosb;
	var yy = sina*sinb*sinc + cosa*cosc;
	var yz = sina*sinb*cosc - cosa*sinc;
	var zx = -sinb;
	var zy = cosb*sinc;
	var zz = cosb*cosc;

	var px = xx*vert.x + xy*vert.y + xz*vert.z;
	var py = yx*vert.x + yy*vert.y + yz*vert.z;
	var pz = zx*vert.x + zy*vert.y + zz*vert.z;

	return {x:px, y:py, z:pz};
}

function project3D(x, y, z, vars){

  var p,d
  var {cos, sin, sqrt, atan2} = Math;

  // apply camera position
  x -= vars.camX;
  y -= vars.camY;
  z -= vars.camZ;

  // apply camera rotation
  p = atan2(x,z);
  d = sqrt(x*x+z*z);
  x = sin(p-vars.yaw)*d;
  z = cos(p-vars.yaw)*d;
  p = atan2(y,z);
  d = sqrt(y*y+z*z);
  y = sin(p-vars.pitch)*d;
  z = cos(p-vars.pitch)*d;
  p = atan2(y,x);
  d = sqrt(y*y+x*x);
  y = sin(p-vars.roll)*d;
  x = cos(p-vars.roll)*d;

  // create invisible horizontal line in front of camera
  var x1 = -100,y1=1,x2=100,y2=1;

  // create invisible line from camera to to vertex
  var x3 = 0,y3 = 0,x4 = x,y4 = z;

  // find intersection between the two lines, if any
  var uc = (y4-y3)*(x2-x1)-(x4-x3)*(y2-y1);
  var ua = ((x4-x3)*(y1-y3)-(y4-y3)*(x1-x3))/uc;
  var ub = ((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/uc;

  // if intersection occurs within both line segments...
  // return the 2D projected coordinates,
  // or else the vertex is outside of the field of vision
  if(ua>0&&ua<1&&ub>0&&ub<1){
    return {
      x:vars.cx+(x1+ua*(x2-x1))*vars.scale,
      y:vars.cy+y/z*vars.scale,
      d:sqrt(x*x+y*y+z*z)
    };
  }else{
    return {d:-1};
  }
}

function Vert(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}


function Seg(x1,y1,z1,x2,y2,z2){
    this.a = new Vert(x1,y1,z1);
    this.b = new Vert(x2,y2,z2);
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
    vars.camX = panel.getValue('camera X');
    vars.camY = panel.getValue('camera Y');
    vars.camZ = panel.getValue('camera Z');
    vars.pitch = panel.getValue('pitch');
    vars.yaw = panel.getValue('yaw');
    var colorSpeed = panel.getValue('color speed');
    var rollSpeed = panel.getValue('roll speed');
    var speed = panel.getValue('speed');
    //vars.roll = panel.getValue('roll');

    vars.roll += rollSpeed;

vars.shapes.forEach(function(shape){
  shape.z -= speed;
  timer -= dt;
  if(timer < 0){
    timer = increment-colorSpeed;
    shape.color++
  }
  if(shape.z < -7)shape.z += 300;
  if(shape.z > 300)shape.z -= 306;
  let a = Math.random() * 0.07;
  shape.segs.forEach(function(seg){
    seg.a=matrix_rotate(seg.a,a,a,a);
    seg.b=matrix_rotate(seg.b,a,a,a);
  })

})


}

function draw(dt){

    clear(31);
    vars.shapes.forEach(function(shape){



      shape.segs.forEach(function(seg){
        x=shape.x+seg.a.x;
        y=shape.y+seg.a.y;
        z=shape.z+seg.a.z;
        point1 = project3D(x,y,z,vars);
        if(point1.d != -1){
            x=shape.x+seg.b.x;
            y=shape.y+seg.b.y;
            z=shape.z+seg.b.z;
            point2=project3D(x,y,z,vars);
            if(point2.d != -1){
                line(point1.x, point1.y, point2.x, point2.y, colorRamp[shape.color%colorRamp.length]);
            }
        }
      })//end segments

    })//end shapes draw


}

init();
