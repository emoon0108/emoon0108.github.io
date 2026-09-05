import * as THREE from 'three';
import {createModel} from './models';
import {projects,exhibits as exhibitInfo} from './data';
import {stations} from './field-physics';
import {createStadium} from './stadium';

function mat(color:string){return new THREE.MeshStandardMaterial({color,roughness:.85});}
function mesh(parent:THREE.Object3D,geometry:THREE.BufferGeometry,color:string,pos:number[]){const m=new THREE.Mesh(geometry,mat(color));m.position.set(...pos as [number,number,number]);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(p:THREE.Object3D,size:number[],color:string,pos:number[]){return mesh(p,new THREE.BoxGeometry(...size as [number,number,number]),color,pos);}
function rod(p:THREE.Object3D,a:number[],b:number[],r:number,color:string){const start=new THREE.Vector3(...a as [number,number,number]),end=new THREE.Vector3(...b as [number,number,number]),d=end.clone().sub(start);const m=mesh(p,new THREE.CylinderGeometry(r,r,d.length(),8),color,start.add(end).multiplyScalar(.5).toArray());m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m;}
function line(p:THREE.Object3D,points:number[][],color='#f0ebcf'){const geometry=new THREE.BufferGeometry().setFromPoints(points.map(v=>new THREE.Vector3(...v as [number,number,number])));const m=new THREE.Line(geometry,new THREE.LineBasicMaterial({color}));p.add(m);return m;}
function flatLine(p:THREE.Object3D,a:number[],b:number[],width=.13){const dx=b[0]-a[0],dz=b[1]-a[1];const m=box(p,[Math.hypot(dx,dz),.025,width],'#ecedcf',[(a[0]+b[0])/2,.045,(a[1]+b[1])/2]);m.rotation.y=-Math.atan2(dz,dx);return m;}
function ring(p:THREE.Object3D,r:number,x=0,z=0){const m=mesh(p,new THREE.RingGeometry(r-.065,r+.065,96),'#ecedcf',[x,.07,z]);m.rotation.x=-Math.PI/2;return m;}
function textSign(p:THREE.Object3D,text:string,pos:number[],width:number,height:number,bg='#1f4539',fg='#f2edcf'){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=Math.round(1024*height/width);const c=canvas.getContext('2d')!;c.fillStyle=bg;c.fillRect(0,0,canvas.width,canvas.height);c.fillStyle=fg;c.textAlign='center';c.textBaseline='middle';c.font=`bold ${Math.min(canvas.height*.72,900/(text.length*.62))}px Arial`;c.fillText(text,512,canvas.height*.53,950);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:texture}));m.position.set(...pos as [number,number,number]);p.add(m);return m;
}
function tree(p:THREE.Object3D,x:number,z:number,scale=1){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(scale);p.add(g);rod(g,[0,0,0],[0,3.7,0],.19,'#705742');for(let i=0;i<4;i++){const leaf=mesh(g,new THREE.IcosahedronGeometry(1.35,1),i%2?'#739449':'#98a45b',[Math.sin(i*2.4)*.5,3+i*.4,Math.cos(i*2.4)*.6]);leaf.scale.y=1.15;}return g;}
function goal(p:THREE.Object3D,side:number){const x=side*21,back=side*23.1;
  for(const z of [-3.2,3.2]){rod(p,[x,.1,z],[x,2.7,z],.075,'#fff6df');rod(p,[x,2.7,z],[back,.1,z],.045,'#d2d4bc');rod(p,[x,.1,z],[back,.1,z],.045,'#e6e8ce');}
  rod(p,[x,2.7,-3.2],[x,2.7,3.2],.075,'#fff6df');
  for(let i=0;i<=16;i++){const z=-3.2+i*.4;line(p,[[x,2.65,z],[back,.12,z]],'#b8c6af');}
  for(let i=0;i<=8;i++){const t=i/8;line(p,[[x+(back-x)*t,2.65*(1-t)+.1,-3.2],[x+(back-x)*t,2.65*(1-t)+.1,3.2]],'#b8c6af');}
}
export function createFieldWorld(){
  const group=new THREE.Group();
  // The field and surrounding paths share one physical ground plane.
  box(group,[140,1.0,116],'#34424b',[0,-.72,0]);box(group,[138.8,.14,114.8],'#47535a',[0,-.15,0]);
  box(group,[47,.1,31],'#276b39',[0,-.06,0]);
  for(let i=0;i<12;i++)box(group,[3.5,.04,26],i%2?'#318547':'#3d9250',[-19.25+i*3.5,0,0]);
  for(const z of [-13,13])flatLine(group,[-21,z],[21,z]);for(const x of [-21,21])flatLine(group,[x,-13],[x,13]);flatLine(group,[0,-13],[0,13]);ring(group,4.0);
  mesh(group,new THREE.CircleGeometry(.13,16),'#eeecd3',[0,.07,0]).rotation.x=-Math.PI/2;
  for(const side of [-1,1]){const x=side*21;for(const z of [-7,7])flatLine(group,[x,z],[x-side*6.3,z]);flatLine(group,[x-side*6.3,-7],[x-side*6.3,7]);for(const z of [-3.9,3.9])flatLine(group,[x,z],[x-side*2.5,z]);flatLine(group,[x-side*2.5,-3.9],[x-side*2.5,3.9]);goal(group,side);}
  for(const x of [-21,21])for(const z of [-13,13]){rod(group,[x,0,z],[x,1.8,z],.025,'#eee4cc');const flag=mesh(group,new THREE.PlaneGeometry(.65,.43),'#dfa457',[x+.31,1.58,z]);flag.material.side=THREE.DoubleSide;}
  const stadium=createStadium();group.add(stadium.group);
  for(const [x,z,s] of [[-60,-49,1.4],[-60,49,1.4],[60,-49,1.4],[60,49,1.4]])tree(group,x,z,s);
  // Concourse barriers leave the project bays and ball route unobstructed.
  for(const z of [-24,24])for(const x of [-24,-12,0,12,24])box(group,[10,.7,.16],'#33584b',[x,.35,z]);
  const exhibits=exhibitInfo.map((project,i)=>{const root=new THREE.Group();const {x,z}=stations[i];root.position.set(x,.1,z);group.add(root);
    box(root,[6.7,.12,5.8],'#c9c3aa',[0,0,0]);const model=i<projects.length?createModel(projects[i].kind):createAboutModel();model.group.scale.setScalar(i===4?2.5:1.9);root.add(model.group);
    for(const dx of [-2.8,2.8])box(root,[.2,.4,.8],'#7e8d70',[dx,.2,2.4]);
    const sign=box(root,[5.9,.55,.12],'#294c3e',[0,.65,3.1]);sign.userData.projectIndex=i;
    const board=textSign(root,project.name,[0,.66,3.17],5.5,.43);board.userData.projectIndex=i;
    root.traverse(n=>{n.userData.projectIndex=i;});
    return {root,model};
  });
  const scoreboardCanvas=document.createElement('canvas');scoreboardCanvas.width=1536;scoreboardCanvas.height=556;
  const scoreTexture=new THREE.CanvasTexture(scoreboardCanvas);scoreTexture.colorSpace=THREE.SRGBColorSpace;
  let score=0,celebrationUntil=0,lastBoard=-1,time=0,crowdTime=0;
  function drawBoard(celebrating:boolean){
    const c=scoreboardCanvas.getContext('2d')!;c.fillStyle=celebrating?'#ffcb05':'#00274c';c.fillRect(0,0,1536,556);
    c.fillStyle=celebrating?'#00274c':'#ffcb05';c.fillRect(0,0,1536,15);c.fillRect(0,541,1536,15);
    c.textAlign='center';c.font='bold 54px Arial';c.fillText('ETHAN MOON',768,95);
    c.font=celebrating?'bold 220px Arial':'bold 186px monospace';c.fillText(celebrating?'GOAL!':String(score).padStart(2,'0')+' : 00',768,325);
    c.font='31px Arial';c.fillText(celebrating?'BACK TO THE CENTER CIRCLE':'SOCCER AT THE BIG HOUSE',768,422);
    c.font='24px monospace';c.fillText('09 PROJECTS   /   10 ABOUT ME',768,492);
    // LED matrix texture, visible when the camera gets close.
    c.fillStyle=celebrating?'#00274c12':'#00000025';for(let x=0;x<1536;x+=6)c.fillRect(x,0,1,556);for(let y=0;y<556;y+=6)c.fillRect(0,y,1536,1);
    scoreTexture.needsUpdate=true;
  }
  drawBoard(false);
  for(const side of [-1,1]){const screen=new THREE.Mesh(new THREE.PlaneGeometry(32.9,11.9),new THREE.MeshBasicMaterial({map:scoreTexture}));screen.position.set(side*60.95,24,0);screen.rotation.y=-side*Math.PI/2;group.add(screen);const back=textSign(group,'ETHAN MOON',[side*62.06,24,0],31,7,'#00274c','#ffcb05');back.rotation.y=side*Math.PI/2;}
  // Original LED advertising boards around the soccer pitch.
  for(const z of [-14.4,14.4])for(const x of [-14,0,14]){const b=textSign(group,x===0?'ETHAN MOON':'MICHIGAN  /  SOCCER',[x,.48,z],10,.65,'#00274c','#ffcb05');if(z>0)b.rotation.y=Math.PI;}
  const particles=240,positions=new Float32Array(particles*3),colors=new Float32Array(particles*3);
  for(let i=0;i<particles;i++){const color=new THREE.Color(i%3?'#ffcb05':'#77b9e8');color.toArray(colors,i*3);}
  const confettiGeometry=new THREE.BufferGeometry();confettiGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));confettiGeometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const confetti=new THREE.Points(confettiGeometry,new THREE.PointsMaterial({size:.2,vertexColors:true}));confetti.visible=false;group.add(confetti);
  function updateScore(value:number){score=value;celebrationUntil=time+3.8;drawBoard(true);}
  function animate(nextTime:number,motion:boolean){if(motion)crowdTime+=nextTime-time;time=nextTime;const celebrating=time<celebrationUntil;stadium.animate(crowdTime,celebrating&&motion);const boardState=celebrating?1:0,boardChanged=boardState!==lastBoard;if(boardChanged){drawBoard(celebrating);lastBoard=boardState;}
    confetti.visible=celebrating&&motion;if(confetti.visible){const age=3.8-(celebrationUntil-time);for(let i=0;i<particles;i++){const phase=i*2.399;positions[i*3]=Math.sin(phase)*(2+age*(2+i%5));positions[i*3+1]=Math.max(.1,2+age*(7+i%4)-age*age*3);positions[i*3+2]=Math.cos(phase)*(2+age*(2+i%5));}confettiGeometry.attributes.position.needsUpdate=true;}return boardChanged;
  }
  for(const x of [-10,10]){box(group,[4,.16,.8],'#b78f57',[x,.6,15]);for(const dx of [-1.5,1.5])box(group,[.15,.6,.6],'#48634b',[x+dx,.25,15]);}
  const ball=new THREE.Group();mesh(ball,new THREE.SphereGeometry(.38,24,18),'#f2ecd8',[0,0,0]);
  const phi=(1+Math.sqrt(5))/2;const vertices=[[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]];
  for(const v of vertices){const d=new THREE.Vector3(...v as [number,number,number]).normalize();const patch=mesh(ball,new THREE.CircleGeometry(.115,5),'#233e34',d.clone().multiplyScalar(.377).toArray());patch.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),d);}
  ball.position.set(0,.42,0);group.add(ball);
  const marker=mesh(group,new THREE.RingGeometry(.62,.72,40),'#f7d477',[0,.05,0]);marker.rotation.x=-Math.PI/2;marker.material.depthWrite=false;
  return {group,exhibits,ball,marker,stadium,updateScore,animate};
}

function createAboutModel(){
  const group=new THREE.Group();
  // A number-ten jersey in an open locker gives About Me a physical place.
  box(group,[1.9,2.6,.22],'#00274c',[0,1.3,-.45]);
  for(const x of [-.92,.92])box(group,[.1,2.6,1.0],'#23465f',[x,1.3,0]);
  box(group,[1.9,.12,1.0],'#23465f',[0,2.6,0]);box(group,[1.9,.12,1.0],'#23465f',[0,.08,0]);
  const jersey=new THREE.Group();group.add(jersey);box(jersey,[.78,1.05,.15],'#ffcb05',[0,1.52,0]);
  for(const side of [-1,1]){const sleeve=box(jersey,[.44,.4,.15],'#ffcb05',[side*.48,1.83,0]);sleeve.rotation.z=side*-.35;}
  textSign(jersey,'10',[0,1.49,.082],.57,.5,'#ffcb05','#00274c');textSign(jersey,'MOON',[0,1.89,.085],.52,.13,'#ffcb05','#00274c');
  box(group,[1.5,.15,.7],'#bba47b',[0,.43,.22]);
  return {group,animate(t:number,active:boolean){jersey.rotation.y=active?Math.sin(t)*.18:0;}};
}
