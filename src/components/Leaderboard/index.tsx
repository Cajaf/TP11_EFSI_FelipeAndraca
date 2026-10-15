import { useEffect } from 'react'
import { useGame, type Player } from '../../context/GameContext'
import './Leaderboard.css'

const Leaderboard = () => {
  const players: Player[] = useGame().getScores()
  useEffect(() => {
    players.sort((a, b) => b.score - a.score)
  }, [players])

  const list ={
    
  }
  return (
    <table className="leaderboard">
      <thead>
        <tr>
          <th>Jugador</th>
          <th>Puntaje</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td>{player.name}</td>
            <td>{player.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Leaderboard
