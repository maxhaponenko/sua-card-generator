// import { ipcRenderer } from 'electron';
import { createRoot } from 'react-dom/client';
import App from './App';
import { rootStore } from './store/root.store'
const ipcRenderer = require('electron').ipcRenderer


const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<>
  <App />
</>);

ipcRenderer.on('FILE_ROW_PARSED', (event, data) => {
  rootStore.cardGeneratorStore.initRows(data as any)
})

