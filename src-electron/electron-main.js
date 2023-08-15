import { app, BrowserWindow, nativeTheme, screen } from "electron";
import path from "path";
import os from "os";

import "./ipc.js";

// Set a new custom path for 'userData'
const appName = "fantasy-name-generator";
const userDataPath = path.join(app.getPath("appData"), appName);
app.setPath("userData", userDataPath);

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

const isDevelopment = process.env.DEBUGGING;

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  let displays = screen.getAllDisplays();
  let external = null;
  for (let i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      external = displays[i];
      break;
    }
  }

  // if development
  let windowSettings =
    isDevelopment && external
      ? {
          width: 1200,
          height: 800,
          x: external.bounds.x,
          y: external.bounds.y + 50,
        }
      : isDevelopment && !external
      ? { width: 940, height: 800, x: 0, y: 50 }
      : { width: 1200, height: 800 };

  try {
    if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
      require("fs").unlinkSync(
        path.join(app.getPath("userData"), "DevTools Extensions")
      );
    }
  } catch (_) {}

  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    ...windowSettings,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
