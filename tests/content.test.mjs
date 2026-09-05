import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import ts from 'typescript';
const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
async function loadTs(path){const source=await read(path);const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}});return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);}
const {projects,exhibits}=await loadTs('lib/data.ts');
const {stations}=await loadTs('lib/field-physics.ts');

test('nine distinct project models and an addressable tenth About Me stop',()=>{
  assert.equal(projects.length,9);assert.equal(new Set(projects.map(p=>p.kind)).size,9);
  assert.equal(exhibits.length,10);assert.equal(exhibits[9].id,'about');assert.equal(stations.length,exhibits.length);
  assert.equal(new Set(exhibits.map(p=>p.id)).size,10);
  for(const project of projects){assert.ok(project.detail.length>80);assert.ok(project.codeUrl||project.liveUrl);for(const url of [project.codeUrl,project.liveUrl].filter(Boolean))assert.ok(url.startsWith('https://')||url==='/Ethan_Moon_Resume.pdf');}
});
test('professional contact and static reading content remain available',async()=>{
  const page=await read('app/page.tsx'),layout=await read('app/layout.tsx');
  assert.match(page,/mailto:ethmoon@umich\.edu/);assert.match(page,/linkedin\.com\/in\/ethan-moon0108/);
  assert.match(page,/<noscript>/);assert.match(page,/projects\.map/);assert.match(layout,/application\/ld\+json/);
});
test('published résumé is the exact user-supplied document',async()=>{
  const pdf=await readFile(new URL('../public/Ethan_Moon_Resume.pdf',import.meta.url));
  assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
  assert.equal(createHash('sha256').update(pdf).digest('hex'),'ac56e49fd517bc98dce67ebe6edfdcdff66dfe3a2c8dd1babc8fbf8ad7239dc4');
  const generator=await read('scripts/build-career-documents.py');assert.match(generator,/PUBLIC = ROOT \/ "tmp" \/ "legacy-career-documents"/);
});
