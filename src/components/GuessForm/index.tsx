import { useState } from 'react'
import { useGame } from '../../context/GameContext'
import './GuessForm.css'

const GuessForm = () => {
  const { countries, guess } = useGame()
  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedValue = value.trim()

    if (!trimmedValue) {
      return
    }

    guess(trimmedValue)
    setValue('')
  }

  return (
    <form className="guess-form" onSubmit={handleSubmit}>
      <input
        list="country-options"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Escribí el país"
      />
      <datalist id="country-options">
        {countries.map((country) => (
          <option key={country.name} value={country.name} />
        ))}
      </datalist>
      <button type="submit" className="submit-button">
        Adivinar
      </button>
    </form>
  )
}

export default GuessForm
