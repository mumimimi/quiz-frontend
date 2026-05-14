import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournaments } from 'src/hooks/services/use-get-tournaments'

export const useTournamentListPage = () => {
  const navigate = useNavigate()
  const { data: tournaments = [], isLoading, isError } = useGetTournaments()

  const toDetail = (id: number) =>
    navigate(RoutesEnum.TOURNAMENT_DETAIL.replace(':tournamentId', String(id)))

  return { tournaments, isLoading, isError, toDetail }
}
