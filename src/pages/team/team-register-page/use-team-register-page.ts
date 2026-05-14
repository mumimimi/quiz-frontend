import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTournament } from 'src/hooks/services/use-get-tournament'
import { useCreateTeam } from 'src/hooks/services/use-create-team'
import { schema, type TeamRegisterFormT } from './schema'

export const useTeamRegisterPage = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>()
  const navigate = useNavigate()
  const numId = Number(tournamentId)

  const { data: tournament, isLoading, isError } = useGetTournament(numId)
  const createTeam = useCreateTeam()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TeamRegisterFormT>({
    resolver: zodResolver(schema),
    defaultValues: {
      members: [
        { firstName: '', lastName: '', email: '' },
        { firstName: '', lastName: '', email: '' },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'members' })

  const backUrl = RoutesEnum.TOURNAMENT_DETAIL.replace(':tournamentId', tournamentId ?? '')

  const handleBack = () => navigate(backUrl)

  const onSubmit = async (values: TeamRegisterFormT) => {
    const team = await createTeam.mutateAsync({ tournamentId: numId, ...values })
    navigate(RoutesEnum.TEAM_DETAIL.replace(':teamId', String(team.id)))
  }

  return {
    tournament,
    isLoading,
    isError,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    fields,
    append,
    remove,
    backUrl,
    handleBack,
    onSubmit,
  }
}
