import fs from 'fs'



export async function generatePdf(fileObject: Buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./assets/some-file-name.pdf', fileObject, function (err: any) {
      if (err) {
        console.log(err);
        reject(err)
      } else {
        console.log('PDF Generated Successfully');
        resolve(true)
      }
    })
  })

}
