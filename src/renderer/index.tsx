import { createRoot } from 'react-dom/client';
import App, { state } from './App';
import { rootStore } from './store/root.store'


const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);


// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

window.electron.ipcRenderer.on('FILE_ROW_PARSED', (rows: Array<Array<string>>) => {

  console.log(rows)
  rootStore.cardGeneratorStore.setRows(rows)

})
