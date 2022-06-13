import React, { useEffect, useState } from 'react'
import * as HeroOutline from '@heroicons/react/outline'
import { motion } from 'framer-motion'

const App = () => {
  const [tiles, setTiles] = useState(Array(9).fill(''))
  const [hasWinner, setHasWinner] = useState(false)
  const [winnerTiles, setWinnderTiles] = useState<number[]>([])

  return (
    <div className="grid h-screen place-items-center">
      <div className="relative space-y-10">
        <Board
          tiles={tiles}
          setTiles={setTiles}
          hasWinner={hasWinner}
          setHasWinner={setHasWinner}
          winnerTiles={winnerTiles}
          setWinnderTiles={setWinnderTiles}
        />
        {hasWinner && (
          <button
            onClick={() => {
              setTiles(Array(9).fill(''))
              if (hasWinner) {
                setHasWinner(false)
                setWinnderTiles([])
              }
            }}
            className="absolute w-full rounded-lg bg-blue-500 px-4 py-2 text-2xl text-white">
            RESET
          </button>
        )}
      </div>
    </div>
  )
}

export default App

const Board = ({
  tiles,
  setTiles,
  hasWinner,
  setHasWinner,
  winnerTiles,
  setWinnderTiles,
}: {
  tiles: string[]
  setTiles: React.Dispatch<React.SetStateAction<string[]>>
  hasWinner: boolean
  setHasWinner: React.Dispatch<React.SetStateAction<boolean>>
  winnerTiles: number[]
  setWinnderTiles: React.Dispatch<React.SetStateAction<number[]>>
}) => {
  const [player, setPLayer] = useState('x')
  const [conditions] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ])

  useEffect(() => {
    for (const condition of conditions) {
      if (
        tiles[condition[0]] === tiles[condition[1]] &&
        tiles[condition[1]] === tiles[condition[2]] &&
        tiles[condition[0]] &&
        tiles[condition[1]] &&
        tiles[condition[2]]
      ) {
        setHasWinner(true)
        if (hasWinner) {
          setWinnderTiles(condition)
        }
      }
    }
  }, [tiles, hasWinner])

  const handleMove = (index: number) => {
    const updatedTiles = tiles.map((tile, i) => {
      if (i !== index || tile) return tile
      if (!hasWinner) {
        setPLayer(player === 'x' ? 'o' : 'x')
      }
      return player
    })
    if (!hasWinner) {
      setTiles(updatedTiles)
    }
  }

  return (
    <div className="group grid grid-cols-3 gap-1">
      {tiles.map((tile, index) => (
        <button
          key={index}
          onClick={() => handleMove(index)}
          className={`h-44 w-44 bg-slate-200`}>
          {tile === 'x' && (
            <motion.div
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              whileTap={{ scale: 1.2 }}>
              <HeroOutline.XIcon
                className={`w-full ${
                  winnerTiles[0] === index && 'text-green-500'
                } ${winnerTiles[1] === index && 'text-green-500'} ${
                  winnerTiles[2] === index && 'text-green-500'
                }`}
              />
            </motion.div>
          )}
          {tile === 'o' && (
            <motion.div
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              whileTap={{ scale: 1.2 }}>
              <HeroOutline.MinusCircleIcon
                className={`w-full ${
                  winnerTiles[0] === index && 'text-green-500'
                } ${winnerTiles[1] === index && 'text-green-500'} ${
                  winnerTiles[2] === index && 'text-green-500'
                }`}
              />
            </motion.div>
          )}
        </button>
      ))}
    </div>
  )
}
