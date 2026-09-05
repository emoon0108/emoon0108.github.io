import * as THREE from 'three';
import type { ModelKind } from './data';

type Material = THREE.Material;
const ink = '#253a36';
const cream = '#e5dfcf';
const metal = '#b1b6ae';
function material(color: string, metallic = 0) {
  return new THREE.MeshStandardMaterial({ color, roughness: metallic ? 0.34 : 0.65, metalness: metallic });
}
function mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, mat: Material, position: number[] = [0,0,0]) {
  const object = new THREE.Mesh(geometry, mat); object.position.set(position[0], position[1], position[2]); object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
}
function box(p: THREE.Object3D, size: number[], color: string, pos: number[], metallic = 0) { return mesh(p, new THREE.BoxGeometry(...size as [number,number,number]), material(color, metallic), pos); }
function cylinder(p: THREE.Object3D, r: number, h: number, color: string, pos: number[], r2 = r, metallic = 0) { return mesh(p, new THREE.CylinderGeometry(r,r2,h,40),material(color,metallic),pos); }
function sphere(p: THREE.Object3D, r: number, color: string, pos: number[]) { return mesh(p,new THREE.SphereGeometry(r,24,16),material(color),pos); }
function tube(p: THREE.Object3D, points: number[][], radius: number, color: string) { return mesh(p,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v as [number,number,number]))),64,radius,8,false),material(color)); }
export type Model = { group: THREE.Group; animate: (time: number, active: boolean) => void };

function cinema(): Model {
  const g = new THREE.Group();
  box(g,[1.35,0.75,0.58],ink,[0,0.78,0]);
  box(g,[1.45,0.13,0.7],ink,[0,0.24,0]);
  box(g,[0.23,0.4,0.24],metal,[0,0.47,0],0.7);
  const reels: THREE.Group[] = [];
  for(const x of [-0.44,0.44]) {
    const reel = new THREE.Group(); reel.position.set(x,1.45,0); g.add(reel);
    const face = cylinder(reel,0.43,0.085,metal,[0,0,0],0.43,0.65); face.rotation.x=Math.PI/2;
    cylinder(reel,0.06,0.15,ink,[0,0,0]).rotation.x=Math.PI/2;
    for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const hole=cylinder(reel,0.115,0.09,ink,[Math.sin(a)*0.25,Math.cos(a)*0.25,0.01]);hole.rotation.x=Math.PI/2;}
    reels.push(reel);
  }
  const lens = cylinder(g,0.21,0.42,metal,[0.79,0.8,0],0.26,0.8);lens.rotation.z=Math.PI/2;
  const glass = cylinder(g,0.17,0.015,'#82ada4',[1.01,0.8,0],0.17,0.5);glass.rotation.z=Math.PI/2;
  for(let i=0;i<5;i++) box(g,[0.035,0.25,0.015],metal,[-0.43+i*0.09,0.77,0.298]);
  sphere(g,0.05,'#ba6141',[0.4,0.6,0.32]);
  // A separate screen makes the projector legible from the room view.
  const screen = new THREE.Group();screen.position.set(1.42,0.22,-0.6);screen.rotation.y=-0.4;g.add(screen);
  box(screen,[0.06,1.4,0.9],ink,[0,0.78,0]);box(screen,[0.025,1.25,0.76],cream,[-0.042,0.78,0]);box(screen,[0.025,1.25,0.76],cream,[0.042,0.78,0]);
  for(const z of [-0.3,0.3])box(screen,[0.4,0.06,0.05],ink,[0,0,z]);
  const beam=mesh(g,new THREE.ConeGeometry(0.56,1.0,32,1,true),new THREE.MeshBasicMaterial({color:'#e4c976',transparent:true,opacity:0.14,depthWrite:false,side:THREE.DoubleSide}),[1.43,0.8,0]);beam.rotation.z=Math.PI/2;beam.visible=false;
  g.position.x=-0.3;g.position.y=-0.17;
  return {group:g,animate(t,a){reels.forEach((r,i)=>{r.rotation.z=a?t*(i?0.55:0.45):r.rotation.z});beam.visible=a;}};
}

function printer(): Model {
  const g=new THREE.Group();
  box(g,[2.1,0.2,1.55],ink,[0,0.12,0]);
  box(g,[1.7,0.06,1.15],metal,[0,0.28,0],0.65);
  for(const x of [-0.9,0.9]){
    box(g,[0.13,2.0,0.15],ink,[x,1.2,-0.45]);
    cylinder(g,0.028,1.9,metal,[x+0.12,1.2,-0.42],0.028,0.9);
  }
  box(g,[2.05,0.14,0.2],ink,[0,2.22,-0.45]);
  const carriage=new THREE.Group();g.add(carriage);
  box(carriage,[1.82,0.1,0.1],metal,[0,1.67,-0.42],0.8);
  const head=new THREE.Group();carriage.add(head);
  box(head,[0.42,0.33,0.3],'#426d67',[0,1.65,-0.34]);
  cylinder(head,0.15,0.64,cream,[0,1.3,0.02]);
  cylinder(head,0.1,0.5,'#6d9a87',[0,1.3,0.02]);
  cylinder(head,0.19,0.05,metal,[0,1.63,0.02],0.19,0.7);
  cylinder(head,0.035,0.25,metal,[0,0.9,0.02],0.12,0.8);
  cylinder(head,0.018,0.24,metal,[0,0.66,0.02],0.018,0.9);
  tube(g,[[0,1.85,-0.3],[0.15,2.6,-0.3],[0.85,2.5,-0.45],[0.9,2.2,-0.45]],0.032,ink);
  const tracks:THREE.Mesh[]=[];
  for(let i=0;i<9;i++)tracks.push(tube(g,[[-0.63,0.345+i*0.009,-0.35+i*0.095],[0.63,0.345+i*0.009,-0.35+i*0.095]],0.035,'#86a994'));
  box(g,[0.38,0.28,0.035],ink,[0.69,0.28,0.79]);box(g,[0.26,0.14,0.015],'#aebc9d',[0.69,0.3,0.812]);
  return {group:g,animate(t,a){if(a){const progress=(t*0.35)%9;head.position.x=Math.sin(t*2.2)*0.55;tracks.forEach((m,i)=>{m.visible=i<=progress;});head.position.z=(Math.floor(progress)-4)*0.095;} }};
}

function violin():Model{
  const g=new THREE.Group(); const instrument=new THREE.Group();instrument.position.set(-0.23,0.18,0);instrument.rotation.z=-0.17;g.add(instrument);
  const shape=new THREE.Shape();shape.moveTo(0,0);
  shape.bezierCurveTo(-0.7,-0.02,-0.73,0.6,-0.4,0.78);shape.bezierCurveTo(-0.19,0.91,-0.29,1.09,-0.43,1.2);shape.bezierCurveTo(-0.7,1.54,-0.38,1.78,0,1.68);
  shape.bezierCurveTo(0.38,1.78,0.7,1.54,0.43,1.2);shape.bezierCurveTo(0.29,1.09,0.19,0.91,0.4,0.78);shape.bezierCurveTo(0.73,0.6,0.7,-0.02,0,0);
  const wood=new THREE.ExtrudeGeometry(shape,{depth:0.17,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:0.035,bevelThickness:0.025,curveSegments:22});mesh(instrument,wood,material('#9f5028'));
  const top=new THREE.ShapeGeometry(shape,32);mesh(instrument,top,material('#c08443'),[0,0,0.198]);
  box(instrument,[0.14,1.05,0.13],'#98653d',[0,1.94,0.04]);box(instrument,[0.16,1.12,0.055],ink,[0,1.69,0.24]);
  const scroll=cylinder(instrument,0.12,0.16,'#ac642f',[0,2.5,0.05]);scroll.rotation.x=Math.PI/2;
  for(let i=0;i<4;i++){const side=i%2?-1:1;const peg=cylinder(instrument,0.04,0.22,ink,[side*0.13,2.1+i*0.095,0.04]);peg.rotation.z=Math.PI/2;sphere(instrument,0.067,ink,[side*0.23,2.1+i*0.095,0.04]);}
  box(instrument,[0.29,0.06,0.08],'#edcb8c',[0,0.62,0.27]);
  const tail=box(instrument,[0.15,0.35,0.045],ink,[0,0.28,0.27]);tail.rotation.z=0.02;
  const chin=sphere(instrument,0.21,ink,[-0.25,0.16,0.26]);chin.scale.set(1,0.65,0.23);
  for(let i=0;i<4;i++)tube(instrument,[[(i-1.5)*0.028,0.15,0.29],[(i-1.5)*0.028,0.66,0.32],[(i-1.5)*0.028,2.32,0.27]],0.0035,'#ede6cc');
  for(const side of [-1,1])tube(instrument,[[side*0.28,0.53,0.224],[side*0.22,0.6,0.23],[side*0.29,0.91,0.228],[side*0.24,1.03,0.224]],0.018,'#472f20');
  const bow=new THREE.Group();bow.position.set(0.88,0.1,0.42);bow.rotation.z=-0.12;g.add(bow);
  tube(bow,[[0,0,0],[-0.035,1.2,0],[-0.015,2.25,0],[0.05,2.5,0]],0.018,'#6e472c');
  tube(bow,[[0.055,0.12,0],[0.07,2.45,0]],0.012,'#e4d8b6');box(bow,[0.09,0.17,0.08],ink,[0.02,0.17,0]);
  box(g,[0.6,0.04,0.5],ink,[-0.1,0,0]);
  return {group:g,animate(t,a){if(a){bow.rotation.z=-1.1;bow.position.set(0.8+Math.sin(t*2)*0.3,1.1,0.48);}else{bow.rotation.z=-0.12;bow.position.set(0.88,0.1,0.42);}}};
}

function planner():Model{
  const g=new THREE.Group();const blocks:THREE.Mesh[]=[];
  for(let i=0;i<8;i++){
    const x=(i%4-1.5)*0.53,z=(Math.floor(i/4)-0.5)*0.88,h=0.25+(i%4)*0.26;
    box(g,[0.45,h,0.58],'#4e627d',[x,h/2,z]);box(g,[0.43,0.035,0.56],cream,[x,h+0.025,z]);
    for(let j=0;j<3;j++)box(g,[0.29,0.018,0.045],j===0?'#a76b3c':'#a6b5b8',[x,h+0.05,z-0.16+j*0.14]);
    const marker=sphere(g,0.047,'#c6994a',[x,h+0.15,z+0.22]);blocks.push(marker);
    if(i%4<3)tube(g,[[x+0.18,h+0.08,z+0.22],[x+0.3,h+0.2,z+0.22],[x+0.53,h+0.34,z+0.22]],0.015,'#b7924a');
  }
  tube(g,[[0.8,1.17,-0.22],[1.28,1.38,0],[1.2,1.5,0.65],[-0.7,1.5,0.75],[-0.8,0.42,0.65]],0.018,'#b7924a');
  return {group:g,animate(t,a){blocks.forEach((b,i)=>{b.scale.setScalar(a&&Math.floor(t*2)%8===i?1.8:1);});}};
}

function store():Model{
  const g=new THREE.Group();
  box(g,[2.0,0.14,1.5],'#929a87',[0,0.07,0]);
  box(g,[1.65,1.3,1.07],'#e5dbc0',[0,0.8,-0.12]);
  box(g,[1.82,0.16,1.18],'#a55e40',[0,1.5,-0.12]);
  box(g,[1.3,0.26,0.04],ink,[0,1.18,0.44]);
  // Sign lettering is geometry, keeping all surfaces local and independent of textures.
  for(let i=0;i<3;i++){const letter=mesh(g,new THREE.TorusGeometry(0.065,0.012,8,20),material(cream),[-0.22+i*0.22,1.19,0.473]);if(i===1)letter.scale.x=0.7;}
  for(let i=0;i<9;i++){const awning=box(g,[0.19,0.08,0.65],i%2?'#f0e5cb':'#ae6043',[-0.76+i*0.19,1.02,0.6]);awning.rotation.x=0.2;box(g,[0.19,0.12,0.025],i%2?'#f0e5cb':'#ae6043',[-0.76+i*0.19,0.92,0.91]);}
  box(g,[0.95,0.6,0.035],ink,[-0.22,0.55,0.43]);box(g,[0.82,0.49,0.01],'#96b0a4',[-0.22,0.55,0.454]);box(g,[0.025,0.51,0.015],cream,[-0.22,0.55,0.466]);
  const door=new THREE.Group();door.position.set(0.43,0.2,0.447);g.add(door);box(door,[0.37,0.78,0.035],ink,[0.185,0.39,0]);box(door,[0.25,0.5,0.013],'#b0c3ae',[0.185,0.5,0.026]);sphere(door,0.025,'#c89e52',[0.31,0.33,0.04]);
  for(const x of [-1.03,1.03]){cylinder(g,0.16,0.2,'#b16e4c',[x,0.23,0.52],0.11);for(let i=0;i<4;i++)sphere(g,0.12,i%2?'#708456':'#52704f',[x+Math.sin(i)*0.06,0.43+i*0.045,0.52+Math.cos(i)*0.04]);}
  const sign=box(g,[0.32,0.42,0.05],ink,[-0.82,0.38,1.02]);sign.rotation.x=-0.17;box(g,[0.23,0.05,0.015],cream,[-0.82,0.48,1.082]);
  return {group:g,animate(_t,a){door.rotation.y=a?-1.15:0;}};
}

function drone():Model{
  const g=new THREE.Group();const body=new THREE.Group();body.position.y=0.95;g.add(body);
  const center=sphere(body,0.4,'#d5d8c8',[0,0,0]);center.scale.set(1,0.55,1.25);
  box(body,[0.3,0.13,0.45],ink,[0,0.16,0]);
  const rotors:THREE.Group[]=[];
  for(const x of [-1,1])for(const z of [-1,1]){
    tube(body,[[x*0.2,0,z*0.2],[x*0.76,0.05,z*0.66]],0.052,ink);
    cylinder(body,0.11,0.16,'#8b9684',[x*0.78,0.1,z*0.68],0.11,0.6);
    const rotor=new THREE.Group();rotor.position.set(x*0.78,0.21,z*0.68);body.add(rotor);
    const blade=sphere(rotor,0.38,ink,[0,0,0]);blade.scale.set(1.35,0.034,0.17);cylinder(rotor,0.055,0.07,metal,[0,0.03,0]);rotors.push(rotor);
    tube(body,[[x*0.32,-0.05,z*0.24],[x*0.46,-0.53,z*0.38],[x*0.58,-0.57,z*0.48]],0.025,ink);
  }
  const cam=cylinder(body,0.09,0.11,ink,[0,-0.1,0.48]);cam.rotation.x=Math.PI/2;cylinder(body,0.054,0.02,'#658f99',[0,-0.1,0.55],0.054,0.5).rotation.x=Math.PI/2;
  sphere(body,0.028,'#a95637',[-0.23,0.07,0.36]);sphere(body,0.028,'#739b65',[0.23,0.07,0.36]);
  return {group:g,animate(t,a){if(a){rotors.forEach((r,i)=>{r.rotation.y=t*24*(i%2?1:-1);});body.position.y=1.07+Math.sin(t*1.5)*0.04;}else body.position.y=0.95;}};
}

function plate():Model{
  const g=new THREE.Group();
  cylinder(g,1.06,0.09,'#d7d9c7',[0,0.1,0],0.9);cylinder(g,0.84,0.045,'#ede8d7',[0,0.157,0]);
  const rim=mesh(g,new THREE.TorusGeometry(0.96,0.08,12,64),material('#f1eddf'),[0,0.15,0]);rim.rotation.x=Math.PI/2;
  const broccoli=new THREE.Group();broccoli.position.set(-0.4,0.2,-0.18);g.add(broccoli);
  cylinder(broccoli,0.07,0.28,'#b4bb73',[0,0.13,0],0.1);
  for(let i=0;i<7;i++){const a=i*2.4;sphere(broccoli,0.145,i%2?'#527346':'#718b52',[Math.sin(a)*0.15,0.38+(i%3)*0.05,Math.cos(a)*0.14]);}
  const bite=new THREE.Group();bite.position.set(0.4,0.21,-0.25);g.add(bite);
  for(let i=0;i<4;i++){const carrot=cylinder(bite,0.14,0.12,'#c78543',[(i%2)*0.19,(Math.floor(i/2))*0.12,Math.floor(i/2)*0.1]);carrot.rotation.z=.18;}
  for(let i=0;i<6;i++){const rice=sphere(g,0.13,'#e2cea3',[-0.25+(i%3)*.17,0.25+(i%2)*.07,0.38+Math.floor(i/3)*.13]);rice.scale.y=.55;}
  box(g,[0.3,0.08,0.2],ink,[0,0.055,1.02]);box(g,[0.17,0.02,0.1],'#adbd9a',[0,0.105,1.03]);
  tube(g,[[1.25,.12,-.6],[1.25,.12,.66]],.025,metal);
  for(let i=0;i<4;i++)tube(g,[[1.17+i*.052,.12,-.6],[1.17+i*.052,.12,-.85]],.018,metal);
  return {group:g,animate(_t,a){bite.scale.setScalar(a?.55:1);}};
}

function funnel():Model{
  const g=new THREE.Group();const marbles:THREE.Mesh[]=[];
  for(let i=0;i<3;i++){
    const r=.9-i*.23,y=1.8-i*.63;
    const profile=[new THREE.Vector2(.14,.0),new THREE.Vector2(.14,.12),new THREE.Vector2(r,.45),new THREE.Vector2(r,.5),new THREE.Vector2(r-.045,.5),new THREE.Vector2(.105,.12)];
    mesh(g,new THREE.LatheGeometry(profile,48),material(i===0?'#9bab9e':i===1?'#6c8985':'#375d58'),[0,y-.4,0]);
    for(const x of [-1,1])cylinder(g,.022,y,metal,[x*(r+.07),y/2,0],.022,.7);
  }
  cylinder(g,.5,.06,ink,[0,.06,0]);
  for(let i=0;i<9;i++){marbles.push(sphere(g,.075,i%3===0?'#be8c44':'#d5c8a5',[Math.sin(i*2.4)*.55,2.05+(i%3)*.1,Math.cos(i*2.4)*.55]));}
  return {group:g,animate(t,a){if(a)marbles.forEach((m,i)=>{const f=(t*.38+i*.12)%1;m.position.set(Math.sin(t*1.6+i*2.4)*.56*(1-f),2.2-f*2.05,Math.cos(t*1.6+i*2.4)*.56*(1-f));});}};
}

function space():Model{
  const g=new THREE.Group();
  const earth=sphere(g,.58,'#809c99',[0,1.05,0]);earth.rotation.z=.22;
  for(let i=0;i<4;i++){const ring=mesh(earth,new THREE.TorusGeometry(.585,.006,6,64),material('#c1caba'));ring.rotation.y=i*Math.PI/4;}
  for(const y of [-.32,0,.32]){const ring=mesh(earth,new THREE.TorusGeometry(Math.sqrt(.59*.59-y*y),.006,6,64),material('#c1caba'),[0,y,0]);ring.rotation.x=Math.PI/2;}
  const orbit=mesh(g,new THREE.TorusGeometry(1.02,.012,8,96),material('#a1a28b'),[0,1.05,0]);orbit.rotation.x=1.08;orbit.rotation.y=.3;
  const satellite=new THREE.Group();g.add(satellite);box(satellite,[.24,.26,.26],'#c49d55',[0,0,0],.55);
  for(const side of [-1,1]){box(satellite,[.4,.018,.29],'#34495d',[side*.38,0,0],.35);for(let i=0;i<3;i++)box(satellite,[.012,.02,.29],'#8c9fad',[side*.25+side*i*.105,.008,0]);}
  const dish=mesh(satellite,new THREE.SphereGeometry(.1,16,12,0,Math.PI*2,0,Math.PI*.45),material(cream),[0,.17,0]);dish.rotation.x=.35;
  cylinder(g,.022,.45,metal,[0,.23,0]);
  const airfoil=new THREE.Shape();airfoil.moveTo(-.85,0);airfoil.bezierCurveTo(-.87,.35,.35,.26,.85,0);airfoil.bezierCurveTo(.22,-.03,-.8,-.1,-.85,0);
  const wing=mesh(g,new THREE.ExtrudeGeometry(airfoil,{depth:.55,bevelEnabled:false,curveSegments:32}),material('#c6bb9f'),[0,.2,.7]);wing.rotation.z=.08;
  return {group:g,animate(t,a){const angle=a?t*.55:.5;satellite.position.set(Math.cos(angle)*1.02,1.05+Math.sin(angle)*.7,Math.sin(angle)*.74);satellite.rotation.z=angle*.25;}};
}

export function createModel(kind: ModelKind): Model {
  const builders:Record<ModelKind,()=>Model>={cinema,printer,violin,planner,plate,funnel,store,drone,space};
  return builders[kind]();
}
