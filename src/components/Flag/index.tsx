import { useGame } from '../../context/GameContext'

const Flag = () => {
  const { currentCountry } = useGame()

  if (!currentCountry) {
    return <div>Cargando bandera...</div>
  }

  return <img src={currentCountry.flag} alt={currentCountry.name} />
}

export default Flag
