import { BrowserWindow } from 'electron';
import fs from 'fs'

const options: Electron.PrintToPDFOptions = {
  marginsType: 1,
  pageSize: 'A4',
  printBackground: true,
  printSelectionOnly: false,
  landscape: true,
}

export function generatePdf(imageId: number) {

  return new Promise(async (resolve, reject) => {

    const win = BrowserWindow.getFocusedWindow()
    if (!win) return

    try {
      const data = await win.webContents.printToPDF(options)
      fs.writeFile(`./assets/exported-pdfs/${imageId}.pdf`, data, function (err: any) {
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
