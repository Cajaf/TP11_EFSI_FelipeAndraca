import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Country = {
  name: string
  flag: string
}

type RoundResult = {
  result: 'correct' | 'incorrect' | null
  countryName: string | null
  guessedName: string | null
}

type GameContextValue = {
  countries: Country[]
  currentCountry: Country | null
  score: number
  roundTime: number
  players: string[]
  loading: boolean
  error: string | null
  currentRound: number
  totalRounds: number
  gameFinished: boolean
  lastRound: RoundResult
  guess: (value: string) => void
  nextCountry: () => void
  resetScore: () => void
  restartGame: () => void
}

const GameContext = createContext<GameContextValue | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const TOTAL_ROUNDS = 10

  const [countries, setCountries] = useState<Country[]>([])
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null)
  const [score, setScore] = useState(0)
  const [roundTime, setRoundTime] = useState(15)
  const [players] = useState(['Jugador 1'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [gameFinished, setGameFinished] = useState(false)
  const [lastRound, setLastRound] = useState<RoundResult>({
    result: null,
    countryName: null,
    guessedName: null,
  })

  const chooseRandomCountry = useCallback((list: Country[], excludeCountryName?: string) => {
    if (!list.length) {
      return null
    }

    const availableCountries = excludeCountryName
      ? list.filter((country) => country.name !== excludeCountryName)
      : list

    const source = availableCountries.length ? availableCountries : list
    const randomIndex = Math.floor(Math.random() * source.length)
    return source[randomIndex]
  }, [])

  const finishGame = useCallback(() => {
    setGameFinished(true)
    setCurrentCountry(null)
    setRoundTime(15)
  }, [])

  const restartGame = useCallback(() => {
    setScore(0)
    setCurrentRound(1)
    setGameFinished(false)
    setRoundTime(15)
    setLastRound({ result: null, countryName: null, guessedName: null })

    if (countries.length) {
      setCurrentCountry(chooseRandomCountry(countries))
    }
  }, [chooseRandomCountry, countries])

  const resetScore = useCallback(() => {
    setScore(0)
    setCurrentRound(1)
    setGameFinished(false)
    setRoundTime(15)
    setLastRound({ result: null, countryName: null, guessedName: null })

    if (countries.length) {
      const nextCountry = chooseRandomCountry(countries)
      setCurrentCountry(nextCountry)
    }
  }, [chooseRandomCountry, countries])

  const nextCountry = useCallback(() => {
    if (!countries.length || gameFinished) {
      return
    }

    const randomCountry = chooseRandomCountry(countries, currentCountry?.name)
    setCurrentCountry(randomCountry)
    setRoundTime(15)
  }, [chooseRandomCountry, countries, currentCountry, gameFinished])

  const processRound = useCallback(
    (submittedAnswer?: string, forcedTimeout = false) => {
      if (!currentCountry || gameFinished) {
        return
      }

      const normalizedAnswer = (submittedAnswer ?? '').trim()
      const isCorrect =
        normalizedAnswer.toLowerCase() === currentCountry.name.trim().toLowerCase()

      const finalResult: RoundResult = {
        result: isCorrect ? 'correct' : 'incorrect',
        countryName: currentCountry.name,
        guessedName: forcedTimeout ? 'Sin respuesta' : normalizedAnswer || 'Sin respuesta',
      }

      setScore((previousScore) => previousScore + (isCorrect ? 10 : -1))
      setLastRound(finalResult)

      const isFinalRound = currentRound >= TOTAL_ROUNDS

      if (isFinalRound) {
        finishGame()
        return
      }

      const nextCountryToSet = chooseRandomCountry(countries, currentCountry.name)
      setCurrentCountry(nextCountryToSet)
      setRoundTime(15)
      setCurrentRound((previousRound) => previousRound + 1)
    },
    [chooseRandomCountry, countries, currentCountry, currentRound, finishGame, gameFinished],
  )

  const guess = useCallback(
    (value: string) => {
      if (!currentCountry || gameFinished) {
        return
      }

      if (!value.trim()) {
        return
      }

      processRound(value, false)
    },
    [currentCountry, gameFinished, processRound],
  )

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images')

        if (!response.ok) {
          throw new Error('No se pudieron cargar los países')
        }

        const data = await response.json()
        const parsedCountries = Array.isArray(data?.data)
          ? data.data
              .map((item: any) => {
                if (!item || typeof item !== 'object') {
                  return null
                }

                const countryName = typeof item.name === 'string' ? item.name.trim() : ''
                const countryFlag = typeof item.flag === 'string' ? item.flag : ''

                if (!countryName || !countryFlag) {
                  return null
                }

                return {
                  name: countryName,
                  flag: countryFlag,
                }
              })
              .filter(Boolean)
          : []

        if (!parsedCountries.length) {
          throw new Error('La API no devolvió países válidos')
        }

        setCountries(parsedCountries)
        setCurrentCountry(chooseRandomCountry(parsedCountries))
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    void fetchCountries()
  }, [chooseRandomCountry])

  useEffect(() => {
    if (!currentCountry || gameFinished) {
      return
    }

    const countdown = window.setInterval(() => {
      setRoundTime((previousValue) => {
        if (previousValue <= 1) {
          window.clearInterval(countdown)
          processRound('', true)
          return 15
        }

        return previousValue - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(countdown)
    }
  }, [currentCountry, gameFinished, processRound])

  const contextValue = useMemo<GameContextValue>(
    () => ({
      countries,
      currentCountry,
      score,
      roundTime,
      players,
      loading,
      error,
      currentRound,
      totalRounds: TOTAL_ROUNDS,
      gameFinished,
      lastRound,
      guess,
      nextCountry,
      resetScore,
      restartGame,
    }),
    [countries, currentCountry, score, roundTime, players, loading, error, currentRound, gameFinished, lastRound, guess, nextCountry, resetScore, restartGame],
  )

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('useGame debe usarse dentro de GameProvider')
  }

  return context
}
