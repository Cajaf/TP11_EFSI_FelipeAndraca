import { useGame } from '../../context/GameContext'

const ScoreBoard = () => {
  const { score } = useGame()

  return <div>Puntaje: {score}</div>
}

export default ScoreBoard
