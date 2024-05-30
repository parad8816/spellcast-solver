/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets')

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
}

function resolveHtmlPath(htmlFileName: string, hash: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    url.hash = hash
    return url.href;
  }
  const url = new URL(`file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`)
  url.hash = hash
  return url.href
}

function setMainIconToWindow(window: BrowserWindow) {
  const icon = getAssetPath("icon.png")
  window.setIcon(icon)
}

function applyBasicSettingsToWindow(window: BrowserWindow) {
  window.on('ready-to-show', () => {
    if (!window) {
      throw new Error('window not defined');
    }
    if (process.env.START_MINIMIZED) {
      window.minimize();
    } else {
      window.show();
    }
  });

  window.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
}

export {
  resolveHtmlPath,
  setMainIconToWindow,
  applyBasicSettingsToWindow,
}
