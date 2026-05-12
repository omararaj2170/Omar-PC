const apps = {
  browser: { title: 'Web Browser', build: browserApp },
  notepad: { title: 'Notepad', build: notepadApp },
  m365: { title: 'Microsoft 365', build: m365App },
  explorer: { title: 'File Explorer', build: explorerApp },
  store: { title: 'Microsoft Store', build: storeApp },
  calculator: { title: 'Calculator', build: calculatorApp },
  paint: { title: 'Paint', build: paintApp },
  todo: { title: 'Tasks', build: todoApp },
  tic: { title: 'Tic-Tac-Toe', build: ticApp },
  snake: { title: 'Snake', build: snakeApp }
};
const appWindow = document.getElementById('appWindow');
const windowTitle = document.getElementById('windowTitle');
const windowBody = document.getElementById('windowBody');
const closeWindow = document.getElementById('closeWindow');
const minWindow = document.getElementById('minWindow');
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const clock = document.getElementById('clock');
const networkStatus = document.getElementById('networkStatus');

function openApp(key) { const app = apps[key]; if (!app) return; windowTitle.textContent = app.title; appWindow.hidden = false; startMenu.hidden = true; app.build(); }
function setBody(html) { windowBody.innerHTML = html; }
document.querySelectorAll('[data-app]').forEach(btn => btn.addEventListener('click', () => openApp(btn.dataset.app)));
closeWindow.addEventListener('click', () => appWindow.hidden = true);
minWindow.addEventListener('click', () => appWindow.hidden = true);
startButton.addEventListener('click', () => startMenu.hidden = !startMenu.hidden);

function browserApp() {
  setBody(`<div class="browser-controls"><input id="urlInput" placeholder="Enter URL or search term"><button id="goBtn">Go</button><button id="newTabBtn">New tab</button></div><iframe class="browser-view" id="browserFrame" src="https://www.google.com"></iframe><p>Some websites block embedding. Use New tab if blocked.</p>`);
  const input = document.getElementById('urlInput'); const frame = document.getElementById('browserFrame');
  document.getElementById('goBtn').onclick = () => { const raw = input.value.trim(); if (!raw) return; const url = raw.includes('.') ? (raw.startsWith('http') ? raw : `https://${raw}`) : `https://www.google.com/search?q=${encodeURIComponent(raw)}`; frame.src = url; };
  document.getElementById('newTabBtn').onclick = () => window.open(frame.src, '_blank');
}
function notepadApp() { setBody(`<textarea id="notes" style="width:100%;min-height:260px">${localStorage.getItem('win11_notes') || ''}</textarea><button id="saveNotes">Save</button>`); document.getElementById('saveNotes').onclick = () => localStorage.setItem('win11_notes', document.getElementById('notes').value); }
function m365App() { setBody(`<h2>Microsoft 365</h2><p>Click an app to open the online version.</p><div class="m365-grid">${[
['Word','https://word.cloud.microsoft/'],
['Excel','https://excel.cloud.microsoft/'],
['PowerPoint','https://powerpoint.cloud.microsoft/'],
['Outlook','https://outlook.office.com/'],
['OneNote','https://www.onenote.com/'],
['Teams','https://teams.microsoft.com/']
].map(([name,url])=>`<article class="store-item"><strong>${name}</strong><p><button class="pill-btn" data-open="${url}">Open Online</button></p></article>`).join('')}</div><p>If a link fails, your org/account or Microsoft routing may require office.com first.</p>`);
windowBody.querySelectorAll('[data-open]').forEach(btn=>btn.onclick=()=>window.open(btn.dataset.open,'_blank')); }
function explorerApp() { setBody(`<h2>File Explorer</h2><p>Local web storage files:</p><ul><li>notes.txt (Notepad)</li><li>tasks.json (Tasks app)</li></ul><p>This browser-based OS can only access sandboxed web storage.</p>`); }
function storeApp() { setBody(`<h2>Microsoft Store</h2><div class="store-grid">${['Microsoft Edge','OneDrive','Microsoft Teams','Outlook','Xbox','Paint','Photos','Clipchamp','PowerToys','Microsoft To Do'].map(a=>`<article class="store-item"><strong>${a}</strong><p>Ready to open/download online</p></article>`).join('')}</div>`); }
function calculatorApp() { setBody(`<input id="calcOut" readonly style="width:100%;padding:.6rem;margin-bottom:.5rem"/><div class="calc-grid">${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'].map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div>`); let exp=''; windowBody.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(k==='C'){exp='';}else if(k==='='){try{exp=String(Function(`return (${exp||0})`)());}catch{exp='ERR';}}else{exp+=k;}document.getElementById('calcOut').value=exp;}); }
function paintApp(){ setBody(`<div class="canvas-wrap"><button id="clearPaint">Clear</button></div><canvas id="paintCanvas" width="760" height="260"></canvas>`); const c=document.getElementById('paintCanvas'); const x=c.getContext('2d'); let d=false; c.onmousedown=e=>{d=true; x.beginPath(); x.moveTo(e.offsetX,e.offsetY);}; c.onmousemove=e=>{if(!d) return; x.lineTo(e.offsetX,e.offsetY); x.stroke();}; window.onmouseup=()=>d=false; document.getElementById('clearPaint').onclick=()=>x.clearRect(0,0,c.width,c.height);}
function todoApp(){ const list=JSON.parse(localStorage.getItem('win11_tasks')||'[]'); setBody(`<input id="taskInput" placeholder="Add task"/><button id="addTask">Add</button><ul id="taskList"></ul>`); const ul=document.getElementById('taskList'); const draw=()=>{ul.innerHTML=''; list.forEach((t,i)=>{const li=document.createElement('li'); li.innerHTML=`${t} <button data-i="${i}">Done</button>`; ul.appendChild(li);}); ul.querySelectorAll('button').forEach(b=>b.onclick=()=>{list.splice(Number(b.dataset.i),1);localStorage.setItem('win11_tasks',JSON.stringify(list));draw();});}; draw(); document.getElementById('addTask').onclick=()=>{const v=document.getElementById('taskInput').value.trim(); if(!v) return; list.push(v); localStorage.setItem('win11_tasks',JSON.stringify(list)); draw();}; }
function ticApp(){ let board=Array(9).fill(''); let turn='X'; setBody(`<h3 id="ticMsg">Turn: X</h3><div class="calc-grid" id="ticGrid">${board.map((_,i)=>`<button data-i="${i}"></button>`).join('')}</div>`); const msg=document.getElementById('ticMsg'); const check=()=>[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].find(([a,b,c])=>board[a]&&board[a]===board[b]&&board[a]===board[c]); document.getElementById('ticGrid').querySelectorAll('button').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.i); if(board[i]) return; board[i]=turn; b.textContent=turn; const win=check(); if(win){msg.textContent=`Winner: ${turn}`; return;} turn=turn==='X'?'O':'X'; msg.textContent=`Turn: ${turn}`;}); }
function snakeApp(){ setBody(`<p>Use arrow keys. Score: <span id="snkScore">0</span></p><div id="snakeBoard"></div>`); const board=document.getElementById('snakeBoard'); const size=16; let snake=[120,119],dir=1,food=45,score=0; const draw=()=>{board.innerHTML=''; for(let i=0;i<size*size;i++){const d=document.createElement('div'); d.className='snake-cell'; if(snake.includes(i)) d.classList.add('snake'); if(i===food) d.classList.add('food'); board.appendChild(d);} document.getElementById('snkScore').textContent=score;}; const step=()=>{const h=snake[0]+dir; if(h<0||h>=256||((dir===1&&snake[0]%16===15)||(dir===-1&&snake[0]%16===0))||snake.includes(h)){clearInterval(timer); return;} snake.unshift(h); if(h===food){score++; do{food=Math.floor(Math.random()*256);}while(snake.includes(food));} else snake.pop(); draw();}; const timer=setInterval(step,180); draw(); window.onkeydown=e=>{if(e.key==='ArrowUp')dir=-16; if(e.key==='ArrowDown')dir=16; if(e.key==='ArrowLeft')dir=-1; if(e.key==='ArrowRight')dir=1;}; }

function tick(){clock.textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});} tick(); setInterval(tick,1000);
function net(){networkStatus.textContent=`Online: ${navigator.onLine ? 'Yes' : 'No'}`;} window.addEventListener('online',net); window.addEventListener('offline',net); net();
