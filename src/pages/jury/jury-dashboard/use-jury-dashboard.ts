import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoundT } from 'src/types'
import { RoutesEnum } from 'src/routes/routes'
import { useGetMyAssignments } from 'src/hooks/services/use-get-my-assignments'

type RoundGroup = {
  round: Pick<RoundT, 'id' | 'name' | 'status'>
  count: number
}

export const useJuryDashboard = () => {
  const navigate = useNavigate()
  const { data: assignments = [], isLoading, isError } = useGetMyAssignments()

  const roundGroups = useMemo<RoundGroup[]>(() => {
    const map: Record<number, RoundGroup> = {}
    for (const a of assignments) {
      if (!a.round) continue
      if (!map[a.round.id]) {
        map[a.round.id] = { round: a.round, count: 0 }
      }
      map[a.round.id].count++
    }
    return Object.values(map)
  }, [assignments])

  const handleNavigateToRound = (roundId: number) =>
    navigate(RoutesEnum.JURY_ROUND.replace(':roundId', String(roundId)))

  return { assignments, isLoading, isError, roundGroups, handleNavigateToRound }
}
