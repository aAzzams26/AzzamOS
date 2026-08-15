const win=document.getElementById('window');
const title=document.getElementById('window-title');
const content=document.getElementById('window-content');
const startMenu=document.getElementById('start-menu');
const taskApp=document.getElementById('task-app');

const apps={
 files:{
  title:'Files',
  html:`<h1>📁 Files</h1><div class="file">📄 Readme.txt</div><div class="file">🖼️ Wallpaper.png</div><div class="file">📦 Projects</div>`
 },
 browser:{
  title:'Browser',
  html:`<div class="browser"><h1>🌐 Browser</h1><p>Browser palsu untuk demo UI.</p><input id="url" placeholder="https://example.com"><button id="go">Go</button><div id="page" style="margin-top:25px"></div></div>`
 },
 settings:{
  title:'Settings',
  html:`<h1>⚙️ Settings</h1><div class="settings-row"><span>Dark Mode</span><b>ON</b></div><div class="settings-row"><span>Animations</span><b>ON</b></div><div class="settings-row"><span>Version</span><b>1.0 Web</b></div>`
 }
};

function openApp(name){
 const app=apps[name];
 title.textContent=app.title;
 content.innerHTML=app.html;
 win.classList.remove('hidden');
 startMenu.classList.add('hidden');
 taskApp.textContent=app.title;
 if(name==='browser'){
   document.getElementById('go').onclick=()=>{
     const value=document.getElementById('url').value.trim();
     document.getElementById('page').textContent=value?`Navigasi demo ke: ${value}`:'Masukkan alamat dulu.';
   };
 }
}

document.querySelectorAll('[data-app]').forEach(el=>el.addEventListener('click',()=>openApp(el.dataset.app)));
document.getElementById('start').onclick=()=>startMenu.classList.toggle('hidden');
document.getElementById('close').onclick=()=>{win.classList.add('hidden');taskApp.textContent=''};
document.getElementById('minimize').onclick=()=>win.classList.add('hidden');

function clock(){
 document.getElementById('clock').textContent=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
}
clock(); setInterval(clock,1000);
