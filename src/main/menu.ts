import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';
import { applyBasicSettingsToWindow, resolveHtmlPath, setMainIconToWindow } from './util';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
        {
          label: 'Themes',
          submenu: this.themeSubMenu(),
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Themes',
          submenu: this.themeSubMenu(),
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'About This App',
          click: () => {
            this.showAboutModal();
          }
        },
        {
          label: 'GitHub',
          click() {
            shell.openExternal('https://github.com/parad8816/spellcast-solver');
          },
        },
      ],
    };

    const subMenuView = 
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd
    return [subMenuAbout, subMenuView, subMenuWindow, subMenuHelp]
  }

  buildDefaultTemplate() {
    const menuFile = {
      label: '&File',
      submenu: [
        {
          label: '&Exit',
          accelerator: 'Alt+F4',
          click: () => {
            this.mainWindow.close();
          },
        }
      ],
    }
    const menuViewDev = {
      label: '&View',
      submenu: [
        {
          label: '&Reload',
          accelerator: 'Ctrl+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle &Developer Tools',
          accelerator: 'Alt+Ctrl+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
        {
          label: 'Themes',
          submenu: this.themeSubMenu()
        },
      ]
    }
    const menuViewProd = {
      label: '&View',
      submenu: [
        {
          label: 'Themes',
          submenu: this.themeSubMenu()
        },
      ]
    }
    const menuHelp = {
      label: 'Help',
      submenu: [
        {
          label: 'About This App',
          click: () => {
            this.showAboutModal()
          }
        },
        {
          label: 'GitHub',
          click() {
            shell.openExternal('https://github.com/parad8816/spellcast-solver');
          },
        },
      ],
    }
    const menuView = 
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? menuViewDev
        : menuViewProd
    return [menuFile, menuView, menuHelp]
  }

  showAboutModal() {
    let window: BrowserWindow | null = null
    window = new BrowserWindow({
      show: false,
      width: 560,
      height: 500,
      resizable: false,
      maximizable: false,
      minimizable: false,
      fullscreenable: false,
      modal: true,
      title: "About This App",
      parent: this.mainWindow
    })
    window.menuBarVisible = false
    window.loadURL(resolveHtmlPath("index.html", "about"))
    setMainIconToWindow(window)
    applyBasicSettingsToWindow(window)
  }

  themeSubMenu() {
    return [
      {
        label: 'Light',
        click: () => {
          this.mainWindow.webContents.send("change-theme", "Light");
        },
      },
      {
        label: 'Dark',
        click: () => {
          this.mainWindow.webContents.send("change-theme", "Dark");
        },
      },
    ]
  } 
}
