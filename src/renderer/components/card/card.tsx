import bgImage from './background-layers.png'
import CalendarIcon from './Calendar.png'
import Logo from './logo.png'
import moment from 'moment'
import './card.scss'
import { useStores, rootStore } from 'renderer/store/root.store'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { Rows } from 'renderer/store/card-gererator.store'
const ipcRenderer = require('electron').ipcRenderer




export const Card = observer(function Card() {

  const {
    cardGeneratorStore: {
      currentRow,
      markAsDone
    }
  } = useStores()

  async function processExport() {
    if (!currentRow) return
    try {
      await ipcRenderer.invoke('generate-pdf', currentRow.id)
      markAsDone()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function processUpload() {
    try {
      await ipcRenderer.invoke('upload-csv')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      processExport()
    }, 2000)
  }, [currentRow])

  if (!currentRow) {
    return <button className='upload-csv-btn' onClick={() => processUpload()}>Upload CSV</button>
  }

  const fontSize = currentRow.data.text.length < 200 ? 25 :
    currentRow.data.text.length < 300 ? 22 :
      currentRow.data.text.length < 400 ? 20 :
        17



  const getImageDimensions = (currentRow: Rows[0]) => {
    const IMAGE_WINDOW_WIDTH_SIZE = {
      album: 52,
      square: 43,
      portrait: 36,
    }

    const imageWidth_vw = IMAGE_WINDOW_WIDTH_SIZE[currentRow.data.image.shape]
    const ratio = currentRow.data.image.width / imageWidth_vw
    const imageHeight_vw = currentRow.data.image.height / ratio

    let result = { width: imageWidth_vw, height: imageHeight_vw }

    if (result.width > 55 || result.height > 55) {
      result.width *= 0.8
      result.height *= 0.8
    }
    if (result.width > 65 || result.height > 65) {
      result.width *= 0.65
      result.height *= 0.65
    }
    if (result.width > 75 || result.height > 75) {
      result.width *= 0.5
      result.height *= 0.5
    }

    return result
  }


  return (

    <div className="card-generator" >
      <img className="background-layer" src={bgImage}></img>
      <div
        onClick={() => processExport()}
        className={`image ${currentRow.data.image.shape}`}
        style={{
          backgroundImage: `url(${currentRow.data.image.url})`,
          width: getImageDimensions(currentRow).width + 'vw' ,
          height: getImageDimensions(currentRow).height + 'vw',
        }}
      ></div>
      <div className="sign-container">
        <div>{currentRow.data.name}</div>
        <div><img src={CalendarIcon}></img>{moment(currentRow.data.date).format('DD/MM/YYYY')}</div>
      </div>
      <div
        onClick={() => { markAsDone() }}
        className={`text ${currentRow.data.image.shape === 'portrait' ? 'left' : ''}`}
        style={{ fontSize: fontSize, lineHeight: (fontSize + 5) + 'px' }}
      >
        {currentRow.data.text}
      </div>
      <img className={`logo ${currentRow.data.image.shape === 'portrait' ? 'top-left' : 'bottom-right'}`} src={Logo}></img>
    </div>
  )
})
