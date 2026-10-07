import Flag from '../../components/Flag'
import GuessForm from '../../components/GuessForm'
import Leaderboard from '../../components/Leaderboard'
import ScoreBoard from '../../components/ScoreBoard'
import Timer from '../../components/Timer'
import { useGame } from '../../context/GameContext'

const Home = () => {
  const {
    loading,
    error,
    currentCountry,
    currentRound,
    totalRounds,
    gameFinished,
    lastRound,
    restartGame,
  } = useGame()

  if (loading) {
    return <div>Cargando países...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (gameFinished) {
    return (
      <>
        <h2>Juego terminado</h2>
        <ScoreBoard />
        <p>Completaste {totalRounds} banderas.</p>
        <p>
          Última bandera: {lastRound.countryName ?? 'No disponible'}
        </p>
        <p>
          Resultado: {lastRound.result === 'correct' ? 'Correcto' : 'Incorrecto'}
        </p>
        <p>
          Tu respuesta: {lastRound.guessedName ?? 'Sin respuesta'}
        </p>
        <button type="button" onClick={restartGame}>
          Jugar otra vez
        </button>
      </>
    )
  }

  if (!currentCountry) {
    return <div>No hay país disponible.</div>
  }

  return (
    <>
      <p>
        Ronda {currentRound} / {totalRounds}
      </p>
      <ScoreBoard />
      <Timer />
      <Flag />
      {lastRound.result && (
        <p>
          {lastRound.result === 'correct'
            ? `¡Correcto! Era ${lastRound.countryName}.`
            : `Incorrecto. Era ${lastRound.countryName}.`}
        </p>
      )}
      <GuessForm />
      <Leaderboard />
    </>
  )
}

export default Home
