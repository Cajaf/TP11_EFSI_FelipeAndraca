import { GameProvider } from './context/GameContext'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <GameProvider>
      <Home />
    </GameProvider>
  )
}

export default App
