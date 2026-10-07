import { useGame } from '../../context/GameContext'
import './Flag.css'

const Flag = () => {
  const { currentCountry } = useGame()

  if (!currentCountry) {
    return <div className="flag-placeholder">Cargando bandera...</div>
  }

  return <img className="flag-image" src={currentCountry.flag} alt={currentCountry.name} />
}

export default Flag
