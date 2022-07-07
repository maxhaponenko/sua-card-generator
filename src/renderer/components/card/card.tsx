import bgImage from './background-layers.png'
import cardAlbum from './card-album.jpg'
import CalendarIcon from './Calendar.png'
import Logo from './logo.png'
import './card.scss'

export function Card() {
  return (
    <div className="card-generator">
      <img className="background-layer" src={bgImage}></img>
      <div className="image album" style={{ backgroundImage: `url(${cardAlbum})` }}></div>
      <div className="sign-container">
        <div>Устим</div>
        <div><img src={CalendarIcon}></img>19.05.2022</div>
      </div>
      <div className="text">
        Привіт, воїне, мені 4 роки і я хочу бути схожим на тебе. Адже ти наче незламний велет, що прийде на допомогу і захистить кожного та нашу країну!
      </div>
      <img className="logo album" src={Logo}></img>
    </div>
  )
}

