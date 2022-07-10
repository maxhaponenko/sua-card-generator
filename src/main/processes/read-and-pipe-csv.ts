import { WebContents } from 'electron';
import { parseFile } from 'fast-csv';

export function readAndPipeCsv(fileObject: Electron.OpenDialogReturnValue, webContents: WebContents) {

  let rows: Array<Array<string>> = []

  parseFile(fileObject.filePaths[0])
    .on('error', error => console.error(error))
    .on('data', row => {
      rows.push(row)
    })
    .on('end', (rowCount: number) => {
      webContents.send('FILE_ROW_PARSED', [...rows])
      rows = []
    });
}
