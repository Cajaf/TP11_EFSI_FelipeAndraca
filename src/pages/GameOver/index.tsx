import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/GameContext'

const GameOver = () => {
  const navigate = useNavigate()
  const { score, totalRounds, lastRound, restartGame } = useGame()

  const handlePlayAgain = () => {
    restartGame()
    navigate('/game')
  }

  const handleBackToStart = () => {
    restartGame()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <div className="page-card">
        <h2>Juego terminado</h2>
        <div className="summary-list">
          <div className="summary-item">
            <span>Puntaje final</span>
            <strong>{score}</strong>
          </div>
          <div className="summary-item">
            <span>Rondas</span>
            <strong>{totalRounds}</strong>
          </div>
          <div className="summary-item">
            <span>Última bandera</span>
            <strong>{lastRound.countryName ?? 'No disponible'}</strong>
          </div>
          <div className="summary-item">
            <span>Resultado</span>
            <strong>{lastRound.result === 'correct' ? 'Correcto' : 'Incorrecto'}</strong>
          </div>
        </div>

        <div className="page-card-actions">
          <button type="button" className="primary-button" onClick={handlePlayAgain}>
            Jugar otra vez
          </button>
          <button type="button" className="secondary-button" onClick={handleBackToStart}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver
