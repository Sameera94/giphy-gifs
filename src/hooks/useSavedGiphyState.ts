import { useState } from 'react'

const SAVED_GIPHYS_KEY = 'SavedGiphys'

function useSavedGiphyState(initialValue: string[] = []) {
  const storedValue = localStorage.getItem(SAVED_GIPHYS_KEY)
  const initialArray = storedValue ? JSON.parse(storedValue) : initialValue
  const [giphys, setGiphys] = useState<string[]>(initialArray)

  const updateGiphys = (newValue: string[]) => {
    localStorage.setItem(SAVED_GIPHYS_KEY, JSON.stringify(newValue))
    setGiphys(newValue)
  }

  return [giphys, updateGiphys] as const
}

export default useSavedGiphyState
