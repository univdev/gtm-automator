import { app, BrowserWindow } from 'electron';
import { join, resolve } from 'path';

const __dirname = resolve();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  process.env.NODE_ENV === 'production'
    ? win.loadFile(join(__dirname, '../client/dist/index.html'))
    : win.loadURL('http://localhost:3000'); // Vite 개발 서버 URL
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
