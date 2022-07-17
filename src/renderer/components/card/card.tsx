import bgImage from './background-layers.png'
import CalendarIcon from './Calendar.png'
import Logo from './logo.png'
import moment from 'moment'
import './card.scss'
import { useStores } from 'renderer/store/root.store'
import { observer } from 'mobx-react'
const ipcRenderer = require('electron').ipcRenderer




export const Card = observer(() => {

  const {
    cardGeneratorStore
  } = useStores()

  async function processExport() {
    try {
      await ipcRenderer.invoke('generate-pdf', cardGeneratorStore.currentRow.id)
      // cardGeneratorStore.markAsDone()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  if (!cardGeneratorStore.currentRow) return null

  const fontSize = cardGeneratorStore.currentRow.data.text.length < 200 ? 25 :
    cardGeneratorStore.currentRow.data.text.length < 300 ? 22 :
      cardGeneratorStore.currentRow.data.text.length < 400 ? 20 :
        17

  return (
    <div className="card-generator" >
      <img className="background-layer" src={bgImage}></img>
      <img
        onClick={() => processExport()}
        className={`image ${cardGeneratorStore.currentRow.data.image.shape}`}
        src={cardGeneratorStore.currentRow.data.image.url}
      ></img>
      <div className="sign-container">
        <div>{cardGeneratorStore.currentRow.data.name}</div>
        <div><img src={CalendarIcon}></img>{moment(cardGeneratorStore.currentRow.data.date).format('DD/MM/YYYY')}</div>
      </div>
      <div
        onClick={() => { cardGeneratorStore.markAsDone() }}
        className={`text ${cardGeneratorStore.currentRow.data.image.shape === 'portrait' ? 'left' : ''}`}
        style={{ fontSize: fontSize, lineHeight: (fontSize + 5) + 'px' }}
      >
        {cardGeneratorStore.currentRow.data.text}
      </div>
      <img className={`logo ${cardGeneratorStore.currentRow.data.image.shape === 'portrait' ? 'top-left' : 'bottom-right'}`} src={Logo}></img>
    </div>
  )
})
