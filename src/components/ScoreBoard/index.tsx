import { useGame } from '../../context/GameContext'
import './ScoreBoard.css'

const ScoreBoard = () => {
  const { score } = useGame()

  return <div className="scoreboard">Puntaje: {score}</div>
}

export default ScoreBoard
