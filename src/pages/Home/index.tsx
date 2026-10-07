import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Flag from '../../components/Flag'
import GuessForm from '../../components/GuessForm'
import Leaderboard from '../../components/Leaderboard'
import ScoreBoard from '../../components/ScoreBoard'
import Timer from '../../components/Timer'
import { useGame } from '../../context/GameContext'

const Home = () => {
  const navigate = useNavigate()

  const {
    loading,
    error,
    currentCountry,
    currentRound,
    totalRounds,
    gameFinished,
    lastRound,
  } = useGame()

  useEffect(() => {
    if (gameFinished) {
      navigate('/game-over')
    }
  }, [gameFinished, navigate])

  if (loading) {
    return (
      <div className="app-shell">
        <div className="page-card">
          <p className="status-text">Cargando países...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-shell">
        <div className="page-card">
          <p className="status-text">{error}</p>
        </div>
      </div>
    )
  }

  if (!currentCountry) {
    return (
      <div className="app-shell">
        <div className="page-card">
          <p className="status-text">No hay país disponible.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="game-layout">
        <div className="game-header">
          <div className="meta">
            <span className="chip">
              Ronda {currentRound} / {totalRounds}
            </span>
            <ScoreBoard />
          </div>
          <Timer />
        </div>

        <div className="flag-box">
          <Flag />
        </div>

        {lastRound.result && (
          <div
            className={`result-message ${
              lastRound.result === 'correct' ? 'success' : 'error'
            }`}
          >
            {lastRound.result === 'correct'
              ? `¡Correcto! Era ${lastRound.countryName}.`
              : `Incorrecto. Era ${lastRound.countryName}.`}
          </div>
        )}

        <GuessForm />
        <Leaderboard />
      </div>
    </div>
  )
}

export default Home
