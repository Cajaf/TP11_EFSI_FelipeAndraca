import { useState } from 'react'
import { useGame } from '../../context/GameContext'

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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Adivinar</button>
    </form>
  )
}

export default GuessForm
