import { JSX } from 'react'
import { Link } from 'react-router-dom'
import { RoutesEnum } from 'src/routes/routes'
import { useLoginPage } from './use-login-page'

const LoginPage = (): JSX.Element => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useLoginPage()

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0f0f0f]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm bg-[#181818] p-8 rounded-2xl border border-[#1d1d1d]"
      >
        <h1 className="text-white text-xl font-semibold mb-2">Sign in</h1>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#888]">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555]"
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#888]">Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#444] placeholder:text-[#555]"
          />
          {errors.password && (
            <span className="text-xs text-red-400">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-white text-black text-sm font-medium py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-center text-xs text-[#666]">
          No account?{' '}
          <Link to={RoutesEnum.AUTH_REGISTER} className="text-white hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
