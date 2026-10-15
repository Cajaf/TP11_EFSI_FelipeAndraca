import { useNavigate } from 'react-router-dom'
import './StartGame.css'
import Leaderboard from '../../components/Leaderboard'
import { useGame } from '../../context/GameContext'

const StartGame = () => {
  const navigate = useNavigate()
  const {restartGame} = useGame()
  const handlePlayAgain = () => {
    restartGame()
    navigate('/game')
  }
  return (
    <div className="app-shell">
      <div className="page-card">
        <h2>Bandera Challenge</h2>
        <p className="status-text">
          Adivina el país según su bandera en 10 rondas.
        </p>
        <div className="page-card-actions">
          <button type="button" className="primary-button" onClick={handlePlayAgain}>
            Empezar juego
          </button>
        </div>
        <Leaderboard />
      </div>
    </div>
  )
}

export default StartGame
