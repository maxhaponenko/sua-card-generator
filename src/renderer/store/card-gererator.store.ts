import { makeAutoObservable } from "mobx";
import { RootStore } from "./root.store";

export type Rows = Array<{
  id: number;
  isExportedAsPdf: boolean;
  data: {
    date: string,
    name: string,
    image: Image,
    text: string
  }
}>
type Image = {
  url: string | undefined;
  width: number,
  height: number,
  shape: 'album' | 'portrait' | 'square'
}

export class CardGenerator {

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
  }

  rows: Rows = [];

  get currentRow(): Rows[0] {
    const newArray = [ ...this.rows ]
    return newArray.filter(item => item.isExportedAsPdf === false)[0]
  }

  initRows = (rows: Array<Array<string>>) => {

    rows.shift() // Remove table header names (first row)

    this.rows = rows.map((item, index) => ({
      id: index,
      isExportedAsPdf: false,
      data: {
        date: item[0],
        name: item[1],
        image: mapImageStringToObject(item[2]),
        text: item[3]
      }
    }))

  }

  markAsDone = () => {
    this.rows.filter(item => item.isExportedAsPdf === false)[0].isExportedAsPdf = true
  }

}


function mapImageStringToObject(imageSrcString: string): Image {

  let url = (imageSrcString.match(/(?<=wix:image:\/\/v1\/)\S*\//) || [])[0]
  if (url) url = url.replace(/.$/, '') // remove last slash char at the end
  const width = parseInt((imageSrcString.match(/((?<=originWidth=).\d+)/) || [])[0])
  const height = parseInt((imageSrcString.match(/((?<=originHeight=).\d+)/) || [])[0])

  let shape: Image['shape'] = 'square';
  if (width / height > 0.9 && width / height < 1.1) shape = 'square'
  if (width / height >= 1.1) shape = 'album'
  if (width / height <= 0.9) shape = 'portrait'

  const defaultImageUrl = 'https://static.wixstatic.com/media/ba7697_44768b8c0e354f918aa7aeab45fe634c~mv2.jpg'

  return {
    url: url ? `https://static.wixstatic.com/media/${url}` : defaultImageUrl,
    width: width,
    height: height,
    shape: shape
  }

}
