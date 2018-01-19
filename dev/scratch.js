fillp(23130)e="1224499aaff77"v=cos::s::cls()u=t()/24w=sin
for y=0,127 do
z=y/999j=v(u+z)g=.2*w(j-u*3+z)k=14+3*v(w(z*4-u*9))for l=0,15 do
i=l/4x=64+16*w(j)+32*v(-g%.25+flr(i)/4)a=x+k*v(i+g)b=x+k*w(i+g)
if(a>b)d=flr(8/k*(a-b)+1)rect(a,y,b,y,"0x"..sub(e,d,d+1))end
end
flip()goto s