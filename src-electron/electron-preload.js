const { contextBridge, ipcRenderer } = require("electron");

// Expose a custom API to the renderer process
contextBridge.exposeInMainWorld("api", {
  invoke(apiName, args) {
    return ipcRenderer.invoke(apiName, args);
  },
});
