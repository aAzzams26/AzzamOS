const win=document.getElementById('window'),title=document.getElementById('window-title'),content=document.getElementById('window-content'),startMenu=document.getElementById('start-menu'),taskbar=document.getElementById('taskbar'),taskApp=document.getElementById('task-app'),desktop=document.getElementById('desktop');

const defaults={theme:'#243a72',wallpaper:'gradient',taskbar:58,blur:15};
let settings={...defaults,...JSON.parse(localStorage.getItem('jonios-settings')||'{}')};

function applySettings(){
  taskbar.style.height=settings.taskbar+'px';
  taskbar.style.backdropFilter=`blur(${settings.blur}px)`;
  if(settings.wallpaper==='gradient') desktop.style.background=`radial-gradient(circle at 20% 20%,${settings.theme},#101525 45%,#070912)`;
  else if(settings.wallpaper==='dark') desktop.style.background='#08090d';
  else if(settings.wallpaper==='sunset') desktop.style.background='linear-gradient(135deg,#5b2040,#c75c2c 48%,#17152e)';
  else desktop.style.background=settings.wallpaper;
}
function save(){localStorage.setItem('jonios-settings',JSON.stringify(settings));applySettings()}

const apps={
 files:{title:'Files',html:`<h1>📁 Files</h1><div class="file">📄 Readme.txt</div><div class="file">🖼️ Wallpaper.png</div><div class="file">📦 Projects</div>`},
 browser:{title:'Browser',html:`<div class="browser"><h1>🌐 Browser</h1><p>Browser demo.</p><input id="url" placeholder="https://example.com"><button id="go">Go</button><div id="page" style="margin-top:25px"></div></div>`},
 settings:{title:'Settings',html:`<h1>⚙️ Settings</h1>
 <div class="settings-row"><label>Warna tema</label><input id="theme" type="color" value="${settings.theme}"></div>
 <div class="settings-row"><label>Wallpaper</label><select id="wallpaper"><option value="gradient">Gradient</option><option value="dark">Dark</option><option value="sunset">Sunset</option><option value="custom">Warna custom</option></select><input id="custom" type="color" value="#151b32" style="display:none;margin-left:10px"></div>
 <div class="settings-row"><label>Ukuran taskbar: <span id="taskval">${settings.taskbar}</span> px</label><input id="tasksize" type="range" min="45" max="90" value="${settings.taskbar}"></div>
 <div class="settings-row"><label>Blur taskbar: <span id="blurval">${settings.blur}</span> px</label><input id="blur" type="range" min="0" max="30" value="${settings.blur}"></div>
 <div class="settings-row"><button id="reset">Reset Settings</button></div>`}
};

function openApp(name){
 const app=apps[name]; title.textContent=app.title; content.innerHTML=app.html; win.classList.remove('hidden'); startMenu.classList.add('hidden'); taskApp.textContent=app.title;
 if(name==='settings'){
   const theme=document.getElementById('theme'),wall=document.getElementById('wallpaper'),custom=document.getElementById('custom'),size=document.getElementById('tasksize'),blur=document.getElementById('blur');
   wall.value=['gradient','dark','sunset'].includes(settings.wallpaper)?settings.wallpaper:'custom'; custom.style.display=wall.value==='custom'?'inline-block':'none';
   theme.oninput=()=>{settings.theme=theme.value;save()};
   wall.onchange=()=>{settings.wallpaper=wall.value;custom.style.display=wall.value==='custom'?'inline-block':'none';save()};
   custom.oninput=()=>{settings.wallpaper=custom.value;save()};
   size.oninput=()=>{settings.taskbar=+size.value;document.getElementById('taskval').textContent=size.value;save()};
   blur.oninput=()=>{settings.blur=+blur.value;document.getElementById('blurval').textContent=blur.value;save()};
   document.getElementById('reset').onclick=()=>{settings={...defaults};save();openApp('settings')};
 }
 if(name==='browser')document.getElementById('go').onclick=()=>document.getElementById('page').textContent='Navigasi demo ke: '+(document.getElementById('url').value||'');
}
document.querySelectorAll('[data-app]').forEach(el=>el.addEventListener('click',()=>openApp(el.dataset.app)));
document.getElementById('start').onclick=()=>startMenu.classList.toggle('hidden');
document.getElementById('close').onclick=()=>{win.classList.add('hidden');taskApp.textContent=''};
document.getElementById('minimize').onclick=()=>win.classList.add('hidden');
function clock(){document.getElementById('clock').textContent=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}
applySettings();clock();setInterval(clock,1000);