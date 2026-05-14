import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from 'src/contexts/user-provider/use-user'
import { TournamentStatusEnum } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useGetTeam } from 'src/hooks/services/use-get-team'
import { useUpdateTeam } from 'src/hooks/services/use-update-team'
import { schema, type EditFormT } from './schema'

export const useTeamDetailPage = () => {
  const { teamId } = useParams<{ teamId: string }>()
  const navigate = useNavigate()
  const { user } = useUser()
  const numId = Number(teamId)

  const { data: team, isLoading, isError } = useGetTeam(numId)
  const updateTeam = useUpdateTeam()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditFormT>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!team) return
    reset({
      name: team.name,
      city: team.city ?? '',
      school: team.school ?? '',
      telegramHandle: team.telegramHandle ?? '',
      discordHandle: team.discordHandle ?? '',
    })
  }, [team, reset])

  const isCaptain = user?.id === team?.captain?.id
  const canEdit = isCaptain && team?.tournament?.status === TournamentStatusEnum.REGISTRATION

  const backUrl = team?.tournament
    ? RoutesEnum.TOURNAMENT_DETAIL.replace(':tournamentId', String(team.tournament.id))
    : RoutesEnum.TOURNAMENTS

  const handleBack = () => navigate(backUrl)

  const onSubmit = async (values: EditFormT) => {
    if (!team) return
    await updateTeam.mutateAsync({ id: team.id, ...values })
    setIsEditing(false)
  }

  const cancelEdit = () => {
    if (!team) return
    reset({
      name: team.name,
      city: team.city ?? '',
      school: team.school ?? '',
      telegramHandle: team.telegramHandle ?? '',
      discordHandle: team.discordHandle ?? '',
    })
    setIsEditing(false)
  }

  return {
    team,
    isLoading,
    isError,
    isEditing,
    setIsEditing,
    canEdit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleBack,
    onSubmit,
    cancelEdit,
  }
}
