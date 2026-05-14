import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { UserRoleEnum } from 'src/enums'
import { useRole } from 'src/hooks/use-role'
import { RoutesEnum as R } from 'src/routes/routes'

const RoleRedirect = () => {
  const { isAdmin, isJury } = useRole()
  if (isAdmin()) return <Navigate to={R.ADMIN} replace />
  if (isJury()) return <Navigate to={R.JURY} replace />
  return <Navigate to={R.TOURNAMENTS} replace />
}

const ErrorPage = lazy(() => import('src/pages/error'))
// Layouts
const UserLayout = lazy(() => import('src/layouts/user-layout'))
const ModalLayout = lazy(() => import('src/layouts/modal-layout'))
const NavBarLayout = lazy(() => import('src/layouts/navbar-layout'))

// Guards
const ProtectedRoute = lazy(() => import('src/components/protected-route'))

// Auth pages
const LoginPage = lazy(() => import('src/pages/auth/login-page'))
const RegisterPage = lazy(() => import('src/pages/auth/register-page'))

// Tournament pages
const TournamentListPage = lazy(
  () => import('src/pages/tournaments/tournament-list-page'),
)
const TournamentDetailPage = lazy(
  () => import('src/pages/tournaments/tournament-detail-page'),
)
const TournamentLeaderboardPage = lazy(
  () => import('src/pages/tournaments/tournament-leaderboard-page'),
)

// Round pages
const RoundDetailPage = lazy(() => import('src/pages/rounds/round-detail-page'))
const RoundLeaderboardPage = lazy(
  () => import('src/pages/rounds/round-leaderboard-page'),
)

// Team pages
const TeamRegisterPage = lazy(() => import('src/pages/team/team-register-page'))
const TeamDetailPage = lazy(() => import('src/pages/team/team-detail-page'))

// Jury pages
const JuryDashboard = lazy(() => import('src/pages/jury/jury-dashboard'))
const JuryRoundPage = lazy(() => import('src/pages/jury/jury-round-page'))
const EvaluationFormPage = lazy(() => import('src/pages/jury/evaluation-form-page'))

// Profile page
const ProfilePage = lazy(() => import('src/pages/profile'))

// Admin pages
const AdminDashboard = lazy(() => import('src/pages/admin/admin-dashboard'))
const AdminTournamentListPage = lazy(
  () => import('src/pages/admin/admin-tournament-list-page'),
)
const TournamentFormPage = lazy(() => import('src/pages/admin/tournament-form-page'))
const AdminTournamentDetailPage = lazy(
  () => import('src/pages/admin/admin-tournament-detail-page'),
)
const RoundFormPage = lazy(() => import('src/pages/admin/round-form-page'))
const AdminRoundDetailPage = lazy(
  () => import('src/pages/admin/admin-round-detail-page'),
)
const AdminSubmissionDetailPage = lazy(
  () => import('src/pages/admin/admin-submission-detail-page'),
)

const userRouter = () => {
  return createBrowserRouter([
    // ── Auth routes (public) ──────────────────────────────────────────────
    { path: R.AUTH_LOGIN, element: <LoginPage /> },
    { path: R.AUTH_REGISTER, element: <RegisterPage /> },

    // ── Protected routes ──────────────────────────────────────────────────
    {
      element: <UserLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <ModalLayout />,
          children: [
            {
              element: <NavBarLayout />,
              children: [
                // Default redirect
                { index: true, element: <RoleRedirect /> },
                { path: '*', element: <Navigate to={R.TOURNAMENTS} replace /> },

                // ── All roles ─────────────────────────────────────────────
                {
                  element: <ProtectedRoute />,
                  children: [
                    { path: R.TOURNAMENTS, element: <TournamentListPage /> },
                    { path: R.TOURNAMENT_DETAIL, element: <TournamentDetailPage /> },
                    {
                      path: R.TOURNAMENT_LEADERBOARD,
                      element: <TournamentLeaderboardPage />,
                    },
                    { path: R.ROUND_DETAIL, element: <RoundDetailPage /> },
                    { path: R.ROUND_LEADERBOARD, element: <RoundLeaderboardPage /> },
                    { path: R.TEAM_DETAIL, element: <TeamDetailPage /> },
                    { path: R.PROFILE, element: <ProfilePage /> },
                  ],
                },

                // ── TEAM only ─────────────────────────────────────────────
                {
                  element: <ProtectedRoute allowedRoles={[UserRoleEnum.TEAM]} />,
                  children: [
                    { path: R.TEAM_REGISTER, element: <TeamRegisterPage /> },
                  ],
                },

                // ── JURY only ─────────────────────────────────────────────
                {
                  element: <ProtectedRoute allowedRoles={[UserRoleEnum.JURY]} />,
                  children: [
                    { path: R.JURY, element: <JuryDashboard /> },
                    { path: R.JURY_ROUND, element: <JuryRoundPage /> },
                    { path: R.JURY_EVALUATE, element: <EvaluationFormPage /> },
                  ],
                },

                // ── ADMIN only ────────────────────────────────────────────
                {
                  element: <ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN]} />,
                  children: [
                    { path: R.ADMIN, element: <AdminDashboard /> },
                    {
                      path: R.ADMIN_TOURNAMENTS,
                      element: <AdminTournamentListPage />,
                    },
                    {
                      path: R.ADMIN_TOURNAMENTS_CREATE,
                      element: <TournamentFormPage />,
                    },
                    {
                      path: R.ADMIN_TOURNAMENT_DETAIL,
                      element: <AdminTournamentDetailPage />,
                    },
                    {
                      path: R.ADMIN_TOURNAMENT_EDIT,
                      element: <TournamentFormPage />,
                    },
                    { path: R.ADMIN_ROUNDS_CREATE, element: <RoundFormPage /> },
                    {
                      path: R.ADMIN_ROUND_DETAIL,
                      element: <AdminRoundDetailPage />,
                    },
                    { path: R.ADMIN_ROUND_EDIT, element: <RoundFormPage /> },
                    {
                      path: R.ADMIN_SUBMISSION_DETAIL,
                      element: <AdminSubmissionDetailPage />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ])
}

export const RouterProviderWithRole = () => {
  return <RouterProvider router={userRouter()} />
}
