import * as THREE from 'three';

// An original, compressed Big House study: one open bowl, two sideline buildings,
// and end-zone boards. Deliberately not a surveyed architectural replica.
function perimeter(rx:number,rz:number,count:number){
  const r=rz*.83,path=new THREE.Shape();
  path.moveTo(-rx+r,-rz);path.lineTo(rx-r,-rz);path.absarc(rx-r,-rz+r,r,-Math.PI/2,0,false);path.lineTo(rx,rz-r);path.absarc(rx-r,rz-r,r,0,Math.PI/2,false);path.lineTo(-rx+r,rz);path.absarc(-rx+r,rz-r,r,Math.PI/2,Math.PI,false);path.lineTo(-rx,-rz+r);path.absarc(-rx+r,-rz+r,r,Math.PI,Math.PI*1.5,false);
  return path.getSpacedPoints(count).slice(0,count);
}
function band(rx:number,rz:number,y:number,ox:number,oz:number,oy:number,color:string){
  const n=256,a=perimeter(rx,rz,n),b=perimeter(ox,oz,n),positions:number[]=[];
  for(let i=0;i<n;i++){const j=(i+1)%n;positions.push(a[i].x,y,a[i].y,b[i].x,oy,b[i].y,a[j].x,y,a[j].y,a[j].x,y,a[j].y,b[i].x,oy,b[i].y,b[j].x,oy,b[j].y);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();const m=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,roughness:.85,side:THREE.DoubleSide}));m.receiveShadow=true;return m;
}
function box(parent:THREE.Object3D,size:number[],pos:number[],color:string){const m=new THREE.Mesh(new THREE.BoxGeometry(...size as [number,number,number]),new THREE.MeshStandardMaterial({color,roughness:.7}));m.position.set(...pos as [number,number,number]);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
const hash=(n:number)=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
export function createStadium(){
  const g=new THREE.Group(),clock={value:0},cheer={value:0};
  const people:{x:number;y:number;z:number;angle:number;color:THREE.Color;skin:THREE.Color;raised:boolean}[]=[];
  g.add(band(35,25,.4,62,47,16.4,'#8e968d'));
  for(let row=0;row<40;row++){
    const rx=35+row*.67,rz=25+row*.54,y=.65+row*.39;
    g.add(band(rx,rz,y,rx+.64,rz+.52,y,'#a9ad9e'));
    const count=600+row*6,points=perimeter(rx+.28,rz+.24,count);
    points.forEach((p,i)=>{
      if((i/count*44)%1<.09)return; // 44 radial stair aisles.
      const seed=row*1000+i;if(hash(seed+10)<.018)return;
      const next=points[(i+1)%count],prev=points[(i+count-1)%count];
      people.push({x:p.x,y:y+.48,z:p.y,angle:-Math.atan2(next.y-prev.y,next.x-prev.x),color:new THREE.Color(hash(seed)<.79?['#ffcb05','#efb817','#f9d644'][i%3]:['#00274c','#123653','#f0ecda'][i%3]),skin:new THREE.Color(['#b97447','#edbd91','#70452f','#d49970','#925735'][Math.floor(hash(seed+4)*5)]),raised:hash(seed+6)>.65});
    });
  }
  // Four instanced draws cover the entire crowd; their shared shader moves supporters on the GPU.
  function crowdMaterial(){const material=new THREE.MeshLambertMaterial();material.onBeforeCompile=shader=>{shader.uniforms.crowdTime=clock;shader.uniforms.cheer=cheer;shader.vertexShader='uniform float crowdTime;\nuniform float cheer;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n float phase = instanceMatrix[3].x * 0.15 + instanceMatrix[3].z * 0.17;\n transformed.y += (0.045 + cheer * 0.18) * sin(crowdTime * 3.8 + phase) + 0.12 * pow(max(0.0, sin(crowdTime * 1.4 + phase)), 8.0);');};return material;}
  const shirts=new THREE.InstancedMesh(new THREE.BoxGeometry(.35,.48,.26),crowdMaterial(),people.length);
  const heads=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.135,0),crowdMaterial(),people.length);
  const arms=new THREE.InstancedMesh(new THREE.BoxGeometry(.085,.39,.085),crowdMaterial(),people.length*2);
  const t=new THREE.Object3D();
  people.forEach((p,i)=>{t.position.set(p.x,p.y,p.z);t.rotation.set(0,p.angle,0);t.updateMatrix();shirts.setMatrixAt(i,t.matrix);shirts.setColorAt(i,p.color);t.position.y+=.36;t.updateMatrix();heads.setMatrixAt(i,t.matrix);heads.setColorAt(i,p.skin);
    for(const side of [-1,1]){const offset=new THREE.Vector3(side*.23,p.raised?.28:-.02,0).applyAxisAngle(new THREE.Vector3(0,1,0),p.angle);t.position.set(p.x+offset.x,p.y+offset.y,p.z+offset.z);t.rotation.set(0,p.angle,side*(p.raised?-.45:.18));t.updateMatrix();arms.setMatrixAt(i*2+(side===1?1:0),t.matrix);arms.setColorAt(i*2+(side===1?1:0),p.color);}
  });g.add(shirts,heads,arms);
  g.add(band(62,47,16.4,62.8,47.8,16.4,'#e2d4ab'));g.add(band(62.8,47.8,0,62.8,47.8,16.4,'#84654f'));
  // Long brick and glass premium buildings, open air above both end zones.
  for(const side of [-1,1]){
    const z=side*48.5;box(g,[72,14,5],[0,21,z],'#93583f');
    box(g,[69,11,.15],[0,21.5,z-side*2.58],'#19394c');
    for(let level=0;level<4;level++)box(g,[70,.22,.45],[0,17.1+level*3,z-side*2.72],'#c8baa0');
    for(let x=-34;x<=34;x+=2.8)box(g,[.15,11,.22],[x,21.5,z-side*2.77],'#b9b8a9');
    box(g,[75,.5,7],[0,28.2,z],'#a8aca5');
    for(const x of [-36,36]){box(g,[4.4,28,6.8],[x,14,z],'#91563f');box(g,[4.9,.6,7.3],[x,28.3,z],'#c5bda6');for(let y=5;y<27;y+=4)box(g,[1.25,2.7,.18],[x,y,z-side*3.5],'#244052');}
    // Roof floodlights, with luminous panels and no costly per-lamp shadow maps.
    for(let x=-30;x<=30;x+=10){box(g,[.14,3,.14],[x,30,z],'#939a9a');const lamp=box(g,[5,1.05,.25],[x,31.5,z-side*.35],'#ffefc5');lamp.material.emissive.set('#fff4d1');lamp.material.emissiveIntensity=2;}
  }
  for(const side of [-1,1]){
    box(g,[1.05,12.2,34],[side*61.5,24,0],'#00274c');
    for(const z of [-12,-4,4,12])box(g,[.65,17,.65],[side*62,12,z],'#aeada0');
    box(g,[1.2,.5,35],[side*61.5,30.3,0],'#ffcb05');
  }
  // Flags around the upper rim move in the same breeze as the crowd.
  const flags:THREE.Mesh[]=[];
  perimeter(63.4,48.4,44).forEach((p,i)=>{if(Math.abs(p.y)>45&&Math.abs(p.x)<39)return;box(g,[.09,4,.09],[p.x,18.5,p.y],'#d3d2c4');const flag=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1,8,2),new THREE.MeshStandardMaterial({color:i%3===0?'#00274c':'#ffcb05',side:THREE.DoubleSide}));flag.position.set(p.x+.85,20,p.y);flag.userData.phase=i;g.add(flag);flags.push(flag);});
  return {group:g,crowdCount:people.length,animate(time:number,celebrating:boolean){clock.value=time;cheer.value=celebrating?1:0;flags.forEach(flag=>{const a=flag.geometry.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i);a.setZ(i,Math.sin(x*3-time*4+flag.userData.phase)*.17*(x+.85));}a.needsUpdate=true;});}};
}
