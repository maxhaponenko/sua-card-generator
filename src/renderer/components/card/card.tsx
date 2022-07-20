import bgImage from './background-layers.png'
import CalendarIcon from './Calendar.png'
import Logo from './logo.png'
import moment from 'moment'
import './card.scss'
import { useStores, rootStore } from 'renderer/store/root.store'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
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


  if (!currentRow) return null

  const fontSize = currentRow.data.text.length < 200 ? 25 :
    currentRow.data.text.length < 300 ? 22 :
      currentRow.data.text.length < 400 ? 20 :
        17

        debugger
  if (!currentRow) {

    return <button className='upload-csv-btn'>Upload CSV</button>
  }

  return (
    <div className="card-generator" >
      <img className="background-layer" src={bgImage}></img>
      <div
        onClick={() => processExport()}
        className={`image ${currentRow.data.image.shape}`}
        style={{ backgroundImage: `url(${currentRow.data.image.url})`}}
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
