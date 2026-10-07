import { useGame } from '../../context/GameContext'
import './Timer.css'

const Timer = () => {
  const { roundTime } = useGame()

  return <div className="timer">Tiempo: {roundTime}s</div>
}

export default Timer
