import { BrowserWindow, Menu, MenuItem } from "electron";
import * as isDev from "electron-is-dev";

import { debuglog } from "util";
import * as path from "path";

import { applicationMenuItems } from "../constants/application-main-menu";

const createApplicationMenu = (): Menu => {
  return Menu.buildFromTemplate([
    {
      label: "File",
      submenu: applicationMenuItems
    }
  ]);
};

const createWindow = (): void => {
  const log = debuglog("electron:createWindow");
  let writedownMainBrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  log("window created");

  writedownMainBrowserWindow.loadURL(
    isDev
      ? "http://localhost:8080"
      : `file://${path.join(__dirname, "./dist/index.html")}`
  );

  Menu.setApplicationMenu(createApplicationMenu());
};

export { createWindow };
