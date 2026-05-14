import { JSX } from 'react'
import type { ScoreBarProps } from './types'

const ScoreBar = ({ value, max = 100 }: ScoreBarProps): JSX.Element => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const color = value > 70 ? '#4ade80' : value > 40 ? '#facc15' : '#f87171'
  return (
    <div className="h-1.5 w-full rounded-full bg-[#2a2a2a] overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  )
}

export default ScoreBar
