import { useNavigate } from 'react-router-dom'
import './StartGame.css'

const StartGame = () => {
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <div className="page-card">
        <h2>Bandera Challenge</h2>
        <p className="status-text">
          Adivina el país según su bandera en 10 rondas.
        </p>
        <div className="page-card-actions">
          <button type="button" className="primary-button" onClick={() => navigate('/game')}>
            Empezar juego
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartGame
