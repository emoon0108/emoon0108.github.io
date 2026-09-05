'use client';
import {useEffect,useRef,useState,type RefObject} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createFieldWorld} from '@/lib/field-world';
import {initialBall,stepBall,nearestStation,stations,type Point} from '@/lib/field-physics';
import {exhibits} from '@/lib/data';

export type FieldCommand={id:number;type:'reset'|'kick'};
type Props={selected:number|null;blocked:boolean;follow:boolean;motion:boolean;running:boolean;input:RefObject<Point>;command:FieldCommand;onOpen:(i:number)=>void;onNearest:(i:number|null)=>void;onScore:(score:number)=>void;onReady:()=>void};
export default function FieldScene(props:Props){
  const host=useRef<HTMLDivElement>(null),labels=useRef<(HTMLButtonElement|null)[]>([]),current=useRef(props);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{current.current=props;},[props]);
  useEffect(()=>{
    const container=host.current;if(!container)return;
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});}catch{
      // WebGL creation is an external capability check; show the accessible fallback when it fails.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFailed(true);return;
    }
    renderer.setClearColor('#12243a');renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
    const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('role','application');canvas.setAttribute('aria-label','Soccer stadium. Move the ball with arrow keys or WASD, Space to kick, R to reset. Select project markers or use the Projects button.');container.appendChild(canvas);
    const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight('#bfd4ff','#253526',1.1));
    const sun=new THREE.DirectionalLight('#fff1d0',2.0);sun.position.set(-30,65,30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-82,right:82,top:82,bottom:-82,far:220});sun.shadow.normalBias=.05;sun.shadow.bias=-.00025;scene.add(sun);
    const fill=new THREE.DirectionalLight('#c7dfef',2.2);fill.position.set(30,20,-25);scene.add(fill);
    const world=createFieldWorld();scene.add(world.group);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(500,500),new THREE.ShadowMaterial({opacity:.13}));ground.rotation.x=-Math.PI/2;ground.position.y=-1.26;ground.receiveShadow=true;scene.add(ground);
    const camera=new THREE.OrthographicCamera(-75,75,50,-50,.1,350);camera.position.set(100,170,120);camera.lookAt(0,0,0);
    const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.enablePan=false;controls.minZoom=.8;controls.maxZoom=12;controls.minPolarAngle=.3;controls.maxPolarAngle=1.25;canvas.style.touchAction='none';
    let dirty=true,alive=true,visible=true,frame=0,elapsed=0,gameTime=0,lastRender=0,lastKey='',lastCommand=-1,nearest:number|null=null,desiredZoom:number|null=null,desiredDistance:number|null=null;
    const ball=initialBall(),keys=new Set<string>();let kick=false,target:Point|null=null;let down={x:0,y:0};
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const ray=new THREE.Raycaster(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
    const centers=new THREE.Vector3();
    function reset(){const score=ball.score;Object.assign(ball,initialBall());ball.score=score;target=null;keys.clear();dirty=true;}
    function keyboard(e:KeyboardEvent){const p=current.current;const focused=document.activeElement;if(p.blocked||focused instanceof HTMLElement&&(focused.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(focused.tagName)))return;if(['Space','Enter'].includes(e.code)&&focused!==canvas&&focused!==document.body)return;
      const allowed=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','Space','KeyR','Enter'];if(!allowed.includes(e.code))return;e.preventDefault();
      if(e.code==='Space'&&!e.repeat)kick=true;else if(e.code==='KeyR')reset();else if(e.code==='Enter'&&nearest!==null)p.onOpen(nearest);else keys.add(e.code);
      target=null;dirty=true;
    }
    function keyup(e:KeyboardEvent){keys.delete(e.code);}
    function clear(){keys.clear();target=null;current.current.input.current={x:0,z:0};}
    window.addEventListener('keydown',keyboard);window.addEventListener('keyup',keyup);window.addEventListener('blur',clear);
    function pointerDown(e:PointerEvent){down={x:e.clientX,y:e.clientY};}
    function pointerUp(e:PointerEvent){if(current.current.blocked||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)return;const rect=canvas.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);
      const hit=ray.intersectObjects(world.exhibits.map(x=>x.root),true)[0];if(hit){current.current.onOpen(hit.object.userData.projectIndex);return;}
      const point=new THREE.Vector3();if(ray.ray.intersectPlane(plane,point)){target={x:THREE.MathUtils.clamp(point.x,-32,32),z:THREE.MathUtils.clamp(point.z,-24,24)};canvas.focus({preventScroll:true});dirty=true;}
    }
    canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointerup',pointerUp);
    controls.addEventListener('change',()=>{dirty=true;});controls.addEventListener('start',()=>{desiredZoom=null;});
    const resize=new ResizeObserver(()=>{const {width,height}=container.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);const aspect=width/height,extent=Math.max(105,175/aspect);camera.left=-extent*aspect/2;camera.right=extent*aspect/2;camera.top=extent/2;camera.bottom=-extent/2;camera.updateProjectionMatrix();lastKey='';dirty=true;});resize.observe(container);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)dirty=true;else clear();});observer.observe(container);
    function tick(now:number){if(!alive)return;frame=requestAnimationFrame(tick);if(!visible||document.hidden)return;if(now-lastRender<32)return;const dt=Math.min((now-lastRender)/1000,.05);lastRender=now;
      const p=current.current,smooth=p.motion&&!reduced.matches;gameTime+=dt;if(world.animate(gameTime,smooth))dirty=true;if(smooth||ball.cooldown>0)dirty=true;
      if(p.command.id!==lastCommand){lastCommand=p.command.id;if(p.command.type==='reset')reset();else kick=true;}
      const key=`${p.selected}-${p.follow}-${p.blocked}-${p.motion}-${p.running}`;
      if(key!==lastKey){lastKey=key;const extent=camera.top-camera.bottom;desiredZoom=p.selected!==null?extent/14:p.follow?extent/26:1;desiredDistance=p.selected!==null?18:p.follow?35:231;dirty=true;if(p.blocked)clear();}
      const input={...p.input.current};if(keys.has('KeyW')||keys.has('ArrowUp'))input.z-=1;if(keys.has('KeyS')||keys.has('ArrowDown'))input.z+=1;if(keys.has('KeyA')||keys.has('ArrowLeft'))input.x-=1;if(keys.has('KeyD')||keys.has('ArrowRight'))input.x+=1;
      // Keyboard direction is relative to the current camera, so up always moves up the screen.
      const forward=new THREE.Vector3();camera.getWorldDirection(forward);forward.y=0;forward.normalize();const right=new THREE.Vector3(-forward.z,0,forward.x);
      let movement={x:right.x*input.x-forward.x*input.z,z:right.z*input.x-forward.z*input.z};
      if(target){const dx=target.x-ball.x,dz=target.z-ball.z,d=Math.hypot(dx,dz);if(d<.4){target=null;}else movement={x:dx/d,z:dz/d};}
      if(!p.blocked){const result=stepBall(ball,movement,dt,kick);if(result.goal){target=null;world.updateScore(ball.score);p.onScore(ball.score);}if(result.moving||ball.cooldown>0){dirty=true;world.ball.rotation.z-=ball.vx*dt/.38;world.ball.rotation.x+=ball.vz*dt/.38;}}kick=false;
      world.ball.position.set(ball.x,.44,ball.z);world.marker.position.set(ball.x,.05,ball.z);
      const near=nearestStation(ball);if(near!==nearest){nearest=near;p.onNearest(near);dirty=true;}
      if(p.selected!==null){const station=stations[p.selected];centers.set(station.x,1.5,station.z);}else if(p.follow){centers.set(ball.x,0,ball.z);}else centers.set(0,0,0);
      const delta=centers.clone().sub(controls.target);if(delta.lengthSq()>.0001){delta.multiplyScalar(smooth?1-Math.exp(-dt*5):1);controls.target.add(delta);camera.position.add(delta);dirty=true;}
      if(desiredDistance!==null){const offset=camera.position.clone().sub(controls.target),distance=offset.length(),difference=desiredDistance-distance;camera.position.copy(controls.target).add(offset.setLength(distance+difference*(smooth?1-Math.exp(-dt*6):1)));if(Math.abs(difference)<.005)desiredDistance=null;dirty=true;}
      if(desiredZoom!==null){const difference=desiredZoom-camera.zoom;if(Math.abs(difference)>.002){camera.zoom+=difference*(smooth?1-Math.exp(-dt*5):1);camera.updateProjectionMatrix();dirty=true;}else{camera.zoom=desiredZoom;desiredZoom=null;}}
      const active=smooth&&p.running&&p.selected!==null;if(active){elapsed+=dt;dirty=true;}
      world.exhibits.forEach((exhibit,i)=>exhibit.model.animate(elapsed,smooth&&p.running&&p.selected===i));
      if(controls.update())dirty=true;
      if(dirty){world.exhibits.forEach((exhibit,i)=>{const label=labels.current[i];if(!label)return;const point=new THREE.Vector3(exhibit.root.position.x,.7,exhibit.root.position.z+3.65).project(camera);const show=p.selected===null&&Math.abs(point.x)<.96&&Math.abs(point.y)<.88;label.style.display=show?'block':'none';label.style.left=`${(point.x*.5+.5)*container!.clientWidth}px`;label.style.top=`${(-point.y*.5+.5)*container!.clientHeight}px`;});renderer.shadowMap.needsUpdate=active||gameTime<.2;renderer.render(scene,camera);dirty=false;}
    }
    function contextLost(e:Event){e.preventDefault();alive=false;setFailed(true);}canvas.addEventListener('webglcontextlost',contextLost);
    current.current.onReady();frame=requestAnimationFrame(tick);
    return()=>{alive=false;cancelAnimationFrame(frame);clear();observer.disconnect();resize.disconnect();controls.dispose();window.removeEventListener('keydown',keyboard);window.removeEventListener('keyup',keyup);window.removeEventListener('blur',clear);canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointerup',pointerUp);canvas.removeEventListener('webglcontextlost',contextLost);scene.traverse(n=>{if(n instanceof THREE.Mesh||n instanceof THREE.Line||n instanceof THREE.Points){n.geometry.dispose();const materials=Array.isArray(n.material)?n.material:[n.material];for(const m of materials){if('map' in m&&(m.map instanceof THREE.Texture))m.map.dispose();m.dispose();}}});renderer.dispose();canvas.remove();};
  },[]);
  return <div className="field-canvas" ref={host}>{exhibits.map((p,i)=><button key={p.id} className="field-marker" ref={el=>{labels.current[i]=el;}} style={{display:'none'}} onClick={()=>props.onOpen(i)}><span>{String(i+1).padStart(2,'0')}</span>{p.name}<span>↗</span></button>)}{failed&&<div className="field-error"><h2>3D isn’t available in this browser.</h2><p>Use List view to read the projects.</p></div>}</div>;
}
