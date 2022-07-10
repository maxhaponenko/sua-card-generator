import bgImage from './background-layers.png'
import cardAlbum from './card-album.jpg'
import cardSquare from './card-square.jpg'
import cardPortrait from './card-portrait.jpg'

import CalendarIcon from './Calendar.png'
import Logo from './logo.png'
import moment from 'moment'
import './card.scss'
import { useStores } from 'renderer/store/root.store'
import { observer } from 'mobx-react'



export const Card = observer(() => {

  const {
    cardGeneratorStore: {
      rows,
      setRows,
      markAsDone
    }
  } = useStores()

  const row = rows.filter(item => item.isExportedAsPdf === false)[0] || {}

  if (!row.data) return null

  const fontSize =  row.data.text.length < 200 ? 25 :
    row.data.text.length < 300 ? 22 :
    row.data.text.length < 400 ? 20 :
    17


  return (
    <div className="card-generator" onClick={() => markAsDone(row.id)}>
      <img className="background-layer" src={bgImage}></img>
      <div
        // className={`image portrait`}
        className={`image ${row.data.image.shape}`}
        // style={{ backgroundImage: `url(${cardPortrait})` }}
        style={{ backgroundImage: `url(${row.data.image.url})` }}
      ></div>
      <div className="sign-container">
        <div>{row.data.name}</div>
        <div><img src={CalendarIcon}></img>{moment(row.data.date).format('DD/MM/YYYY')}</div>
      </div>
      <div className={`text ${row.data.image.shape === 'portrait' ? 'left' : ''}`} style={{ fontSize: fontSize, lineHeight: (fontSize + 5)+'px' }}>
        {row.data.text}
        {/* Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id orci porta dapibus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. */}
      </div>
      <img className={`logo ${row.data.image.shape === 'portrait' ? 'top-left' : 'bottom-right'}`} src={Logo}></img>
    </div>
  )
})




