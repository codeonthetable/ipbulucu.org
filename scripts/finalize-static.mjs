// Static export has one shared root layout. Set the document language in delivered HTML.
import fs from 'node:fs';
import path from 'node:path';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(path.join(dir,d.name)):[path.join(dir,d.name)]);}
let pages=0, english=0;
for(const file of walk('out').filter(f=>f.endsWith('.html'))){
 let html=fs.readFileSync(file,'utf8');
 const en=file.startsWith(path.join('out','en')+path.sep);
 html=html.replace(/<html\b([^>]*?)lang="[^"]*"/,'<html$1lang="'+(en?'en':'tr')+'"');
 // Match route canonical URLs to exported directory URLs without changing asset URLs.
 html=html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g,tag=>tag.replace(/href="(https:\/\/ipbulucu\.org[^"?#]*)"/,(_,url)=>'href="'+(url.endsWith('/')?url:url+'/')+'"'));
 fs.writeFileSync(file,html);pages++;if(en)english++;
}
console.log(`Static HTML finalized: ${pages} pages, ${english} English documents.`);
