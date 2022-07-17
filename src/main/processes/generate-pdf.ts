import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const options: Electron.PrintToPDFOptions = {
  marginsType: 1,
  pageSize: {
    width: 1000,
    height: 709
  },
  printBackground: true,
  printSelectionOnly: false,
  landscape: true,
}

export function generatePdf() {

  return new Promise(async (resolve, reject) => {

    const win = BrowserWindow.getFocusedWindow()
    if (!win) return

    try {
      const data = await win.webContents.printToPDF(options)
      fs.writeFile(`./assets/exported-pdfs/${uuidv4()}.pdf`, data, function (err: any) {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          console.log('PDF Generated Successfully');
          resolve(true)
        }
      })
    } catch (error) {
      console.log(error)
    }
  })
}
