export type Point = {x:number;z:number};
export type BallState = Point & {vx:number;vz:number;direction:Point;score:number;cooldown:number};
export const stations:Point[] = [
  {x:-17,z:-19},{x:-5,z:-19},{x:7,z:-19},{x:19,z:-19},
  {x:29,z:-7},{x:29,z:9},{x:16,z:19},{x:3,z:19},{x:-11,z:19},{x:-24,z:15},
];
export function initialBall():BallState{return {x:0,z:0,vx:0,vz:0,direction:{x:1,z:0},score:0,cooldown:0};}
export function stepBall(ball:BallState,input:Point,dt:number,kick=false):{goal:boolean;moving:boolean}{
  dt=Math.max(0,Math.min(dt,0.05));
  if(ball.cooldown>0){ball.cooldown=Math.max(0,ball.cooldown-dt);if(ball.cooldown===0){ball.x=0;ball.z=0;ball.vx=0;ball.vz=0;}return {goal:false,moving:ball.cooldown===0};}
  const length=Math.hypot(input.x,input.z);
  if(length){const nx=input.x/length,nz=input.z/length;ball.direction={x:nx,z:nz};ball.vx+=nx*25*dt;ball.vz+=nz*25*dt;}
  if(kick){ball.vx+=ball.direction.x*16;ball.vz+=ball.direction.z*16;}
  const drag=Math.exp(-(length?2.7:4.3)*dt);ball.vx*=drag;ball.vz*=drag;
  const speed=Math.hypot(ball.vx,ball.vz);if(speed>20){ball.vx*=20/speed;ball.vz*=20/speed;}
  const beforeX=ball.x;ball.x+=ball.vx*dt;ball.z+=ball.vz*dt;
  if(Math.abs(beforeX)<21&&Math.abs(ball.x)>=21&&Math.abs(ball.z)<3.05){ball.score++;ball.cooldown=1.1;ball.vx=0;ball.vz=0;return {goal:true,moving:false};}
  for(const station of stations){const x=ball.x-station.x,z=ball.z-station.z,d=Math.hypot(x,z);if(d<2.6){const nx=d>0?x/d:1,nz=d>0?z/d:0;ball.x=station.x+nx*2.6;ball.z=station.z+nz*2.6;const dot=ball.vx*nx+ball.vz*nz;if(dot<0){ball.vx-=dot*1.3*nx;ball.vz-=dot*1.3*nz;}}}
  if(Math.abs(ball.x)>33){ball.x=Math.sign(ball.x)*33;ball.vx*=-.3;}
  if(Math.abs(ball.z)>25){ball.z=Math.sign(ball.z)*25;ball.vz*=-.3;}
  return {goal:false,moving:Math.hypot(ball.vx,ball.vz)>.015};
}
export function nearestStation(ball:Point):number|null{
  let nearest:number|null=null,distance=6;
  stations.forEach((p,i)=>{const d=Math.hypot(ball.x-p.x,ball.z-p.z);if(d<distance){distance=d;nearest=i;}});return nearest;
}
