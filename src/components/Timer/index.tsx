import { useGame } from '../../context/GameContext'

const Timer = () => {
  const { roundTime } = useGame()

  return <div>Tiempo: {roundTime}s</div>
}

export default Timer
