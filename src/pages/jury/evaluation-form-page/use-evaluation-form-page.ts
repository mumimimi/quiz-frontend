import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Jury from 'src/services/jury'
import { CacheKeys } from 'src/enums'
import { RoutesEnum } from 'src/routes/routes'
import { useCreateEvaluation } from 'src/hooks/services/use-create-evaluation'
import { useUpdateEvaluation } from 'src/hooks/services/use-update-evaluation'
import type { ScoreKey, Scores, LocationState } from './types'

const DEFAULT_SCORES: Scores = {
  backendQuality: 50,
  databaseStructure: 50,
  frontendQuality: 50,
  requirementsCompletion: 50,
  functionality: 50,
  usability: 50,
}

const clamp = (n: number) => Math.min(100, Math.max(0, n))

export const useEvaluationFormPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const stateAssignment = (location.state as LocationState)?.assignment ?? null

  const { data: allAssignments, isLoading: isLoadingContext } = useQuery({
    queryKey: [CacheKeys.GET_MY_ASSIGNMENTS],
    queryFn: () => Jury.getMyAssignments(),
    enabled: !stateAssignment && !!assignmentId,
  })

  const assignment =
    stateAssignment ??
    allAssignments?.find(a => a.id === Number(assignmentId)) ??
    null

  const createEvaluation = useCreateEvaluation()
  const updateEvaluation = useUpdateEvaluation()

  const [scores, setScores] = useState<Scores>(DEFAULT_SCORES)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / 6

  useEffect(() => {
    const ev = assignment?.evaluation
    if (!ev) return
    setScores({
      backendQuality: ev.backendQuality,
      databaseStructure: ev.databaseStructure,
      frontendQuality: ev.frontendQuality,
      requirementsCompletion: ev.requirementsCompletion,
      functionality: ev.functionality,
      usability: ev.usability,
    })
    setComment(ev.comment ?? '')
  }, [assignment])

  const updateScore = (key: ScoreKey, value: number) => {
    setScores(prev => ({ ...prev, [key]: clamp(value) }))
  }

  const handleNumberInput = (key: ScoreKey, e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '') return
    updateScore(key, Number(val))
  }

  const isEditMode = assignment?.evaluation != null

  const backUrl = assignment?.round
    ? RoutesEnum.JURY_ROUND.replace(':roundId', String(assignment.round.id))
    : RoutesEnum.JURY

  const handleBack = () => navigate(backUrl)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (isEditMode) {
        await updateEvaluation.mutateAsync({
          id: assignment!.evaluation!.id,
          ...scores,
          comment: comment.trim() || undefined,
        })
      } else {
        await createEvaluation.mutateAsync({
          assignmentId: Number(assignmentId),
          ...scores,
          comment: comment.trim() || undefined,
        })
      }
      navigate(backUrl)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    assignment,
    isLoadingContext,
    stateAssignment,
    scores,
    comment,
    setComment,
    totalScore,
    isSubmitting,
    isEditMode,
    handleBack,
    handleSubmit,
    handleNumberInput,
    updateScore,
  }
}
