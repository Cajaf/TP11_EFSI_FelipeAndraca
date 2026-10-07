import { useGame } from '../../context/GameContext'

const Leaderboard = () => {
  const { score, players } = useGame()

  return (
    <table>
      <thead>
        <tr>
          <th>Jugador</th>
          <th>Puntaje</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={player + index}>
            <td>{player}</td>
            <td>{index === 0 ? score : 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Leaderboard
