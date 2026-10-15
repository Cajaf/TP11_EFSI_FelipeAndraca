import { useEffect, useState } from 'react'
import { useGame, type Player } from '../../context/GameContext'
import './Leaderboard.css'

const Leaderboard = () => {
  const [players, setPlayers] = useState(useGame().getScores())
  useEffect(() => {
    setPlayers(players.sort((a, b) => b.score - a.score))
  }, [players])

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
