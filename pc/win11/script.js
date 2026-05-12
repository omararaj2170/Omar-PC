const apps = {
  chrome: {
    title: 'Google Chrome',
    content: `<h2>Chrome</h2><p>Fast browsing and tabs.</p><input placeholder="Search the web" style="width:100%;padding:0.65rem;border-radius:8px;border:1px solid #456;" />`
  },
  notepad: {
    title: 'Notepad',
    content: `<h2>Notepad</h2><textarea style="width:100%;min-height:180px;border-radius:8px;padding:0.75rem;background:#0d1826;color:#eef5ff;">Type your notes here...</textarea>`
  },
  m365: {
    title: 'Microsoft 365',
    content: `<h2>Microsoft 365</h2><p>Quick launch Office apps:</p><ul><li>Word</li><li>Excel</li><li>PowerPoint</li><li>Teams</li></ul>`
  },
  explorer: {
    title: 'File Explorer',
    content: `<h2>File Explorer</h2><p>Folders</p><ul><li>Documents</li><li>Downloads</li><li>Pictures</li><li>Music</li></ul>`
  },
  store: {
    title: 'Microsoft Store',
    content: `<h2>Microsoft Store</h2><p>Core Microsoft apps</p><div class="store-grid">${[
      'Microsoft Edge', 'OneDrive', 'Microsoft Teams', 'Outlook', 'Xbox', 'Paint', 'Photos', 'Clipchamp'
    ].map(app => `<article class="store-item"><strong>${app}</strong><p>Install / Open</p></article>`).join('')}</div>`
  }
};

const appWindow = document.getElementById('appWindow');
const windowTitle = document.getElementById('windowTitle');
const windowBody = document.getElementById('windowBody');
const closeWindow = document.getElementById('closeWindow');
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const clock = document.getElementById('clock');

function openApp(key) {
  const app = apps[key];
  if (!app) return;
  windowTitle.textContent = app.title;
  windowBody.innerHTML = app.content;
  appWindow.hidden = false;
  startMenu.hidden = true;
}

document.querySelectorAll('[data-app]').forEach(btn => {
  btn.addEventListener('click', () => openApp(btn.dataset.app));
});

closeWindow.addEventListener('click', () => { appWindow.hidden = true; });
startButton.addEventListener('click', () => { startMenu.hidden = !startMenu.hidden; });

function tick() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

tick();
setInterval(tick, 1000);
