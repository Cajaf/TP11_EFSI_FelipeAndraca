import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import GameOver from './pages/GameOver'
import Home from './pages/Home'
import StartGame from './pages/StartGame'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route path="/" element={<StartGame />} />
          <Route path="/game" element={<Home />} />
          <Route path="/game-over" element={<GameOver />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  )
}

export default App
