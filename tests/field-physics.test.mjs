import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';
const source=await readFile(new URL('../lib/field-physics.ts',import.meta.url),'utf8');
const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}});
const {initialBall,stepBall,nearestStation,stations}=await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const neutral={x:0,z:0};
test('input accelerates, diagonal input is normalized, and drag brings the ball to rest',()=>{
  const straight=initialBall(),diagonal=initialBall();
  for(let i=0;i<30;i++){stepBall(straight,{x:1,z:0},1/60);stepBall(diagonal,{x:1,z:1},1/60);}
  assert.ok(straight.x>1);assert.ok(Math.abs(Math.hypot(diagonal.vx,diagonal.vz)-straight.vx)<1e-8);
  for(let i=0;i<180;i++)stepBall(straight,neutral,1/60);
  assert.ok(Math.hypot(straight.vx,straight.vz)<.001);
});
test('30 and 60 fps produce comparable one-second movement',()=>{
  function run(fps){const ball=initialBall();for(let i=0;i<fps;i++)stepBall(ball,{x:1,z:0},1/fps);return ball.x;}
  assert.ok(Math.abs(run(30)-run(60))<.15);
});
test('both goals score once, then reset to center after the celebration',()=>{
  for(const side of [-1,1]){const ball=initialBall();Object.assign(ball,{x:side*20.8,vx:side*10});
    assert.equal(stepBall(ball,neutral,.05).goal,true);assert.equal(ball.score,1);
    for(let i=0;i<30;i++)assert.equal(stepBall(ball,{x:side,z:0},.02,true).goal,false);
    assert.equal(ball.score,1);
    let resetWasMoving=false;while(ball.cooldown>0)resetWasMoving=stepBall(ball,neutral,.05).moving;
    assert.equal(ball.x,0);assert.equal(ball.z,0);assert.equal(resetWasMoving,true);
  }
});
test('shots outside the posts do not score and kicks respect the speed cap',()=>{
  const ball=initialBall();Object.assign(ball,{x:20.8,z:3.3,vx:10});assert.equal(stepBall(ball,neutral,.05).goal,false);
  for(let i=0;i<10;i++)stepBall(ball,{x:1,z:0},.01,true);assert.ok(Math.hypot(ball.vx,ball.vz)<=20.00001);
});
test('concourse exhibits repel the ball, including a direct center collision',()=>{
  for(const station of stations){const ball={...initialBall(),...station};stepBall(ball,neutral,.016);assert.ok(Math.hypot(ball.x-station.x,ball.z-station.z)>=2.59);assert.ok(Number.isFinite(ball.x));}
});
test('proximity resolves every exhibit and leaves the center circle clear',()=>{
  assert.equal(nearestStation(neutral),null);stations.forEach((station,i)=>assert.equal(nearestStation(station),i));
});
